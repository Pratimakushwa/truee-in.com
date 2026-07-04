const wrapAsync = require('../utils/wrapAsync');
const ExpressError = require('../utils/expressError');
const { getWalletSummary, getOrCreateWallet } = require('../services/walletService');
const { getTransactionHistory, exportTransactions } = require('../services/walletTransactionService');
const { validateRedeemAmount } = require('../services/rewardCalculationService');
const { getPublicRewardSettings } = require('../services/rewardConfigService');

module.exports.getWallet = wrapAsync(async (req, res) => {
  const summary = await getWalletSummary(req.user._id);
  const settings = await getPublicRewardSettings();
  res.json({ success: true, wallet: summary, settings });
});

module.exports.getTransactions = wrapAsync(async (req, res) => {
  const { page, limit, type, search, from, to } = req.query;
  const result = await getTransactionHistory(req.user._id, {
    page, limit, type, search, from, to,
  });
  res.json({ success: true, ...result });
});

module.exports.validateRedeem = wrapAsync(async (req, res) => {
  const { coinsToRedeem, orderPayable } = req.body;
  const wallet = await getOrCreateWallet(req.user._id);
  const result = await validateRedeemAmount(
    Number(coinsToRedeem) || 0,
    wallet.availableCoins,
    Number(orderPayable) || 0,
  );
  if (!result.valid) {
    throw new ExpressError(400, result.message);
  }
  res.json({ success: true, ...result });
});

module.exports.exportTransactions = wrapAsync(async (req, res) => {
  const { type, from, to } = req.query;
  const transactions = await exportTransactions(req.user._id, { type, from, to });

  const headers = ['Date', 'Transaction ID', 'Order ID', 'Type', 'Credit', 'Debit', 'Balance', 'Description', 'Status'];
  const rows = transactions.map((t) => [
    new Date(t.createdAt).toISOString(),
    t.transactionId,
    t.order?._id || '',
    t.type,
    t.credit,
    t.debit,
    t.balanceAfter,
    t.description,
    t.status,
  ]);

  const csv = [headers.join(','), ...rows.map((r) => r.map((c) => `"${c}"`).join(','))].join('\n');
  res.setHeader('Content-Type', 'text/csv');
  res.setHeader('Content-Disposition', 'attachment; filename=wallet-history.csv');
  res.send(csv);
});
