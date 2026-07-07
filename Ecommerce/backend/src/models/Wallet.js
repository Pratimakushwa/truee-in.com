// const mongoose = require('mongoose');

// const walletSchema = new mongoose.Schema({
//   user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true, unique: true },
//   availableCoins: { type: Number, default: 0, min: 0 },
//   pendingCoins: { type: Number, default: 0, min: 0 },
//   lifetimeEarned: { type: Number, default: 0, min: 0 },
//   lifetimeRedeemed: { type: Number, default: 0, min: 0 },
//   expiredCoins: { type: Number, default: 0, min: 0 },
//   version: { type: Number, default: 0 },
// }, { timestamps: true });

// walletSchema.index({ user: 1 });

// module.exports = mongoose.model('Wallet', walletSchema);


const mongoose = require('mongoose');

const walletSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true, unique: true },
  availableCoins: { type: Number, default: 0, min: 0 },
  pendingCoins: { type: Number, default: 0, min: 0 },
  lifetimeEarned: { type: Number, default: 0, min: 0 },
  lifetimeRedeemed: { type: Number, default: 0, min: 0 },
  expiredCoins: { type: Number, default: 0, min: 0 },
  version: { type: Number, default: 0 },
}, { timestamps: true });

// Bas wo index wali line yahan se hata di hai

module.exports = mongoose.model('Wallet', walletSchema);