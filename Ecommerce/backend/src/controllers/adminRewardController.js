const wrapAsync = require('../utils/wrapAsync');
const ExpressError = require('../utils/expressError');
const User = require('../models/userModel');
const Wallet = require('../models/Wallet');
const WalletTransaction = require('../models/WalletTransaction');
const RewardLog = require('../models/RewardLog');
const Order = require('../models/orderModel');
const {
  getRewardSettings,
  updateRewardSettings,
} = require('../services/rewardConfigService');
const { getWalletSummary, adminAdjustCoins } = require('../services/walletService');
const { getTransactionHistory } = require('../services/walletTransactionService');
const { sendCoinNotification } = require('../services/notificationService');
const { handleOrderRefunded } = require('../services/rewardOrderService');

module.exports.getSettings = wrapAsync(async (req, res) => {
  const settings = await getRewardSettings();
  res.json({ success: true, settings });
});

module.exports.updateSettings = wrapAsync(async (req, res) => {
  const settings = await updateRewardSettings(req.body, req.user._id);
  res.json({ success: true, message: 'Reward settings updated.', settings });
});

module.exports.getAnalytics = wrapAsync(async (req, res) => {
  const [
    totalIssued,
    totalRedeemed,
    activeWallets,
    walletAgg,
    monthlyEarned,
    monthlyRedeemed,
    topCustomers,
    pendingRewards,
  ] = await Promise.all([
    WalletTransaction.aggregate([
      { $match: { type: 'EARN', status: 'COMPLETED' } },
      { $group: { _id: null, total: { $sum: '$credit' } } },
    ]),
    WalletTransaction.aggregate([
      { $match: { type: 'REDEEM', status: 'COMPLETED' } },
      { $group: { _id: null, total: { $sum: '$debit' } } },
    ]),
    Wallet.countDocuments({ availableCoins: { $gt: 0 } }),
    Wallet.aggregate([
      { $group: { _id: null, totalValue: { $sum: '$availableCoins' } } },
    ]),
    WalletTransaction.aggregate([
      { $match: { type: 'EARN', createdAt: { $gte: new Date(new Date().setDate(1)) } } },
      { $group: { _id: { $month: '$createdAt' }, total: { $sum: '$credit' } } },
    ]),
    WalletTransaction.aggregate([
      { $match: { type: 'REDEEM', createdAt: { $gte: new Date(new Date().setDate(1)) } } },
      { $group: { _id: { $month: '$createdAt' }, total: { $sum: '$debit' } } },
    ]),
    Wallet.find().sort({ availableCoins: -1 }).limit(5).populate('user', 'name email'),
    Order.countDocuments({ rewardStatus: 'PENDING' }),
  ]);

  const issued = totalIssued[0]?.total || 0;
  const redeemed = totalRedeemed[0]?.total || 0;
  const activeValue = walletAgg[0]?.totalValue || 0;

  res.json({
    success: true,
    analytics: {
      totalCoinsIssued: issued,
      totalCoinsRedeemed: redeemed,
      activeWalletValue: activeValue,
      activeWallets,
      pendingRewards,
      rewardUsagePercent: issued > 0 ? Math.round((redeemed / issued) * 100) : 0,
      topCustomers,
      monthlyEarned,
      monthlyRedeemed,
    },
  });
});

module.exports.getCustomerWallet = wrapAsync(async (req, res) => {
  const user = await User.findById(req.params.userId).select('-password');
  if (!user) throw new ExpressError(404, 'Customer not found.');

  const wallet = await getWalletSummary(user._id);
  const recentOrders = await Order.find({ user: user._id }).sort({ createdAt: -1 }).limit(5);
  const recentTx = await WalletTransaction.find({ user: user._id }).sort({ createdAt: -1 }).limit(10);
  const rewardHistory = await RewardLog.find({ user: user._id }).sort({ createdAt: -1 }).limit(10);

  res.json({
    success: true,
    user: { _id: user._id, name: user.name, email: user.email },
    wallet,
    recentOrders,
    recentTransactions: recentTx,
    rewardHistory,
  });
});

module.exports.getCustomerTransactions = wrapAsync(async (req, res) => {
  const result = await getTransactionHistory(req.params.userId, req.query);
  res.json({ success: true, ...result });
});

module.exports.adjustCustomerCoins = wrapAsync(async (req, res) => {
  const { direction, amount, reason, notes } = req.body;
  if (!['credit', 'debit'].includes(direction)) {
    throw new ExpressError(400, 'Direction must be credit or debit.');
  }
  if (!amount || amount <= 0) throw new ExpressError(400, 'Valid amount required.');

  const { wallet, transaction } = await adminAdjustCoins(
    req.params.userId,
    Number(amount),
    direction,
    { adminId: req.user._id, reason, notes },
  );

  await RewardLog.create({
    user: req.params.userId,
    event: direction === 'credit' ? 'ADMIN_CREDIT' : 'ADMIN_DEBIT',
    coins: amount,
    triggeredBy: 'ADMIN',
    adminId: req.user._id,
    notes: `${reason || ''} ${notes || ''}`.trim(),
  });

  await sendCoinNotification(req.params.userId, 'ADMIN_ADJUST', {
    coins: amount,
    message: `Admin ${direction}: ${amount} coins. ${reason || ''}`,
  });

  res.json({
    success: true,
    message: `Coins ${direction}ed successfully.`,
    wallet,
    transaction,
  });
});

module.exports.refundOrder = wrapAsync(async (req, res) => {
  const { refundRatio = 1 } = req.body;
  const order = await Order.findById(req.params.orderId);
  if (!order) throw new ExpressError(404, 'Order not found.');

  await handleOrderRefunded(order, Number(refundRatio));
  order.paymentInfo.paymentStatus = 'Refunded';
  await order.save();

  res.json({ success: true, message: 'Refund processed and coins adjusted.' });
});
