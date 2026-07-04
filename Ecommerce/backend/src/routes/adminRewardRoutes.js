const router = require('express').Router();
const {
  getSettings, updateSettings, getAnalytics,
  getCustomerWallet, getCustomerTransactions, adjustCustomerCoins, refundOrder,
} = require('../controllers/adminRewardController');
const { protect } = require('../middleware/authMiddleware');
const { adminOnly } = require('../middleware/roleMiddleware');

router.use(protect, adminOnly);

router.get('/settings', getSettings);
router.put('/settings', updateSettings);
router.get('/analytics', getAnalytics);
router.get('/customers/:userId/wallet', getCustomerWallet);
router.get('/customers/:userId/transactions', getCustomerTransactions);
router.post('/customers/:userId/adjust', adjustCustomerCoins);
router.post('/orders/:orderId/refund', refundOrder);

module.exports = router;
