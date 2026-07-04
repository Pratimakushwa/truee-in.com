

const express = require('express');
const router = express.Router();

// ⚡ FIX: Yahan 'forgotPassword', 'verifyOTP', aur 'resetPassword' ko import list mein add kiya
const { 
  login, 
  updateFirstPassword, 
  registerCustomer, 
  logout,
  forgotPassword,
  verifyOTP,
  resetPassword 
} = require('../controllers/authController');

const { protect } = require('../middleware/authMiddleware');
// ⚡ FIX 1: Yahan 'addAddress' import kiya
const { getUserProfile, updateUserProfile, addAddress } = require('../controllers/ProfileController');

// Route: POST /api/auth/register
// Public route (customers signing up themselves)
router.post('/register', registerCustomer);

// Route: POST /api/auth/login
// Public route (anyone can try to log in)
router.post('/login', login);

// Route: GET /api/auth/logout
// Public/Protected route (clears the token cookie)
router.get('/logout', logout);

// Route: PUT /api/auth/update-password
// Protected route (you must have a valid JWT token to hit this endpoint)
router.put('/update-password', protect, updateFirstPassword);

router.get('/profile', protect, getUserProfile);
router.put('/profile', protect, updateUserProfile);

// ⚡ FIX 2: Address save karne ke liye naya route add kiya (Checkout page ke checkbox ke liye)
router.post('/address', protect, addAddress);

// ==========================================
// ⚡ FORGOT PASSWORD ROUTES
// ==========================================
router.post('/forgot-password', forgotPassword);
router.post('/verify-otp', verifyOTP);
router.post('/reset-password', resetPassword);

module.exports = router;