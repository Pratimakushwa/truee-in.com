// const express = require('express');
// const { instantCheckout, getMyOrders } = require('../controllers/orderController');
// const router = express.Router();

// // ==========================================
// // ROUTES SETUP
// // ==========================================

// // 1. Cart se order place karne ka rasta (POST)
// router.post('/instant-checkout', instantCheckout);

// // 2. My Orders dikhane ka rasta (GET)
// router.get('/my-orders', getMyOrders);

// module.exports = router;
// // const { instantCheckout, getMyOrders } = require('../controllers/orderController');
// // const { protect } = require('../middleware/authMiddleware'); 

// // const router = express.Router();

// // router.post('/instant-checkout', protect, instantCheckout);
// // router.get('/my-orders', protect, getMyOrders);

// // module.exports = router;

// const express = require('express');
// // ⚡ FIX: Yahan 'getOrderById' ko import kiya hai
// const { instantCheckout, getMyOrders, getOrderById } = require('../controllers/orderController'); 
// const { protect } = require('../middleware/authMiddleware'); // Auth check ke liye

// const router = express.Router();

// // ==========================================
// // ROUTES SETUP
// // ==========================================

// // 1. Cart se order place karne ka rasta (POST)
// router.post('/instant-checkout', protect, instantCheckout);

// // 2. My Orders dikhane ka rasta (GET)
// router.get('/my-orders', protect, getMyOrders);

// // ⚡ 3. NAYA RASTA: Single Order ki details lane ke liye (GET)
// // Isse tumhara "View Details" page chalne lagega!
// router.get('/:id', protect, getOrderById); 

// module.exports = router;

const express = require('express');
// ⚡ FIX: Yahan 'shiprocketWebhook' ko bhi import kar liya hai
const { 
  instantCheckout, 
  getMyOrders, 
  getOrderById,
  shiprocketWebhook // <-- Naya function add kiya
} = require('../controllers/orderController'); 
const { protect } = require('../middleware/authMiddleware'); 

const router = express.Router();

// ==========================================
// ROUTES SETUP
// ==========================================

// 1. Cart se order place karne ka rasta (POST)
router.post('/instant-checkout', protect, instantCheckout);

// 2. My Orders dikhane ka rasta (GET)
router.get('/my-orders', protect, getMyOrders);

// 3. Single Order ki details lane ke liye (GET)
router.get('/:id', protect, getOrderById); 

// ⚡ 4. NAYA RASTA: Shiprocket Webhook (Shiprocket yahan automatic message bhejega)
// Isme 'protect' nahi hai kyunki Shiprocket bahar ka server hai.
router.post('/shiprocket-webhook', shiprocketWebhook);

module.exports = router;