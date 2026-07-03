// // const Order = require('../models/orderModel'); // Apna path check kar lijiye
// // const Product = require('../models/ProductModel'); // Apna path check kar lijiye
// // const wrapAsync = require('../utils/wrapAsync');
// // const mongoose = require('mongoose');

// // exports.instantCheckout = wrapAsync(async (req, res) => {
// //   const { cartItems, totalAmount } = req.body;

// //   // 1. USER CHECK: Agar token se user nahi aaya, toh ek valid dummy ID bana do testing ke liye
// //   const userId = req.user ? req.user._id : new mongoose.Types.ObjectId();

// //   if (!cartItems || cartItems.length === 0) {
// //     return res.status(400).json({ success: false, error: "Cart is empty" });
// //   }

// //   try {
// //     // 2. Format Items exactly as the Order Schema wants them
// //     const formattedOrderItems = cartItems.map(item => ({
// //       product: item.productId || item.product, 
// //       name: item.name,
// //       image: item.image || 'default-image.jpg',
// //       price: item.price,
// //       quantity: item.quantity
// //     }));

// //     // 3. Create the Order with ALL REQUIRED FIELDS to satisfy MongoDB
// //     const newOrder = await Order.create({
// //       user: userId,
// //       orderItems: formattedOrderItems,
// //       itemsPrice: totalAmount,
// //       totalAmount: totalAmount,
// //       paymentInfo: {
// //         method: 'COD',
// //         paymentStatus: 'Paid' // Fake status for instant checkout testing
// //       },
// //       shippingAddress: {
// //         fullName: req.user ? req.user.name : "Luxury VIP Guest",
// //         phone: "9876543210",
// //         addressLine1: "123 Truee Luxury Avenue",
// //         city: "Mumbai",
// //         state: "Maharashtra",
// //         pincode: "400001" // Ab MongoDB error nahi dega!
// //       }
// //     });

// //     // 4. Update product popularity (soldCount)
// //     for (let item of cartItems) {
// //       if(item.productId || item.product) {
// //          await Product.findByIdAndUpdate(item.productId || item.product, {
// //            $inc: { soldCount: item.quantity }
// //          });
// //       }
// //     }

// //     // 5. Success Response
// //     res.status(200).json({ 
// //       success: true, 
// //       message: "Order placed successfully!",
// //       orderId: newOrder._id 
// //     });

// //   } catch (error) {
// //     console.error("Checkout Crash:", error);
// //     res.status(500).json({ success: false, error: "Failed to create order." });
// //   }
// // });

// // const Order = require('../models/orderModel'); // Apna path check kar lijiye
// // const Product = require('../models/ProductModel'); // Apna path check kar lijiye
// // const wrapAsync = require('../utils/wrapAsync');
// // const mongoose = require('mongoose');

// // // ==========================================
// // // 1. ORDER CREATE KARNA (Tumhara Code)
// // // ==========================================
// // exports.instantCheckout = wrapAsync(async (req, res) => {
// //   const { cartItems, totalAmount } = req.body;

// //   // 1. USER CHECK: Agar token se user nahi aaya, toh ek valid dummy ID bana do testing ke liye
// //   const userId = req.user ? req.user._id : new mongoose.Types.ObjectId();

// //   if (!cartItems || cartItems.length === 0) {
// //     return res.status(400).json({ success: false, error: "Cart is empty" });
// //   }

// //   // 2. Format Items exactly as the Order Schema wants them
// //   const formattedOrderItems = cartItems.map(item => ({
// //     product: item.productId || item.product, 
// //     name: item.name,
// //     image: item.image || 'default-image.jpg',
// //     price: item.price,
// //     quantity: item.quantity
// //   }));

// //   // 3. Create the Order with ALL REQUIRED FIELDS to satisfy MongoDB
// //   const newOrder = await Order.create({
// //     user: userId,
// //     orderItems: formattedOrderItems,
// //     itemsPrice: totalAmount,
// //     totalAmount: totalAmount,
// //     paymentInfo: {
// //       method: 'COD',
// //       paymentStatus: 'Paid' // Fake status for instant checkout testing
// //     },
// //     shippingAddress: {
// //       fullName: req.user ? req.user.name : "Luxury VIP Guest",
// //       phone: "9876543210",
// //       addressLine1: "123 Truee Luxury Avenue",
// //       city: "Mumbai",
// //       state: "Maharashtra",
// //       pincode: "400001" // Ab MongoDB error nahi dega!
// //     }
// //   });

// //   // 4. Update product popularity (soldCount)
// //   for (let item of cartItems) {
// //     if(item.productId || item.product) {
// //        await Product.findByIdAndUpdate(item.productId || item.product, {
// //          $inc: { soldCount: item.quantity }
// //        });
// //     }
// //   }

// //   // 5. Success Response
// //   res.status(200).json({ 
// //     success: true, 
// //     message: "Order placed successfully!",
// //     orderId: newOrder._id 
// //   });
// // });

