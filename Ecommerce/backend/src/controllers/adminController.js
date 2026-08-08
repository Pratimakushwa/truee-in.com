
// const User = require('../models/userModel');
// const Order = require('../models/orderModel');
// const Product = require('../models/productModel');
// const Coupon = require('../models/Coupon');
// const WalletTransaction = require('../models/WalletTransaction');
// const Wallet = require('../models/Wallet');
// const wrapAsync = require('../utils/wrapAsync');
// const ExpressError = require('../utils/expressError');
// const {
//   creditCoinsOnDelivery, handleOrderCancelled,
// } = require('../services/rewardOrderService');
// const { ORDER_STATUSES } = require('../constants/orderStatuses');
// const { sendOrderStatusEmail } = require('../services/orderEmailService');

// // Get all customer users
// module.exports.getAllUsers = wrapAsync(async (req, res) => {
//   const users = await User.find({ role: 'customer' }).select('-password').sort({ createdAt: -1 });
//   res.status(200).json({ success: true, count: users.length, users });
// });

// // Get admin's own profile
// module.exports.getAdminProfile = wrapAsync(async (req, res) => {
//   const admin = await User.findById(req.user._id).select('-password');
//   if (!admin) {
//     throw new ExpressError(404, 'Admin not found.');
//   }
//   res.status(200).json({
//     success: true,
//     admin: {
//       _id: admin._id,
//       name: admin.name,
//       email: admin.email,
//       role: admin.role,
//       isActive: admin.isActive,
//       isFirstLogin: admin.isFirstLogin,
//       createdAt: admin.createdAt
//     }
//   });
// });

// // Update admin's own profile
// module.exports.updateAdminProfile = wrapAsync(async (req, res) => {
//   const { name, email, phone, address } = req.body;
//   const admin = await User.findById(req.user._id);
  
//   if (!admin) {
//     throw new ExpressError(404, 'Admin not found.');
//   }

//   // Check if new email is already taken by another user
//   if (email && email !== admin.email) {
//     const existingUser = await User.findOne({ email: email.toLowerCase() });
//     if (existingUser) {
//       throw new ExpressError(400, 'Email already in use.');
//     }
//   }

//   admin.name = name || admin.name;
//   admin.email = email ? email.toLowerCase() : admin.email;
//   admin.phone = phone || admin.phone;
//   admin.address = address || admin.address;

//   const updatedAdmin = await admin.save();

//   res.status(200).json({
//     success: true,
//     message: 'Profile updated successfully.',
//     admin: {
//       _id: updatedAdmin._id,
//       name: updatedAdmin.name,
//       email: updatedAdmin.email,
//       role: updatedAdmin.role
//     }
//   });
// });

// // Get all orders (for admin view)
// module.exports.getAllOrders = wrapAsync(async (req, res) => {
//   const orders = await Order.find()
//     .populate('user', 'name email')
//     .populate('orderItems.product', 'name price images')
//     .sort({ createdAt: -1 });

//   res.status(200).json({ success: true, count: orders.length, data: orders });
// });

// // Get order by ID
// module.exports.getOrderById = wrapAsync(async (req, res) => {
//   const order = await Order.findById(req.params.id)
//     .populate('user', 'name email phone')
//     .populate('orderItems.product', 'name price images');

//   if (!order) {
//     throw new ExpressError(404, 'Order not found.');
//   }

//   res.status(200).json({ success: true, data: order });
// });

// // Update order status
// module.exports.updateOrderStatus = wrapAsync(async (req, res) => {
//   const { orderStatus, note } = req.body;

//   if (!ORDER_STATUSES.includes(orderStatus)) {
//     throw new ExpressError(400, 'Invalid order status.');
//   }

//   const existingOrder = await Order.findById(req.params.id).populate('user', 'name email');
//   if (!existingOrder) {
//     throw new ExpressError(404, 'Order not found.');
//   }

//   const previousStatus = existingOrder.orderStatus;
//   const updateData = {
//     orderStatus,
//     $push: {
//       statusHistory: {
//         status: orderStatus,
//         note: note || '',
//         updatedAt: new Date(),
//         updatedBy: req.user._id,
//       },
//     },
//   };

