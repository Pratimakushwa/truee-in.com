const mongoose = require('mongoose');

const rewardLogSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  order: { type: mongoose.Schema.Types.ObjectId, ref: 'Order', default: null },
  event: { type: String, required: true },
  coins: { type: Number, default: 0 },
  rewardPercentage: { type: Number, default: 0 },
  orderAmount: { type: Number, default: 0 },
  itemsPrice: { type: Number, default: 0 },
  triggeredBy: { type: String, enum: ['SYSTEM', 'ADMIN'], default: 'SYSTEM' },
  adminId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  notes: { type: String, default: '' },
}, { timestamps: true });

rewardLogSchema.index({ user: 1, createdAt: -1 });
rewardLogSchema.index({ order: 1 });

module.exports = mongoose.model('RewardLog', rewardLogSchema);
