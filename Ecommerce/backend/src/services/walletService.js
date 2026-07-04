const Wallet = require('../models/Wallet');
const WalletTransaction = require('../models/WalletTransaction');
const { generateTransactionId } = require('../utils/generateTransactionId');
const ExpressError = require('../utils/expressError');

const getOrCreateWallet = async (userId) => {
  let wallet = await Wallet.findOne({ user: userId });
  if (!wallet) {
    wallet = await Wallet.create({ user: userId });
  }
  return wallet;
};

const getWalletSummary = async (userId) => {
  const wallet = await getOrCreateWallet(userId);
  const coinValue = 1;
  return {
    availableCoins: wallet.availableCoins,
    pendingCoins: wallet.pendingCoins,
    lifetimeEarned: wallet.lifetimeEarned,
    lifetimeRedeemed: wallet.lifetimeRedeemed,
    expiredCoins: wallet.expiredCoins,
    walletValue: wallet.availableCoins * coinValue,
  };
};

const createTransaction = async ({
  userId, orderId, type, credit = 0, debit = 0, balanceAfter,
  description, status = 'COMPLETED', metadata = {}, idempotencyKey,
}) => {
  const existing = idempotencyKey
    ? await WalletTransaction.findOne({ idempotencyKey })
    : null;
  if (existing) return existing;

  return WalletTransaction.create({
    transactionId: generateTransactionId(),
    user: userId,
    order: orderId || null,
    type,
    credit,
    debit,
    balanceAfter,
    status,
    description,
    metadata,
    idempotencyKey,
  });
};

const debitCoins = async (userId, amount, { orderId, type = 'REDEEM', description, idempotencyKey, metadata = {} }) => {
  if (amount <= 0) return null;

  const wallet = await Wallet.findOneAndUpdate(
    { user: userId, availableCoins: { $gte: amount } },
    { $inc: { availableCoins: -amount, lifetimeRedeemed: amount, version: 1 } },
    { new: true },
  );

  if (!wallet) {
    throw new ExpressError(400, 'Insufficient reward coins.');
  }

  return createTransaction({
    userId,
    orderId,
    type,
    debit: amount,
    balanceAfter: wallet.availableCoins,
    description,
    idempotencyKey,
    metadata,
  });
};

const creditCoins = async (userId, amount, { orderId, type = 'EARN', description, idempotencyKey, metadata = {} }) => {
  if (amount <= 0) return null;

  const wallet = await Wallet.findOneAndUpdate(
    { user: userId },
    { $inc: { availableCoins: amount, lifetimeEarned: amount, version: 1 } },
    { new: true, upsert: true, setDefaultsOnInsert: true },
  );

  return createTransaction({
    userId,
    orderId,
    type,
    credit: amount,
    balanceAfter: wallet.availableCoins,
    description,
    idempotencyKey,
    metadata,
  });
};

const reverseDebit = async (userId, amount, { orderId, type = 'ORDER_CANCEL', description, idempotencyKey }) => {
  if (amount <= 0) return null;

  const wallet = await getOrCreateWallet(userId);
  wallet.availableCoins += amount;
  wallet.lifetimeRedeemed = Math.max(0, wallet.lifetimeRedeemed - amount);
  wallet.version += 1;
  await wallet.save();

  return createTransaction({
    userId,
    orderId,
    type,
    credit: amount,
    balanceAfter: wallet.availableCoins,
    description,
    idempotencyKey,
  });
};

const reverseCredit = async (userId, amount, { orderId, type = 'REFUND_REVERSAL', description, idempotencyKey }) => {
  if (amount <= 0) return null;

  const wallet = await Wallet.findOneAndUpdate(
    { user: userId, availableCoins: { $gte: amount } },
    { $inc: { availableCoins: -amount, lifetimeEarned: -amount, version: 1 } },
    { new: true },
  );

  if (!wallet) {
    // Debit what's available if insufficient (edge case)
    const w = await getOrCreateWallet(userId);
    const debitAmount = w.availableCoins;
    w.availableCoins = 0;
    w.lifetimeEarned = Math.max(0, w.lifetimeEarned - amount);
    await w.save();
    return createTransaction({
      userId, orderId, type, debit: debitAmount, balanceAfter: 0, description, idempotencyKey,
    });
  }

  if (wallet.lifetimeEarned < 0) {
    wallet.lifetimeEarned = 0;
    await wallet.save();
  }

  return createTransaction({
    userId,
    orderId,
    type,
    debit: amount,
    balanceAfter: wallet.availableCoins,
    description,
    idempotencyKey,
  });
};

const adminAdjustCoins = async (userId, amount, direction, { adminId, reason, notes }) => {
  const isCredit = direction === 'credit';
  const absAmount = Math.abs(amount);

  if (isCredit) {
    const wallet = await Wallet.findOneAndUpdate(
      { user: userId },
      { $inc: { availableCoins: absAmount, lifetimeEarned: absAmount, version: 1 } },
      { new: true, upsert: true, setDefaultsOnInsert: true },
    );
    const tx = await createTransaction({
      userId,
      type: 'ADMIN_CREDIT',
      credit: absAmount,
      balanceAfter: wallet.availableCoins,
      description: reason || 'Admin credit adjustment',
      metadata: { adminId, reason, notes },
      idempotencyKey: `admin-credit-${userId}-${Date.now()}`,
    });
    return { wallet, transaction: tx };
  }

  const wallet = await Wallet.findOneAndUpdate(
    { user: userId, availableCoins: { $gte: absAmount } },
    { $inc: { availableCoins: -absAmount, version: 1 } },
    { new: true },
  );
  if (!wallet) throw new ExpressError(400, 'Insufficient coins for debit adjustment.');

  const tx = await createTransaction({
    userId,
    type: 'ADMIN_DEBIT',
    debit: absAmount,
    balanceAfter: wallet.availableCoins,
    description: reason || 'Admin debit adjustment',
    metadata: { adminId, reason, notes },
    idempotencyKey: `admin-debit-${userId}-${Date.now()}`,
  });
  return { wallet, transaction: tx };
};

module.exports = {
  getOrCreateWallet,
  getWalletSummary,
  debitCoins,
  creditCoins,
  reverseDebit,
  reverseCredit,
  adminAdjustCoins,
  createTransaction,
};
