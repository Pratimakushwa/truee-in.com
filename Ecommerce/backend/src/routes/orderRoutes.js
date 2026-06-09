// const express = require('express');
// const { instantCheckout } = require('../controllers/orderController');
// const router = express.Router();


// router.post('/instant-checkout', instantCheckout);

// module.exports = router;

// const express = require('express');
// const { instantCheckout, getMyOrders } = require('../controllers/orderController');
// const router = express.Router();

// // ==========================================
// // ROUTES SETUP
// // ==========================================

// // 1. Cart se order place karne ka rasta (POST)
// router.post('/instant-checkout', instantCheckout);

// // 2. ⚡ NAYA: Sidebar mein 'My Orders' dikhane ka rasta (GET)
// // Note: Agar tumne authentication/login (token check) ke liye koi middleware banaya hua hai 
// // (jaise protect ya verifyUser), toh usko yahan beech mein lagana chahiye.
// // Example: router.get('/my-orders', protect, getMyOrders);
// router.get('/my-orders', getMyOrders);


// module.exports = router;
const express = require('express');
const { instantCheckout, getMyOrders } = require('../controllers/orderController');
const { protect } = require('../middleware/authMiddleware'); 

const router = express.Router();

router.post('/instant-checkout', protect, instantCheckout);
router.get('/my-orders', protect, getMyOrders);

module.exports = router;