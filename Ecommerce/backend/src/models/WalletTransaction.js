const mongoose = require('mongoose');

const walletTransactionSchema = new mongoose.Schema({
  transactionId: { type: String, required: true, unique: true },
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  order: { type: mongoose.Schema.Types.ObjectId, ref: 'Order', default: null },
  type: {
    type: String,
    enum: [
      'EARN', 'REDEEM', 'REFUND_REVERSAL', 'ORDER_CANCEL',
      'ADMIN_CREDIT', 'ADMIN_DEBIT', 'EXPIRY', 'PENDING_HOLD', 'PENDING_RELEASE',
    ],
    required: true,
  },
  credit: { type: Number, default: 0, min: 0 },
  debit: { type: Number, default: 0, min: 0 },
  balanceAfter: { type: Number, required: true, min: 0 },
  status: {
    type: String,
    enum: ['PENDING', 'COMPLETED', 'REVERSED', 'FAILED'],
    default: 'COMPLETED',
  },
  description: { type: String, default: '' },
  metadata: {
    adminId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    reason: String,
    notes: String,
    expiryDate: Date,
  },
  idempotencyKey: { type: String, sparse: true, unique: true },
}, { timestamps: true });

walletTransactionSchema.index({ user: 1, createdAt: -1 });
walletTransactionSchema.index({ order: 1 });
walletTransactionSchema.index({ type: 1 });

module.exports = mongoose.model('WalletTransaction', walletTransactionSchema);
