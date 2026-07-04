const router = require('express').Router();
const {
  getWallet, getTransactions, validateRedeem, exportTransactions,
} = require('../controllers/walletController');
const { protect } = require('../middleware/authMiddleware');

router.use(protect);

router.get('/', getWallet);
router.get('/transactions', getTransactions);
router.get('/transactions/export', exportTransactions);
router.post('/validate-redeem', validateRedeem);

module.exports = router;
