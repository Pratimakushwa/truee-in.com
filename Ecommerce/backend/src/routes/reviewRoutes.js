// const express = require('express');
// const {
//   createReview,
//   updateReview,
//   deleteReview,
//   getReviewsByProduct
// } = require('../controllers/reviewController');

// const { protect } = require('../middleware/authMiddleware');

// const router = express.Router();

// router.route('/:productId')
//   .get(getReviewsByProduct)
//   .post(protect, createReview);

// // Edit or delete an existing review (must be the owner)
// router.route('/:id')
//   .put(protect, updateReview)
//   .delete(protect, deleteReview);

// module.exports = router;


const express = require('express');
const {
  createReview,
  updateReview,
  deleteReview,
  getReviewsByProduct,
  getFeaturedTestimonials, // Naya add hua
  getApprovedTestimonials,
  getAllReviewsAdmin,       // Naya add hua
  updateReviewStatus,       // Naya add hua
  toggleFeatureStatus       // Naya add hua
} = require('../controllers/reviewController');

const { protect } = require('../middleware/authMiddleware');
const { adminOnly } = require('../middleware/roleMiddleware');

const router = express.Router();

// 1. PUBLIC ROUTES (Slider aur Product Reviews)
// Note: Isse humesha upar rakhna taki ye dynamic routes se conflict na kare
router.get('/approved-testimonials', getApprovedTestimonials);
router.get('/featured-testimonials', getFeaturedTestimonials);

// Product reviews ke liye specific route
router.get('/product/:productId', getReviewsByProduct);


// 2. ADMIN ROUTES (Sirf Admin access kar payega)
router.get('/admin/all', protect, adminOnly, getAllReviewsAdmin);
router.put('/admin/:id/status', protect, adminOnly, updateReviewStatus);
router.put('/admin/:id/feature', protect, adminOnly, toggleFeatureStatus);


// 3. USER ROUTES (Logged in users only)
// Naya review post karne ke liye
router.post('/product/:productId', protect, createReview);

// Edit ya Delete karne ke liye
router.route('/:id')
  .put(protect, updateReview)
  .delete(protect, deleteReview);

module.exports = router;