//   if (orderStatus === 'Delivered' || orderStatus === 'Completed') {
//     updateData.deliveredAt = Date.now();
//     const method = (existingOrder.paymentInfo?.method || '').toLowerCase();
//     if (method === 'cod') {
//       updateData['paymentInfo.paymentStatus'] = 'Paid';
//     }
//   }

//   const order = await Order.findByIdAndUpdate(
//     req.params.id,
//     updateData,
//     { new: true, runValidators: true },
//   ).populate('user', 'name email');

//   const creditStatuses = ['Delivered', 'Completed'];
//   if (creditStatuses.includes(orderStatus) && !creditStatuses.includes(previousStatus)) {
//     await creditCoinsOnDelivery(order);
//   }

//   if (orderStatus === 'Cancelled' && previousStatus !== 'Cancelled') {
//     await handleOrderCancelled(order);
//   }

//   if (previousStatus !== orderStatus && order.user) {
//     sendOrderStatusEmail(order, order.user, orderStatus).catch(() => {});
//   }

//   res.status(200).json({ success: true, message: 'Order status updated.', data: order });
// });

// // Dashboard stats — KPIs, charts, recent activity
// module.exports.getDashboardStats = wrapAsync(async (req, res) => {
//   const now = new Date();
//   const startOfToday = new Date(now);
//   startOfToday.setHours(0, 0, 0, 0);
//   const startOfYesterday = new Date(startOfToday);
//   startOfYesterday.setDate(startOfYesterday.getDate() - 1);
//   const startOfMonth = new Date(now.getFullYear(), now.getMonth(), 1);
//   const startOfLastMonth = new Date(now.getFullYear(), now.getMonth() - 1, 1);
//   const endOfLastMonth = new Date(now.getFullYear(), now.getMonth(), 0, 23, 59, 59);

//   const paidMatch = { 'paymentInfo.paymentStatus': 'Paid' };
//   const pendingStatuses = ['Pending', 'Confirmed', 'Processing', 'Packed'];

