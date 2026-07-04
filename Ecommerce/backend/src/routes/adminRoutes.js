// const router = require('express').Router();
// const {
//   getAllUsers,
//   getAdminProfile,
//   updateAdminProfile,
//   getAllOrders,
//   getOrderById,
//   updateOrderStatus
// } = require('../controllers/adminController');
// const { protect } = require('../middleware/authMiddleware');
// const { adminOnly } = require('../middleware/roleMiddleware');

// // All routes require protection and admin role
// router.use(protect, adminOnly);

// // Admin Profile Routes
// router.get('/profile', getAdminProfile);
// router.put('/profile', updateAdminProfile);

// // Customer Management
// router.get('/users', getAllUsers);

// // Order Management
// router.get('/orders', getAllOrders);
// router.get('/orders/:id', getOrderById);
// router.put('/orders/:id/status', updateOrderStatus);

// module.exports = router;

// const router = require('express').Router();
// const {
//   getAllUsers,
//   getAdminProfile,
//   updateAdminProfile,
//   getAllOrders,
//   getOrderById,
//   updateOrderStatus
// } = require('../controllers/adminController');
// const { protect } = require('../middleware/authMiddleware');
// const { adminOnly } = require('../middleware/roleMiddleware');

// // All routes require protection and admin role
// router.use(protect, adminOnly);

// // Admin Profile Routes
// router.get('/profile', getAdminProfile);
// router.put('/profile', updateAdminProfile);

// // Customer Management
// router.get('/users', getAllUsers);

// // Order Management
// router.get('/orders', getAllOrders);
// router.get('/orders/:id', getOrderById);
// router.put('/orders/:id/status', updateOrderStatus);

// module.exports = router;

// const router = require('express').Router();
// const {
//   getAllUsers,
//   getAdminProfile,
//   updateAdminProfile,
//   getAllOrders,
//   getOrderById,
//   updateOrderStatus,
//   getDashboardStats // ⚡ Ye naya import add kiya hai
// } = require('../controllers/adminController');
// const { protect } = require('../middleware/authMiddleware');
// const { adminOnly } = require('../middleware/roleMiddleware');

// // All routes require protection and admin role
// router.use(protect, adminOnly);

// // ⚡ DASHBOARD ROUTE (Ye line missing thi) ⚡
// router.get('/dashboard-stats', getDashboardStats);

// // Admin Profile Routes
// router.get('/profile', getAdminProfile);
// router.put('/profile', updateAdminProfile);

// // Customer Management
// router.get('/users', getAllUsers);

// // Order Management
// router.get('/orders', getAllOrders);
// router.get('/orders/:id', getOrderById);
// router.put('/orders/:id/status', updateOrderStatus);

// module.exports = router;

const router = require('express').Router();
const {
  getAllUsers,
  getAdminProfile,
  updateAdminProfile,
  getAllOrders,
  getOrderById,
  updateOrderStatus,
  getDashboardStats // ⚡ Ye naya import add kiya hai
} = require('../controllers/adminController');

const { protect } = require('../middleware/authMiddleware');
const { adminOnly } = require('../middleware/roleMiddleware');

// ==========================================
// ⚡ SCANNER: Ye batayega ki problem kahan hai
// ==========================================
console.log("--- ADMIN ROUTES IMPORTS CHECK ---");
console.log("getDashboardStats hai kya?:", !!getDashboardStats);
console.log("getAllUsers hai kya?:", !!getAllUsers);
console.log("getAdminProfile hai kya?:", !!getAdminProfile);
console.log("protect middleware hai kya?:", !!protect);
console.log("adminOnly middleware hai kya?:", !!adminOnly);
console.log("----------------------------------");

// All routes require protection and admin role
router.use(protect, adminOnly);

// ⚡ DASHBOARD ROUTE
router.get('/dashboard-stats', getDashboardStats);

// Admin Profile Routes
router.get('/profile', getAdminProfile);
router.put('/profile', updateAdminProfile);

// Customer Management
router.get('/users', getAllUsers);

// Order Management
router.get('/orders', getAllOrders);
router.get('/orders/:id', getOrderById);
router.put('/orders/:id/status', updateOrderStatus);

module.exports = router;