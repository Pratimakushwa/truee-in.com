const { getRewardSettings } = require('./rewardConfigService');

const calculateEarnableCoins = (itemsPrice, discountAmount = 0, settings = null) => {
  const config = settings || {};
  const rewardPercentage = config.rewardPercentage ?? 5;
  const minOrderAmount = config.minOrderAmount ?? 0;
  const maxCoinsPerOrder = config.maxCoinsPerOrder ?? 500;
  const isEnabled = config.isEnabled !== false;

  if (!isEnabled) return 0;

  const eligibleAmount = Math.max(0, (itemsPrice || 0) - (discountAmount || 0));
  if (eligibleAmount < minOrderAmount) return 0;

  let coins = Math.floor(eligibleAmount * rewardPercentage / 100);
  if (maxCoinsPerOrder > 0) {
    coins = Math.min(coins, maxCoinsPerOrder);
  }
  return coins;
};

const calculateMaxRedeemable = async (availableCoins, orderPayable, settings = null) => {
  const config = settings || await getRewardSettings();
  if (!config.isEnabled || !config.isRedeemEnabled) return 0;

  const maxRedeem = config.maxRedeemPerOrder ?? 200;
  const payable = Math.max(0, orderPayable || 0);
  const available = Math.max(0, availableCoins || 0);

  return Math.min(available, maxRedeem, payable);
};

const validateRedeemAmount = async (coinsToRedeem, availableCoins, orderPayable, settings = null) => {
  const config = settings || await getRewardSettings();

  if (!config.isEnabled) {
    return { valid: false, message: 'Reward system is currently disabled.' };
  }
  if (!config.isRedeemEnabled) {
    return { valid: false, message: 'Coin redemption is currently disabled.' };
  }
  if (!coinsToRedeem || coinsToRedeem <= 0) {
    return { valid: true, coinsToRedeem: 0, payableAmount: orderPayable };
  }
  if (!Number.isInteger(coinsToRedeem)) {
    return { valid: false, message: 'Coins must be a whole number.' };
  }

  const maxAllowed = await calculateMaxRedeemable(availableCoins, orderPayable, config);
  if (coinsToRedeem > maxAllowed) {
    return {
      valid: false,
      message: `You can redeem at most ${maxAllowed} coins on this order.`,
      maxAllowed,
    };
  }

  return {
    valid: true,
    coinsToRedeem,
    payableAmount: Math.max(0, orderPayable - coinsToRedeem),
    maxAllowed,
  };
};

const coinsToINR = (coins, coinValueInINR = 1) => Math.round(coins * coinValueInINR);

module.exports = {
  calculateEarnableCoins,
  calculateMaxRedeemable,
  validateRedeemAmount,
  coinsToINR,
};
