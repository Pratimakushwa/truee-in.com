const Order = require('../models/orderModel');
const RewardLog = require('../models/RewardLog');
const { getRewardSettings } = require('./rewardConfigService');
const { calculateEarnableCoins } = require('./rewardCalculationService');
const { creditCoins, reverseDebit, reverseCredit, debitCoins } = require('./walletService');
const { sendCoinNotification } = require('./notificationService');

const isPaymentValidForReward = (order) => {
  const method = (order.paymentInfo?.method || '').toLowerCase();
  const status = order.paymentInfo?.paymentStatus;
  if (status === 'Paid') return true;
  if (method === 'cod' && order.orderStatus === 'Delivered') return true;
  return false;
};

const creditCoinsOnDelivery = async (order) => {
  if (!order.user) return null;
  if (order.rewardStatus === 'CREDITED') return null;

  const settings = await getRewardSettings();
  if (!settings.isEnabled) return null;
  if (!isPaymentValidForReward(order)) return null;

  const itemsPrice = order.itemsPrice || order.totalAmount;
  const coins = order.coinsEarned || calculateEarnableCoins(
    itemsPrice,
    order.discountAmount || 0,
    settings,
  );

  if (coins <= 0) return null;

  const idempotencyKey = `earn-${order._id}`;
  const tx = await creditCoins(order.user, coins, {
    orderId: order._id,
    type: 'EARN',
    description: `Reward coins for delivered order #${order._id.toString().slice(-8).toUpperCase()}`,
    idempotencyKey,
  });

  await Order.findByIdAndUpdate(order._id, {
    coinsEarned: coins,
    rewardStatus: 'CREDITED',
    rewardCreditedAt: new Date(),
    rewardIdempotencyKey: idempotencyKey,
  });

  await RewardLog.create({
    user: order.user,
    order: order._id,
    event: 'COINS_CREDITED',
    coins,
    rewardPercentage: settings.rewardPercentage,
    orderAmount: order.totalAmount,
    itemsPrice,
    triggeredBy: 'SYSTEM',
  });

  await sendCoinNotification(order.user, 'COIN_CREDIT', {
    coins,
    orderId: order._id,
    message: `${coins} reward coins have been added to your wallet!`,
  });

  return tx;
};

const handleOrderCancelled = async (order) => {
  if (!order.user) return;

  if (order.coinsRedeemed > 0) {
    const idempotencyKey = `cancel-redeem-${order._id}`;
    await reverseDebit(order.user, order.coinsRedeemed, {
      orderId: order._id,
      type: 'ORDER_CANCEL',
      description: `Coins restored — order cancelled #${order._id.toString().slice(-8).toUpperCase()}`,
      idempotencyKey,
    });
  }

  if (order.rewardStatus === 'CREDITED' && order.coinsEarned > 0) {
    const idempotencyKey = `cancel-earn-${order._id}`;
    await reverseCredit(order.user, order.coinsEarned, {
      orderId: order._id,
      type: 'ORDER_CANCEL',
      description: `Earned coins reversed — order cancelled`,
      idempotencyKey,
    });
    await Order.findByIdAndUpdate(order._id, { rewardStatus: 'REVERSED' });
  }
};

const handleOrderRefunded = async (order, refundRatio = 1) => {
  if (!order.user) return;

  if (order.rewardStatus === 'CREDITED' && order.coinsEarned > 0) {
    const coinsToReverse = Math.floor(order.coinsEarned * refundRatio);
    if (coinsToReverse > 0) {
      const idempotencyKey = `refund-earn-${order._id}-${Date.now()}`;
      await reverseCredit(order.user, coinsToReverse, {
        orderId: order._id,
        type: 'REFUND_REVERSAL',
        description: `Coins reversed due to refund on order #${order._id.toString().slice(-8).toUpperCase()}`,
        idempotencyKey,
      });
      await Order.findByIdAndUpdate(order._id, {
        rewardStatus: 'REVERSED',
        coinsEarned: Math.max(0, order.coinsEarned - coinsToReverse),
      });

      await RewardLog.create({
        user: order.user,
        order: order._id,
        event: 'COINS_REVERSED_REFUND',
        coins: coinsToReverse,
        triggeredBy: 'SYSTEM',
        notes: `Refund ratio: ${refundRatio}`,
      });
    }
  }

  if (order.coinsRedeemed > 0 && refundRatio >= 1) {
    const idempotencyKey = `refund-redeem-${order._id}`;
    await reverseDebit(order.user, order.coinsRedeemed, {
      orderId: order._id,
      type: 'REFUND_REVERSAL',
      description: `Redeemed coins restored due to full refund`,
      idempotencyKey,
    });
  }
};

const redeemCoinsForOrder = async (userId, coinsToRedeem, orderId) => {
  if (!coinsToRedeem || coinsToRedeem <= 0) return null;

  const idempotencyKey = `redeem-${orderId}`;
  const tx = await debitCoins(userId, coinsToRedeem, {
    orderId,
    type: 'REDEEM',
    description: `Coins redeemed on order #${orderId.toString().slice(-8).toUpperCase()}`,
    idempotencyKey,
  });

  await sendCoinNotification(userId, 'COIN_REDEEM', {
    coins: coinsToRedeem,
    orderId,
    message: `${coinsToRedeem} reward coins were used on your order.`,
  });

  return tx;
};

const prepareOrderRewardFields = async (itemsPrice, discountAmount = 0) => {
  const settings = await getRewardSettings();
  const coinsEarned = calculateEarnableCoins(itemsPrice, discountAmount, settings);
  return {
    coinsEarned,
    rewardStatus: settings.isEnabled && coinsEarned > 0 ? 'PENDING' : 'NONE',
  };
};

module.exports = {
  creditCoinsOnDelivery,
  handleOrderCancelled,
  handleOrderRefunded,
  redeemCoinsForOrder,
  prepareOrderRewardFields,
  isPaymentValidForReward,
};
