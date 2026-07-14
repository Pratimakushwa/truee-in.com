// const express = require('express');
// const router = express.Router();

// // ⚡ FIX: Yahan getAllCoupons aur deleteCoupon ko import kiya hai
// const { 
//     createCoupon, 
//     verifyCoupon, 
//     getAllCoupons, 
//     deleteCoupon 
// } = require('../controllers/couponController');

// // Routes
// router.post('/create', createCoupon);
// router.post('/verify', verifyCoupon);
// router.get('/all', getAllCoupons);       // ⚡ FIX: Saare coupons fetch karne ka rasta
// router.delete('/:id', deleteCoupon);     // ⚡ FIX: Coupon delete karne ka rasta

// module.exports = router;

const express = require('express');
const router = express.Router();
const { createCoupon, verifyCoupon, getAllCoupons, deleteCoupon,updateCouponStatus ,updateCouponDate} = require('../controllers/couponController');

router.post('/create', createCoupon);
router.post('/verify', verifyCoupon);
router.get('/all', getAllCoupons);
router.delete('/:id', deleteCoupon);
router.put('/update/:id', updateCouponStatus);
router.put('/update-date/:id', updateCouponDate);
module.exports = router;