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
const User = require('../models/userModel');
const Coupon = require('../models/Coupon'); 
const wrapAsync = require('../utils/wrapAsync');
const ExpressError = require('../utils/expressError'); 
const mongoose = require('mongoose');

// ⚡ EMAIL & SHIPROCKET SERVICES IMPORTS
const { sendOrderPlacedEmail } = require('../services/emailService'); 
const { 
  createShiprocketOrder, 
  generateShiprocketAWB, 
  requestShiprocketPickup 
} = require('../services/shiprocketService');

// ==========================================
// 1. ORDER CREATE KARNA (INSTANT CHECKOUT)
// ==========================================
exports.instantCheckout = wrapAsync(async (req, res) => {
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

  // Step A: Order ko apne Database mein save karo
  const newOrder = await Order.create({
    user: userId,
    orderItems: formattedOrderItems,
    itemsPrice: totalAmount + (discountAmount || 0), 
    totalAmount: totalAmount, 
    discountAmount: discountAmount || 0, 
    couponApplied: couponApplied || null, 
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

  // Step B: Product ka sold count update karo
  for (let item of cartItems) {
    if(item.productId || item.product) {
       await Product.findByIdAndUpdate(item.productId || item.product, {
          $inc: { soldCount: item.quantity }
       });
    }
  }

  // Step C: Coupon Logic (Admin count & User Profile sync)
  if (couponApplied) {
      await Coupon.findOneAndUpdate(
          { code: couponApplied }, 
          { $inc: { usedCount: 1 } }
      );

      if (req.user) {
          await User.findByIdAndUpdate(req.user._id, {
              $pull: { coupons: couponApplied } 
          });
      }
  }

  // ==========================================
  // ⚡ SHIPROCKET FULL AUTOMATION
  // ==========================================
  try {
    const nameParts = newOrder.shippingAddress.fullName.split(' ');
    const fName = nameParts[0];
    const lName = nameParts.length > 1 ? nameParts.slice(1).join(' ') : 'Customer';

    const shiprocketPayload = {
      order_id: newOrder._id.toString(), 
      order_date: new Date().toISOString().replace('T', ' ').substring(0, 16),
      pickup_location: "Primary", 
      billing_customer_name: fName,
      billing_last_name: lName, 
      billing_address: newOrder.shippingAddress.addressLine1,
      billing_city: newOrder.shippingAddress.city,
      billing_pincode: newOrder.shippingAddress.pincode,
      billing_state: newOrder.shippingAddress.state,
      billing_country: "India",
      billing_email: req.user ? req.user.email : (req.body.email || "guest@trueeluxury.com"),
      billing_phone: newOrder.shippingAddress.phone,
      shipping_is_billing: true, 
      order_items: formattedOrderItems.map(item => ({
        name: item.name,
        sku: item.product.toString(),
        units: item.quantity,
        selling_price: item.price
      })),
      payment_method: newOrder.paymentInfo.method === 'COD' ? 'COD' : 'Prepaid',
      sub_total: totalAmount,
      length: 10, breadth: 10, height: 10, weight: 1
    };

    const shiprocketResponse = await createShiprocketOrder(shiprocketPayload);
    
    if(shiprocketResponse && shiprocketResponse.order_id && shiprocketResponse.shipment_id) {
      newOrder.shiprocketOrderId = shiprocketResponse.order_id;
      
      const awbResponse = await generateShiprocketAWB(shiprocketResponse.shipment_id);
      
      if (awbResponse && awbResponse.awb_code) {
        newOrder.trackingDetails = {
          courierPartner: awbResponse.courier_name || 'Assigned Courier',
          awbNumber: awbResponse.awb_code,
          shippedAt: new Date()
        };
        
        await requestShiprocketPickup(shiprocketResponse.shipment_id);
      }
      
      await newOrder.save();
      console.log("🚀 Shiprocket Order, AWB, and Pickup Automated Successfully!");
    }
  } catch (shiprocketError) {
    console.error("⚠️ Shiprocket Automation Failed:", shiprocketError.message);
    if (shiprocketError.response && shiprocketError.response.data) {
       console.error("🔴 SHIPROCKET API ERROR REASON:", JSON.stringify(shiprocketError.response.data, null, 2));
    }
  }

  // ==========================================
  // 📨 AUTOMATIC EMAIL NOTIFICATION CODE
  // ==========================================
  
  // 1. CUSTOMER KO EMAIL BHEJNA
  try {
    let customerData = req.user ? req.user : {
      name: newOrder.shippingAddress.fullName,
      email: req.body.email || "customer@truee.in"
    };
    
    await sendOrderPlacedEmail(newOrder, customerData);
    console.log(`✅ Confirmation email sent to CUSTOMER (${customerData.email})`);
  } catch (mailError) {
    console.error("❌ Customer Email trigger failed:", mailError.message);
  }

  // 2. ⚡ ADMIN KO EMAIL BHEJNA 
  try {
    // Agar env me ADMIN_EMAIL nahi mili, toh direct ye wali id use hogi
    let adminEmailId = process.env.ADMIN_EMAIL || "pratimaku6267@gmail.com"; 
    
    await sendOrderPlacedEmail(newOrder, {
      name: "Truee Luxury Admin",
      email: adminEmailId, 
      isAdminAlert: true
    });
    console.log(`✅ Alert email sent to ADMIN (${adminEmailId})`);
  } catch (adminMailError) {
    console.error("❌ Admin Email trigger failed:", adminMailError.message);
  }

  // Final Success Response
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
// 3. GET ORDER BY ID (Premium Tracking Page)
// ==========================================
exports.getOrderById = wrapAsync(async (req, res) => {
  const order = await Order.findById(req.params.id);
  
  if (!order) {
    throw new ExpressError(404, "Order not found");
  }
  
  if (req.user && order.user.toString() !== req.user._id.toString()) {
    throw new ExpressError(403, "You are not authorized to view this order");
  }

  res.status(200).json({ success: true, data: order });
});

// ==========================================
// ⚡ 4. SHIPROCKET WEBHOOK (AUTOMATIC STATUS UPDATE)
// ==========================================
exports.shiprocketWebhook = wrapAsync(async (req, res) => {
  const { awb, current_status, order_id } = req.body;

  console.log(`📦 Webhook Received for Order: ${order_id} | Status: ${current_status}`);

  const order = await Order.findById(order_id);
  
  if (!order) {
    return res.status(200).send('Order not found, but webhook received.');
  }

  let newStatus = order.orderStatus;
  const statusUpper = current_status.toUpperCase();

  if (statusUpper.includes('DELIVERED')) {
    newStatus = 'Delivered';
    order.deliveredAt = new Date();
  } else if (statusUpper.includes('OUT FOR DELIVERY')) {
    newStatus = 'Out for Delivery';
  } else if (statusUpper.includes('IN TRANSIT') || statusUpper.includes('SHIPPED')) {
    newStatus = 'Shipped';
  } else if (statusUpper.includes('CANCELED') || statusUpper.includes('CANCELLED')) {
    newStatus = 'Cancelled';
  } else if (statusUpper.includes('RETURN')) {
    newStatus = 'Returned';
  }

  if (newStatus !== order.orderStatus) {
    order.orderStatus = newStatus;
    
    order.statusHistory.push({
      status: newStatus,
      note: `Status auto-updated via Shiprocket. (AWB: ${awb})`,
      updatedAt: new Date()
    });

    await order.save();
    console.log(`✅ Order ${order_id} successfully auto-updated to ${newStatus}`);
  }

  res.status(200).json({ success: true, message: "Webhook processed" });
});