const express = require('express');
const router = express.Router();
const { toggleWishlist, getWishlist } = require('../controllers/wishlistController');

// Ye tumhara authentication middleware hai, jo check karega ki user logged in hai ya nahi
// Agar tumhare middleware ka path kuch aur hai, toh usko check kar lena (jaise '../middleware/auth' ya jo bhi ho)
const { protect } = require('../middleware/authMiddleware'); 

// Routes
router.post('/toggle', protect, toggleWishlist); // Star pe click karne ke liye
router.get('/', protect, getWishlist); // Wishlist page pe data dikhane ke liye

module.exports = router;