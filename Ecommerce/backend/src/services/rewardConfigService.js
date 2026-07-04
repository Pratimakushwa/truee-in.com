const RewardSettings = require('../models/RewardSettings');

let cachedSettings = null;
let cacheExpiry = 0;
const CACHE_TTL = 60 * 1000;

const DEFAULT_SETTINGS = {
  isEnabled: true,
  isRedeemEnabled: true,
  rewardPercentage: 5,
  minOrderAmount: 0,
  maxCoinsPerOrder: 500,
  maxRedeemPerOrder: 200,
  coinExpiryDays: null,
  coinValueInINR: 1,
  rewardMessage: 'Earn reward coins on every delivered order!',
  termsAndConditions:
    '1 Coin = ₹1. Coins are credited after order delivery. Coins cannot be transferred.',
};

const ensureDefaultSettings = async () => {
  let settings = await RewardSettings.findOne();
  if (!settings) {
    settings = await RewardSettings.create(DEFAULT_SETTINGS);
  }
  return settings;
};

const getRewardSettings = async (useCache = true) => {
  const now = Date.now();
  if (useCache && cachedSettings && now < cacheExpiry) {
    return cachedSettings;
  }
  const settings = await ensureDefaultSettings();
  cachedSettings = settings.toObject();
  cacheExpiry = now + CACHE_TTL;
  return cachedSettings;
};

const getPublicRewardSettings = async () => {
  const settings = await getRewardSettings();
  return {
    isEnabled: settings.isEnabled,
    isRedeemEnabled: settings.isRedeemEnabled,
    rewardPercentage: settings.rewardPercentage,
    minOrderAmount: settings.minOrderAmount,
    maxCoinsPerOrder: settings.maxCoinsPerOrder,
    maxRedeemPerOrder: settings.maxRedeemPerOrder,
    coinValueInINR: settings.coinValueInINR,
    rewardMessage: settings.rewardMessage,
    termsAndConditions: settings.termsAndConditions,
  };
};

const updateRewardSettings = async (updates, adminId) => {
  const settings = await ensureDefaultSettings();
  const allowed = [
    'isEnabled', 'isRedeemEnabled', 'rewardPercentage', 'minOrderAmount',
    'maxCoinsPerOrder', 'maxRedeemPerOrder', 'coinExpiryDays', 'coinValueInINR',
    'rewardMessage', 'termsAndConditions',
  ];
  allowed.forEach((key) => {
    if (updates[key] !== undefined) settings[key] = updates[key];
  });
  if (adminId) settings.updatedBy = adminId;
  await settings.save();
  cachedSettings = null;
  return settings;
};

const invalidateCache = () => {
  cachedSettings = null;
  cacheExpiry = 0;
};

module.exports = {
  getRewardSettings,
  getPublicRewardSettings,
  updateRewardSettings,
  ensureDefaultSettings,
  invalidateCache,
};
