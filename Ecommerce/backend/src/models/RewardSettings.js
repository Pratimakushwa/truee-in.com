const mongoose = require('mongoose');

const rewardSettingsSchema = new mongoose.Schema({
  isEnabled: { type: Boolean, default: true },
  isRedeemEnabled: { type: Boolean, default: true },
  rewardPercentage: { type: Number, default: 5, min: 0, max: 100 },
  minOrderAmount: { type: Number, default: 0 },
  maxCoinsPerOrder: { type: Number, default: 500 },
  maxRedeemPerOrder: { type: Number, default: 200 },
  coinExpiryDays: { type: Number, default: null },
  coinValueInINR: { type: Number, default: 1 },
  rewardMessage: {
    type: String,
    default: 'Earn reward coins on every delivered order!',
  },
  termsAndConditions: {
    type: String,
    default: '1 Coin = ₹1. Coins are credited after order delivery. Coins cannot be transferred.',
  },
  updatedBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
}, { timestamps: true });

module.exports = mongoose.model('RewardSettings', rewardSettingsSchema);