// // // ==========================================
// // // 2. ⚡ NAYA: ORDERS FETCH KARNA (My Orders ke liye)
// // // ==========================================
// // exports.getMyOrders = wrapAsync(async (req, res) => {
// //   // 1. Check karo ki request mein user ki detail aayi hai ya nahi
// //   if (!req.user || !req.user._id) {
// //     return res.status(401).json({ success: false, message: "Please login to view orders." });
// //   }

// //   // 2. Database se is login user ke saare orders nikal lo (Naye wale sabse upar)
// //   const orders = await Order.find({ user: req.user._id }).sort({ createdAt: -1 });

// //   // 3. React Frontend ko bhej do
// //   res.status(200).json({
// //     success: true,
// //     orders: orders
// //   });
// // });

// // const Order = require('../models/orderModel'); 
// // const Product = require('../models/ProductModel'); 
// // const wrapAsync = require('../utils/wrapAsync');
// // const mongoose = require('mongoose');

// // // ==========================================
// // // 1. ORDER CREATE KARNA
// // // ==========================================
// // exports.instantCheckout = wrapAsync(async (req, res) => {
// //   const { cartItems, totalAmount } = req.body;

// //   const userId = req.user ? req.user._id : new mongoose.Types.ObjectId();

// //   if (!cartItems || cartItems.length === 0) {
// //     return res.status(400).json({ success: false, error: "Cart is empty" });
// //   }

// //   const formattedOrderItems = cartItems.map(item => ({
// //     product: item.productId || item.product, 
// //     name: item.name,
// //     image: item.image || 'default-image.jpg',
// //     price: item.price,
// //     quantity: item.quantity
// //   }));

// //   const newOrder = await Order.create({
// //     user: userId,
// //     orderItems: formattedOrderItems,
// //     itemsPrice: totalAmount,
// //     totalAmount: totalAmount,
// //     paymentInfo: {
// //       method: 'COD',
// //       paymentStatus: 'Paid' 
// //     },
// //     shippingAddress: {
// //       fullName: req.user ? req.user.name : "Luxury VIP Guest",
// //       phone: "9876543210",
// //       addressLine1: "123 Truee Luxury Avenue",
// //       city: "Mumbai",
// //       state: "Maharashtra",
// //       pincode: "400001" 
// //     }
// //   });

// //   for (let item of cartItems) {
// //     if(item.productId || item.product) {
// //        await Product.findByIdAndUpdate(item.productId || item.product, {
// //          $inc: { soldCount: item.quantity }
// //        });
// //     }
// //   }

// //   res.status(200).json({ 
// //     success: true, 
// //     message: "Order placed successfully!",
// //     orderId: newOrder._id 
// //   });
// // });

// // // ==========================================
// // // 2. ORDERS FETCH KARNA (My Orders ke liye)
// // // ==========================================
// // exports.getMyOrders = wrapAsync(async (req, res) => {
// //   if (!req.user || !req.user._id) {
// //     return res.status(401).json({ success: false, message: "Please login to view orders." });
// //   }

// //   const orders = await Order.find({ user: req.user._id }).sort({ createdAt: -1 });

// //   res.status(200).json({
// //     success: true,
// //     orders: orders
// //   });
// // });

// const Order = require('../models/orderModel'); 
// const Product = require('../models/ProductModel'); 
// const wrapAsync = require('../utils/wrapAsync');
// const ExpressError = require('../utils/expressError'); // Error handling ke liye
// const mongoose = require('mongoose');

// // ==========================================
// // 1. ORDER CREATE KARNA
// // ==========================================
// exports.instantCheckout = wrapAsync(async (req, res) => {
//   const { cartItems, totalAmount } = req.body;
//   const userId = req.user ? req.user._id : new mongoose.Types.ObjectId();

//   if (!cartItems || cartItems.length === 0) {
//     throw new ExpressError(400, "Cart is empty");
//   }

//   const formattedOrderItems = cartItems.map(item => ({
//     product: item.productId || item.product, 
//     name: item.name,
//     image: item.image || 'default-image.jpg',
//     price: item.price,
//     quantity: item.quantity
//   }));

//   const newOrder = await Order.create({
//     user: userId,
//     orderItems: formattedOrderItems,
//     itemsPrice: totalAmount,
//     totalAmount: totalAmount,
//     paymentInfo: { method: 'COD', paymentStatus: 'Paid' },
//     shippingAddress: {
//       fullName: req.user ? req.user.name : "Luxury VIP Guest",
//       phone: "9876543210",
//       addressLine1: "123 Truee Luxury Avenue",
//       city: "Mumbai",
//       state: "Maharashtra",
//       pincode: "400001" 
//     }
//   });

//   for (let item of cartItems) {
//     if(item.productId || item.product) {
//        await Product.findByIdAndUpdate(item.productId || item.product, {
//           $inc: { soldCount: item.quantity }
//        });
//     }
//   }

//   res.status(200).json({ 
//     success: true, 
//     message: "Order placed successfully!",
//     orderId: newOrder._id 
//   });
// });