//   const [
//     productCount,
//     orderCount,
//     userCount,
//     couponCount,
//     categoryCount,
//     lowStockCount,
//     todayOrders,
//     yesterdayOrders,
//     pendingOrders,
//     deliveredOrders,
//     cancelledOrders,
//     todayRevenueAgg,
//     yesterdayRevenueAgg,
//     totalRevenueAgg,
//     monthRevenueAgg,
//     lastMonthRevenueAgg,
//     coinsIssuedAgg,
//     coinsRedeemedAgg,
//     walletBalanceAgg,
//     recentOrders,
//     dailySales,
//     topProducts,
//   ] = await Promise.all([
//     Product.countDocuments(),
//     Order.countDocuments(),
//     User.countDocuments({ role: 'customer' }),
//     Coupon.countDocuments({ isActive: true }),
//     Product.distinct('category').then((c) => c.filter(Boolean).length),
//     Product.countDocuments({ $or: [{ stock: { $lte: 5 } }, { stock: { $exists: false } }] }),
//     Order.countDocuments({ createdAt: { $gte: startOfToday } }),
//     Order.countDocuments({ createdAt: { $gte: startOfYesterday, $lt: startOfToday } }),
//     Order.countDocuments({ orderStatus: { $in: pendingStatuses } }),
//     Order.countDocuments({ orderStatus: { $in: ['Delivered', 'Completed'] } }),
//     Order.countDocuments({ orderStatus: 'Cancelled' }),
//     Order.aggregate([
//       { $match: { createdAt: { $gte: startOfToday }, ...paidMatch } },
//       { $group: { _id: null, total: { $sum: { $ifNull: ['$payableAmount', '$totalAmount'] } } } },
//     ]),
//     Order.aggregate([
//       { $match: { createdAt: { $gte: startOfYesterday, $lt: startOfToday }, ...paidMatch } },
//       { $group: { _id: null, total: { $sum: { $ifNull: ['$payableAmount', '$totalAmount'] } } } },
//     ]),
//     Order.aggregate([
//       { $match: paidMatch },
//       { $group: { _id: null, total: { $sum: { $ifNull: ['$payableAmount', '$totalAmount'] } } } },
//     ]),
//     Order.aggregate([
//       { $match: { createdAt: { $gte: startOfMonth }, ...paidMatch } },
//       { $group: { _id: null, total: { $sum: { $ifNull: ['$payableAmount', '$totalAmount'] } } } },
//     ]),
//     Order.aggregate([
//       { $match: { createdAt: { $gte: startOfLastMonth, $lte: endOfLastMonth }, ...paidMatch } },
//       { $group: { _id: null, total: { $sum: { $ifNull: ['$payableAmount', '$totalAmount'] } } } },
//     ]),
//     WalletTransaction.aggregate([
//       { $match: { type: 'EARN', status: 'COMPLETED' } },
//       { $group: { _id: null, total: { $sum: '$credit' } } },
//     ]),
//     WalletTransaction.aggregate([
//       { $match: { type: 'REDEEM', status: 'COMPLETED' } },
//       { $group: { _id: null, total: { $sum: '$debit' } } },
//     ]),
//     Wallet.aggregate([{ $group: { _id: null, total: { $sum: '$availableCoins' } } }]),
//     Order.find()
//       .sort({ createdAt: -1 })
//       .limit(6)
//       .select('orderStatus totalAmount payableAmount paymentInfo createdAt shippingAddress.fullName')
//       .lean(),
//     Order.aggregate([
//       { $match: { createdAt: { $gte: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000) }, ...paidMatch } },
//       {
//         $group: {
//           _id: { $dateToString: { format: '%Y-%m-%d', date: '$createdAt' } },
//           revenue: { $sum: { $ifNull: ['$payableAmount', '$totalAmount'] } },
//           orders: { $sum: 1 },
//         },
//       },
//       { $sort: { _id: 1 } },
//     ]),
//     Order.aggregate([
//       { $unwind: '$orderItems' },
//       { $group: { _id: '$orderItems.name', qty: { $sum: '$orderItems.quantity' }, revenue: { $sum: { $multiply: ['$orderItems.price', '$orderItems.quantity'] } } } },
//       { $sort: { qty: -1 } },
//       { $limit: 5 },
//     ]),
//   ]);

//   const todayRevenue = todayRevenueAgg[0]?.total || 0;
//   const yesterdayRevenue = yesterdayRevenueAgg[0]?.total || 0;
//   const monthRevenue = monthRevenueAgg[0]?.total || 0;
//   const lastMonthRevenue = lastMonthRevenueAgg[0]?.total || 0;
//   const revenueGrowth = lastMonthRevenue > 0
//     ? Math.round(((monthRevenue - lastMonthRevenue) / lastMonthRevenue) * 100)
//     : monthRevenue > 0 ? 100 : 0;
//   const ordersGrowth = yesterdayOrders > 0
//     ? Math.round(((todayOrders - yesterdayOrders) / yesterdayOrders) * 100)
//     : todayOrders > 0 ? 100 : 0;

//   res.status(200).json({
//     success: true,
//     stats: {
//       productCount,
//       orderCount,
//       userCount,
//       couponCount,
//       categoryCount,
//       lowStockCount,
//       todayOrders,
//       yesterdayOrders,
//       pendingOrders,
//       deliveredOrders,
//       cancelledOrders,
//       todayRevenue,
//       yesterdayRevenue,
//       totalRevenue: totalRevenueAgg[0]?.total || 0,
//       monthRevenue,
//       revenueGrowth,
//       ordersGrowth,
//       coinsIssued: coinsIssuedAgg[0]?.total || 0,
//       coinsRedeemed: coinsRedeemedAgg[0]?.total || 0,
//       walletBalance: walletBalanceAgg[0]?.total || 0,
//       recentOrders,
//       dailySales,
//       topProducts,
//     },
//   });
// });

