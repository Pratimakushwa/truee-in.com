const WalletTransaction = require('../models/WalletTransaction');

const getTransactionHistory = async (userId, {
  page = 1, limit = 10, type, search, from, to,
}) => {
  const query = { user: userId };

  if (type && type !== 'all') query.type = type;
  if (from || to) {
    query.createdAt = {};
    if (from) query.createdAt.$gte = new Date(from);
    if (to) query.createdAt.$lte = new Date(to);
  }
  if (search) {
    query.$or = [
      { transactionId: { $regex: search, $options: 'i' } },
      { description: { $regex: search, $options: 'i' } },
    ];
  }

  const skip = (page - 1) * limit;
  const [transactions, total] = await Promise.all([
    WalletTransaction.find(query)
      .populate('order', '_id totalAmount orderStatus')
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit)
      .lean(),
    WalletTransaction.countDocuments(query),
  ]);

  return {
    transactions,
    pagination: {
      page: Number(page),
      limit: Number(limit),
      total,
      pages: Math.ceil(total / limit),
    },
  };
};

const exportTransactions = async (userId, filters = {}) => {
  const { type, from, to } = filters;
  const query = { user: userId };
  if (type && type !== 'all') query.type = type;
  if (from || to) {
    query.createdAt = {};
    if (from) query.createdAt.$gte = new Date(from);
    if (to) query.createdAt.$lte = new Date(to);
  }

  return WalletTransaction.find(query)
    .populate('order', '_id')
    .sort({ createdAt: -1 })
    .lean();
};

module.exports = { getTransactionHistory, exportTransactions };
