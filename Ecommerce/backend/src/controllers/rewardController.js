const wrapAsync = require('../utils/wrapAsync');
const { getPublicRewardSettings } = require('../services/rewardConfigService');
const { calculateEarnableCoins } = require('../services/rewardCalculationService');
const { getRewardSettings } = require('../services/rewardConfigService');

module.exports.getPublicSettings = wrapAsync(async (req, res) => {
  const settings = await getPublicRewardSettings();
  res.json({ success: true, settings });
});

module.exports.estimateEarn = wrapAsync(async (req, res) => {
  const itemsTotal = Number(req.query.itemsTotal) || 0;
  const discountAmount = Number(req.query.discountAmount) || 0;
  const settings = await getRewardSettings();
  const coins = calculateEarnableCoins(itemsTotal, discountAmount, settings);
  res.json({
    success: true,
    estimatedCoins: coins,
    walletValue: coins * (settings.coinValueInINR || 1),
    rewardPercentage: settings.rewardPercentage,
    isEnabled: settings.isEnabled,
  });
});
