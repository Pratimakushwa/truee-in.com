const express = require('express');
const router = express.Router();
const paymentController = require('../controllers/paymentController');

// ⚡ Create order: Guest users ko bhi allow karo (without protect)
router.post('/create-order', paymentController.createOrder);

// ⚡ Verify payment: Guest users ko bhi allow karo (without protect)
router.post('/verify-payment', paymentController.verifyPayment);

module.exports = router;