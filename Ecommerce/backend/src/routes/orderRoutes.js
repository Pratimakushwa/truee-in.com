const express = require('express');
const { instantCheckout, getMyOrders } = require('../controllers/orderController');
const router = express.Router();

// ==========================================
// ROUTES SETUP
// ==========================================

// 1. Cart se order place karne ka rasta (POST)
router.post('/instant-checkout', instantCheckout);

// 2. My Orders dikhane ka rasta (GET)
router.get('/my-orders', getMyOrders);

module.exports = router;
// const { instantCheckout, getMyOrders } = require('../controllers/orderController');
// const { protect } = require('../middleware/authMiddleware'); 

// const router = express.Router();

// router.post('/instant-checkout', protect, instantCheckout);
// router.get('/my-orders', protect, getMyOrders);

// module.exports = router;