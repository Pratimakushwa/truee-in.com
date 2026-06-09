// const express = require('express');
// const router = express.Router();
// const paymentController = require('../controllers/paymentController');

// // ⚡ Create order: Guest users ko bhi allow karo (without protect)
// router.post('/create-order', paymentController.createOrder);

// // ⚡ Verify payment: Guest users ko bhi allow karo (without protect)
// router.post('/verify-payment', paymentController.verifyPayment);

// module.exports = router;

const express = require('express');
const router = express.Router();
const paymentController = require('../controllers/paymentController');

// ⚡ 1. Guard (protect) ko import kiya
const { protect } = require('../middleware/authMiddleware');

// ==========================================
// ⚡ 2. Dono routes par 'protect' laga diya
// ==========================================

// Ab order place karte waqt token check hoga aur order "Unknown" ki jagah tumhare naam se save hoga!
router.post('/create-order', protect, paymentController.createOrder);

// Verify karte waqt bhi guard token check karega
router.post('/verify-payment', protect, paymentController.verifyPayment);

module.exports = router;