const User = require('../models/userModel');
const Order = require('../models/orderModel');
const Product = require('../models/ProductModel');
const Coupon = require('../models/Coupon');
const WalletTransaction = require('../models/WalletTransaction');
const Wallet = require('../models/Wallet');
const wrapAsync = require('../utils/wrapAsync');
const ExpressError = require('../utils/expressError');
const bcrypt = require('bcryptjs'); 
const { creditCoinsOnDelivery, handleOrderCancelled } = require('../services/rewardOrderService');
const { ORDER_STATUSES } = require('../constants/orderStatuses');
const { sendOrderStatusEmail } = require('../services/orderEmailService');

// Get all customer users
module.exports.getAllUsers = wrapAsync(async (req, res) => {
  const users = await User.find({ role: 'customer' }).select('-password').sort({ createdAt: -1 });
  res.status(200).json({ success: true, count: users.length, users });
});

// Get admin's own profile
module.exports.getAdminProfile = wrapAsync(async (req, res) => {
  const admin = await User.findById(req.user._id).select('-password');
  if (!admin) {
    throw new ExpressError(404, 'Admin not found.');
  }
  res.status(200).json({
    success: true,
    admin: {
      _id: admin._id,
      name: admin.name,
      email: admin.email,
      role: admin.role,
      isActive: admin.isActive,
      isFirstLogin: admin.isFirstLogin,
      createdAt: admin.createdAt
    }
  });
});

// Update admin's own profile
module.exports.updateAdminProfile = wrapAsync(async (req, res) => {
  const { name, email, phone, address } = req.body;
  const admin = await User.findById(req.user._id);
  
  if (!admin) {
    throw new ExpressError(404, 'Admin not found.');
  }

  if (email && email !== admin.email) {
    const existingUser = await User.findOne({ email: email.toLowerCase() });
    if (existingUser) {
      throw new ExpressError(400, 'Email already in use.');
    }
  }

  admin.name = name || admin.name;
  admin.email = email ? email.toLowerCase() : admin.email;
  admin.phone = phone || admin.phone;
  admin.address = address || admin.address;

  const updatedAdmin = await admin.save();

  res.status(200).json({
    success: true,
    message: 'Profile updated successfully.',
    admin: {
      _id: updatedAdmin._id,
      name: updatedAdmin.name,
      email: updatedAdmin.email,
      role: updatedAdmin.role
    }
  });
});

// Get all orders (for admin view)
module.exports.getAllOrders = wrapAsync(async (req, res) => {
  const orders = await Order.find()
    .populate('user', 'name email')
    .populate('orderItems.product', 'name price images')
    .sort({ createdAt: -1 });

  res.status(200).json({ success: true, count: orders.length, data: orders });
});

// Get order by ID
module.exports.getOrderById = wrapAsync(async (req, res) => {
  const order = await Order.findById(req.params.id)
    .populate('user', 'name email phone')
    .populate('orderItems.product', 'name price images');

  if (!order) {
    throw new ExpressError(404, 'Order not found.');
  }

  res.status(200).json({ success: true, data: order });
});

// Update order status (Tracking Details save fix)
module.exports.updateOrderStatus = wrapAsync(async (req, res) => {
  const { orderStatus, note, courierPartner, awbNumber } = req.body;

  if (!ORDER_STATUSES.includes(orderStatus)) {
    throw new ExpressError(400, 'Invalid order status.');
  }

  const existingOrder = await Order.findById(req.params.id).populate('user', 'name email');
  if (!existingOrder) {
    throw new ExpressError(404, 'Order not found.');
  }

  const previousStatus = existingOrder.orderStatus;
  
  const updateData = {
    orderStatus,
    $push: {
      statusHistory: {
        status: orderStatus,
        note: note || '',
        updatedAt: new Date(),
        updatedBy: req.user._id,
      },
    },
  };

  // Tracking details save logic
  if (orderStatus === 'Shipped' && courierPartner && awbNumber) {
    updateData.trackingDetails = {
      courierPartner,
      awbNumber,
      shippedAt: new Date()
    };
  }

  if (orderStatus === 'Delivered' || orderStatus === 'Completed') {
    updateData.deliveredAt = Date.now();
    const method = (existingOrder.paymentInfo?.method || '').toLowerCase();
    if (method === 'cod') {
      updateData['paymentInfo.paymentStatus'] = 'Paid';
    }
  }

  const order = await Order.findByIdAndUpdate(
    req.params.id,
    updateData,
    { new: true, runValidators: true },
  ).populate('user', 'name email');

  const creditStatuses = ['Delivered', 'Completed'];
  if (creditStatuses.includes(orderStatus) && !creditStatuses.includes(previousStatus)) {
    await creditCoinsOnDelivery(order);
  }

  if (orderStatus === 'Cancelled' && previousStatus !== 'Cancelled') {
    await handleOrderCancelled(order);
  }

  if (previousStatus !== orderStatus && order.user) {
    sendOrderStatusEmail(order, order.user, orderStatus).catch(() => {});
  }

  res.status(200).json({ success: true, message: 'Order status updated.', data: order });
});