// // ==========================================
// // 2. MY ORDERS FETCH KARNA (User Dashboard)
// // ==========================================
// exports.getMyOrders = wrapAsync(async (req, res) => {
//   if (!req.user) {
//     throw new ExpressError(401, "Please login to view orders.");
//   }
//   const orders = await Order.find({ user: req.user._id }).sort({ createdAt: -1 });
//   res.status(200).json({ success: true, orders });
// });

// // ==========================================
// // 3. GET ORDER BY ID (Premium Tracking Page ke liye)
// // ==========================================
// exports.getOrderById = wrapAsync(async (req, res) => {
//   const order = await Order.findById(req.params.id);
  
//   if (!order) {
//     throw new ExpressError(404, "Order not found");
//   }
  
//   // Security Check: Kya ye order usi user ka hai jo login hai?
//   if (req.user && order.user.toString() !== req.user._id.toString()) {
//     throw new ExpressError(403, "You are not authorized to view this order");
//   }

//   res.status(200).json({ success: true, data: order });
// });

const Order = require('../models/orderModel'); 
const Product = require('../models/ProductModel'); 
// ⚡ NAYE IMPORTS ADD KIYE
const User = require('../models/userModel');
const Coupon = require('../models/Coupon'); 
const wrapAsync = require('../utils/wrapAsync');
const ExpressError = require('../utils/expressError'); // Error handling ke liye
const mongoose = require('mongoose');

// ==========================================
// 1. ORDER CREATE KARNA
// ==========================================
exports.instantCheckout = wrapAsync(async (req, res) => {
  // ⚡ Frontend se aane wale couponApplied aur discountAmount ko nikal liya
  const { cartItems, totalAmount, couponApplied, discountAmount, shippingAddress, paymentInfo } = req.body;
  const userId = req.user ? req.user._id : new mongoose.Types.ObjectId();

  if (!cartItems || cartItems.length === 0) {
    throw new ExpressError(400, "Cart is empty");
  }

  const formattedOrderItems = cartItems.map(item => ({
    product: item.productId || item.product, 
    name: item.name,
    image: item.image || 'default-image.jpg',
    price: item.price,
    quantity: item.quantity
  }));

  const newOrder = await Order.create({
    user: userId,
    orderItems: formattedOrderItems,
    itemsPrice: totalAmount + (discountAmount || 0), // Discount se pehle ka price
    totalAmount: totalAmount, // Final price
    discountAmount: discountAmount || 0, // ⚡ Naya add kiya
    couponApplied: couponApplied || null, // ⚡ Naya add kiya
    paymentInfo: paymentInfo || { method: 'COD', paymentStatus: 'Paid' },
    shippingAddress: shippingAddress || {
      fullName: req.user ? req.user.name : "Luxury VIP Guest",
      phone: "9876543210",
      addressLine1: "123 Truee Luxury Avenue",
      city: "Mumbai",
      state: "Maharashtra",
      pincode: "400001" 
    }
  });

  for (let item of cartItems) {
    if(item.productId || item.product) {
       await Product.findByIdAndUpdate(item.productId || item.product, {
          $inc: { soldCount: item.quantity }
       });
    }
  }

  // ==========================================
  // ⚡ COUPON USED LOGIC (Sabse Zaroori)
  // ==========================================
  if (couponApplied) {
      // 1. Admin Dashboard ke liye: Coupon ka 'usedCount' +1 kar do
      await Coupon.findOneAndUpdate(
          { code: couponApplied }, 
          { $inc: { usedCount: 1 } }
      );

      // 2. User Profile ke liye: Agar user login hai, toh uske account se coupon nikal do
      if (req.user) {
          await User.findByIdAndUpdate(req.user._id, {
              $pull: { coupons: couponApplied } // $pull array se value remove karta hai
          });
      }
  }
  // ==========================================

  res.status(200).json({ 
    success: true, 
    message: "Order placed successfully!",
    orderId: newOrder._id 
  });
});

// ==========================================
// 2. MY ORDERS FETCH KARNA (User Dashboard)
// ==========================================
exports.getMyOrders = wrapAsync(async (req, res) => {
  if (!req.user) {
    throw new ExpressError(401, "Please login to view orders.");
  }
  const orders = await Order.find({ user: req.user._id }).sort({ createdAt: -1 });
  res.status(200).json({ success: true, orders });
});

// ==========================================
// 3. GET ORDER BY ID (Premium Tracking Page ke liye)
// ==========================================
exports.getOrderById = wrapAsync(async (req, res) => {
  const order = await Order.findById(req.params.id);
  
  if (!order) {
    throw new ExpressError(404, "Order not found");
  }
  
  // Security Check: Kya ye order usi user ka hai jo login hai?
  if (req.user && order.user.toString() !== req.user._id.toString()) {
    throw new ExpressError(403, "You are not authorized to view this order");
  }

  res.status(200).json({ success: true, data: order });
});