// Dashboard stats — KPIs, charts, recent activity
module.exports.getDashboardStats = wrapAsync(async (req, res) => {
  const now = new Date();
  const startOfToday = new Date(now);
  startOfToday.setHours(0, 0, 0, 0);
  const startOfYesterday = new Date(startOfToday);
  startOfYesterday.setDate(startOfYesterday.getDate() - 1);
  const startOfMonth = new Date(now.getFullYear(), now.getMonth(), 1);
  const startOfLastMonth = new Date(now.getFullYear(), now.getMonth() - 1, 1);
  const endOfLastMonth = new Date(now.getFullYear(), now.getMonth(), 0, 23, 59, 59);

  const paidMatch = { 'paymentInfo.paymentStatus': 'Paid' };
  const pendingStatuses = ['Pending', 'Confirmed', 'Processing', 'Packed'];

  const [
    productCount,
    orderCount,
    userCount,
    couponCount,
    categoryCount,
    lowStockCount,
    todayOrders,
    yesterdayOrders,
    pendingOrders,
    deliveredOrders,
    cancelledOrders,
    todayRevenueAgg,
    yesterdayRevenueAgg,
    totalRevenueAgg,
    monthRevenueAgg,
    lastMonthRevenueAgg,
    coinsIssuedAgg,
    coinsRedeemedAgg,
    walletBalanceAgg,
    recentOrders,
    dailySales,
    topProducts,
  ] = await Promise.all([
    Product.countDocuments(),
    Order.countDocuments(),
    User.countDocuments({ role: 'customer' }),
    Coupon.countDocuments({ isActive: true }),
    Product.distinct('category').then((c) => c.filter(Boolean).length),
    Product.countDocuments({ $or: [{ stock: { $lte: 5 } }, { stock: { $exists: false } }] }),
    Order.countDocuments({ createdAt: { $gte: startOfToday } }),
    Order.countDocuments({ createdAt: { $gte: startOfYesterday, $lt: startOfToday } }),
    Order.countDocuments({ orderStatus: { $in: pendingStatuses } }),
    Order.countDocuments({ orderStatus: { $in: ['Delivered', 'Completed'] } }),
    Order.countDocuments({ orderStatus: 'Cancelled' }),
    Order.aggregate([
      { $match: { createdAt: { $gte: startOfToday }, ...paidMatch } },
      { $group: { _id: null, total: { $sum: { $ifNull: ['$payableAmount', '$totalAmount'] } } } },
    ]),
    Order.aggregate([
      { $match: { createdAt: { $gte: startOfYesterday, $lt: startOfToday }, ...paidMatch } },
      { $group: { _id: null, total: { $sum: { $ifNull: ['$payableAmount', '$totalAmount'] } } } },
    ]),
    Order.aggregate([
      { $match: paidMatch },
      { $group: { _id: null, total: { $sum: { $ifNull: ['$payableAmount', '$totalAmount'] } } } },
    ]),
    Order.aggregate([
      { $match: { createdAt: { $gte: startOfMonth }, ...paidMatch } },
      { $group: { _id: null, total: { $sum: { $ifNull: ['$payableAmount', '$totalAmount'] } } } },
    ]),
    Order.aggregate([
      { $match: { createdAt: { $gte: startOfLastMonth, $lte: endOfLastMonth }, ...paidMatch } },
      { $group: { _id: null, total: { $sum: { $ifNull: ['$payableAmount', '$totalAmount'] } } } },
    ]),
    WalletTransaction.aggregate([
      { $match: { type: 'EARN', status: 'COMPLETED' } },
      { $group: { _id: null, total: { $sum: '$credit' } } },
    ]),
    WalletTransaction.aggregate([
      { $match: { type: 'REDEEM', status: 'COMPLETED' } },
      { $group: { _id: null, total: { $sum: '$debit' } } },
    ]),
    Wallet.aggregate([{ $group: { _id: null, total: { $sum: '$availableCoins' } } }]),
    Order.find()
      .sort({ createdAt: -1 })
      .limit(6)
      .select('orderStatus totalAmount payableAmount paymentInfo createdAt shippingAddress.fullName')
      .lean(),
    Order.aggregate([
      { $match: { createdAt: { $gte: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000) }, ...paidMatch } },
      {
        $group: {
          _id: { $dateToString: { format: '%Y-%m-%d', date: '$createdAt' } },
          revenue: { $sum: { $ifNull: ['$payableAmount', '$totalAmount'] } },
          orders: { $sum: 1 },
        },
      },
      { $sort: { _id: 1 } },
    ]),
    Order.aggregate([
      { $unwind: '$orderItems' },
      { $group: { _id: '$orderItems.name', qty: { $sum: '$orderItems.quantity' }, revenue: { $sum: { $multiply: ['$orderItems.price', '$orderItems.quantity'] } } } },
      { $sort: { qty: -1 } },
      { $limit: 5 },
    ]),
  ]);

  const todayRevenue = todayRevenueAgg[0]?.total || 0;
  const yesterdayRevenue = yesterdayRevenueAgg[0]?.total || 0;
  const monthRevenue = monthRevenueAgg[0]?.total || 0;
  const lastMonthRevenue = lastMonthRevenueAgg[0]?.total || 0;
  const revenueGrowth = lastMonthRevenue > 0
    ? Math.round(((monthRevenue - lastMonthRevenue) / lastMonthRevenue) * 100)
    : monthRevenue > 0 ? 100 : 0;
  const ordersGrowth = yesterdayOrders > 0
    ? Math.round(((todayOrders - yesterdayOrders) / yesterdayOrders) * 100)
    : todayOrders > 0 ? 100 : 0;

  res.status(200).json({
    success: true,
    stats: {
      productCount,
      orderCount,
      userCount,
      couponCount,
      categoryCount,
      lowStockCount,
      todayOrders,
      yesterdayOrders,
      pendingOrders,
      deliveredOrders,
      cancelledOrders,
      todayRevenue,
      yesterdayRevenue,
      totalRevenue: totalRevenueAgg[0]?.total || 0,
      monthRevenue,
      revenueGrowth,
      ordersGrowth,
      coinsIssued: coinsIssuedAgg[0]?.total || 0,
      coinsRedeemed: coinsRedeemedAgg[0]?.total || 0,
      walletBalance: walletBalanceAgg[0]?.total || 0,
      recentOrders,
      dailySales,
      topProducts,
    },
  });
});

// Update Admin Password
module.exports.updateAdminPassword = wrapAsync(async (req, res) => {
  const { currentPassword, newPassword } = req.body;

  if (!currentPassword || !newPassword) {
    throw new ExpressError(400, 'Current and new password are required.');
  }

  const admin = await User.findById(req.user._id).select('+password');
  if (!admin) {
    throw new ExpressError(404, 'Admin not found.');
  }

  const isMatch = await bcrypt.compare(currentPassword, admin.password);
  if (!isMatch) {
    throw new ExpressError(401, 'Incorrect current password.');
  }

  const salt = await bcrypt.genSalt(10);
  admin.password = await bcrypt.hash(newPassword, salt);
  
  await admin.save();

  res.status(200).json({
    success: true,
    message: 'Password successfully updated.',
  });
});