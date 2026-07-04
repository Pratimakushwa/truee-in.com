// const Razorpay = require('razorpay');
// const crypto = require('crypto');
// const Order = require('../models/orderModel'); // Apna file path ek baar check kar lena (capital O ya small o)

// // Razorpay ka instance banayein .env keys ke sath
// const razorpayInstance = new Razorpay({
//     key_id: process.env.RAZORPAY_KEY_ID,
//     key_secret: process.env.RAZORPAY_KEY_SECRET,
// });

// // -------------------------------------------------------------------
// // API 1: Naya Order Create Karna (Razorpay + COD)
// // -------------------------------------------------------------------
// exports.createOrder = async (req, res) => {
//     try {
//         const { amount, paymentMethod, orderDetails } = req.body;

//         if (!amount) {
//             return res.status(400).json({ success: false, message: 'Amount is required' });
//         }

//         // ✅ COD ORDER - Direct DB save karenge
//         if (paymentMethod === 'cod') {
//             try {
//                 const userId = req.user ? req.user._id : null;

//                 const newOrder = new Order({
//                     user: userId,
//                     guestEmail: orderDetails?.email,
//                     orderItems: orderDetails?.items || [],
//                     totalAmount: amount,
//                     shippingAddress: orderDetails?.shippingAddress || {},
//                     paymentInfo: {
//                         method: 'COD',
//                         paymentStatus: 'Pending'
//                     },
//                     orderStatus: 'Processing'
//                 });

//                 const savedOrder = await newOrder.save();

//                 return res.status(200).json({
//                     success: true,
//                     message: 'COD Order created successfully',
//                     orderId: savedOrder._id
//                 });
//             } catch (dbError) {
//                 console.error("❌ COD Order Save Error:", dbError.message);
//                 return res.status(500).json({
//                     success: false,
//                     message: "Failed to create order: " + dbError.message
//                 });
//             }
//         }

//         // ✅ RAZORPAY ORDER - Razorpay order create karenge
//         const options = {
//             amount: amount * 100,
//             currency: 'INR',
//             receipt: `receipt_order_${Date.now()}`,
//         };

//         const order = await razorpayInstance.orders.create(options);
        
//         res.status(200).json({ 
//             success: true, 
//             order,
//             key_id: process.env.RAZORPAY_KEY_ID 
//         });
//     } catch (error) {
//         console.error("Error creating order:", error);
//         res.status(500).json({ success: false, message: 'Error creating order' });
//     }
// };

// // -------------------------------------------------------------------
// // API 2: Payment Verify Karna aur Database mein Save Karna
// // -------------------------------------------------------------------
// exports.verifyPayment = async (req, res) => {
//     try {
//         // Frontend se aane wali details
//         const { razorpay_order_id, razorpay_payment_id, razorpay_signature, orderDetails } = req.body;

//         // Security ke liye backend par signature recreate karein
//         const sign = razorpay_order_id + "|" + razorpay_payment_id;
//         const expectedSign = crypto
//             .createHmac("sha256", process.env.RAZORPAY_KEY_SECRET)
//             .update(sign.toString())
//             .digest("hex");

//         // 1. Check karein ki signature match hota hai ya nahi
//         if (razorpay_signature === expectedSign) {
//             // ✅ PAYMENT 100% SUCCESSFUL

//             try {
//                 // ⚡ FIX: Fallback for req.user if middleware is missing
//                 const userId = req.user ? req.user._id : null;
//                 const guestEmail = orderDetails?.email;

//                 // ⚡ FIX: Matching Exact Mongoose Schema
//                 const newOrder = new Order({
//                     user: userId,
//                     guestEmail: guestEmail,
//                     orderItems: orderDetails.items,
//                     totalAmount: orderDetails.totalAmount,
//                     shippingAddress: orderDetails.shippingAddress,
//                     paymentInfo: {
//                         method: 'Razorpay',
//                         transactionId: razorpay_payment_id,
//                         paymentStatus: 'Paid'
//                     },
//                     orderStatus: 'Processing'
//                 });
                
//                 const savedOrder = await newOrder.save();

//                 return res.status(200).json({ 
//                     success: true, 
//                     message: "Payment verified successfully & Order Saved!",
//                     orderId: savedOrder._id
//                 });

//             } catch (dbError) {
//                 // Agar Payment ho gaya par DB save nahi hua
//                 console.error("❌ Database Save Error:", dbError.message);
//                 return res.status(500).json({ 
//                     success: false, 
//                     message: "Payment successful but Database Error: " + dbError.message 
//                 });
//             }

//         } else {
//             // ❌ FAKE/HACKED PAYMENT
//             return res.status(400).json({ 
//                 success: false, 
//                 message: "Invalid signature sent! Payment failed." 
//             });
//         }
//     } catch (error) {
//         console.error("Verification Route Error:", error);
//         res.status(500).json({ success: false, message: 'Error verifying payment' });
//     }
// };

// const Razorpay = require('razorpay');
// const crypto = require('crypto');
// const Order = require('../models/orderModel'); // Apna file path ek baar check kar lena
// // ⚡ NAYE IMPORTS
// const User = require('../models/userModel');
// const Coupon = require('../models/Coupon');

// // Razorpay ka instance banayein .env keys ke sath
// const razorpayInstance = new Razorpay({
//     key_id: process.env.RAZORPAY_KEY_ID,
//     key_secret: process.env.RAZORPAY_KEY_SECRET,
// });

// // -------------------------------------------------------------------
// // API 1: Naya Order Create Karna (Razorpay + COD)
// // -------------------------------------------------------------------
// exports.createOrder = async (req, res) => {
//     try {
//         const { amount, paymentMethod, orderDetails } = req.body;

//         if (!amount) {
//             return res.status(400).json({ success: false, message: 'Amount is required' });
//         }

//         // ✅ COD ORDER - Direct DB save karenge
//         if (paymentMethod === 'cod') {
//             try {
//                 const userId = req.user ? req.user._id : null;

//                 const newOrder = new Order({
//                     user: userId,
//                     guestEmail: orderDetails?.email,
//                     orderItems: orderDetails?.items || [],
//                     totalAmount: amount,
//                     discountAmount: orderDetails?.discountAmount || 0, // ⚡ Save discount
//                     couponApplied: orderDetails?.couponApplied || null, // ⚡ Save coupon code
//                     shippingAddress: orderDetails?.shippingAddress || {},
//                     paymentInfo: {
//                         method: 'COD',
//                         paymentStatus: 'Pending'
//                     },
//                     orderStatus: 'Processing'
//                 });

//                 const savedOrder = await newOrder.save();

//   // ⚡ COUPON USED LOGIC (Update Status instead of Delete)
//   // ==========================================
//   if (orderDetails?.couponApplied) {
//       await Coupon.findOneAndUpdate(
//           { code: orderDetails.couponApplied }, 
//           { $inc: { usedCount: 1 } }
//       );

//       if (userId) {
//           // ⚡ Yahan user ke array me coupon ko "Used" mark kar rahe hain
//           await User.findOneAndUpdate(
//               { _id: userId, "coupons.code": orderDetails.couponApplied },
//               { 
//                   $set: { 
//                       "coupons.$.status": "Used", 
//                       "coupons.$.usedAt": new Date() 
//                   } 
//               }
//           );
//       }
//   }
//   // ==========================================

//                 return res.status(200).json({
//                     success: true,
//                     message: 'COD Order created successfully',
//                     orderId: savedOrder._id
//                 });
//             } catch (dbError) {
//                 console.error("❌ COD Order Save Error:", dbError.message);
//                 return res.status(500).json({
//                     success: false,
//                     message: "Failed to create order: " + dbError.message
//                 });
//             }
//         }

//         // ✅ RAZORPAY ORDER - Razorpay order create karenge
//         const options = {
//             amount: amount * 100,
//             currency: 'INR',
//             receipt: `receipt_order_${Date.now()}`,
//         };

//         const order = await razorpayInstance.orders.create(options);
        
//         res.status(200).json({ 
//             success: true, 
//             order,
//             key_id: process.env.RAZORPAY_KEY_ID 
//         });
//     } catch (error) {
//         console.error("Error creating order:", error);
//         res.status(500).json({ success: false, message: 'Error creating order' });
//     }
// };

// // -------------------------------------------------------------------
// // API 2: Payment Verify Karna aur Database mein Save Karna
// // -------------------------------------------------------------------
// exports.verifyPayment = async (req, res) => {
//     try {
//         // Frontend se aane wali details
//         const { razorpay_order_id, razorpay_payment_id, razorpay_signature, orderDetails } = req.body;

//         // Security ke liye backend par signature recreate karein
//         const sign = razorpay_order_id + "|" + razorpay_payment_id;
//         const expectedSign = crypto
//             .createHmac("sha256", process.env.RAZORPAY_KEY_SECRET)
//             .update(sign.toString())
//             .digest("hex");

//         // 1. Check karein ki signature match hota hai ya nahi
//         if (razorpay_signature === expectedSign) {
//             // ✅ PAYMENT 100% SUCCESSFUL

//             try {
//                 const userId = req.user ? req.user._id : null;
//                 const guestEmail = orderDetails?.email;

//                 const newOrder = new Order({
//                     user: userId,
//                     guestEmail: guestEmail,
//                     orderItems: orderDetails.items,
//                     totalAmount: orderDetails.totalAmount,
//                     discountAmount: orderDetails.discountAmount || 0, // ⚡ Save discount
//                     couponApplied: orderDetails.couponApplied || null, // ⚡ Save coupon code
//                     shippingAddress: orderDetails.shippingAddress,
//                     paymentInfo: {
//                         method: 'Razorpay',
//                         transactionId: razorpay_payment_id,
//                         paymentStatus: 'Paid'
//                     },
//                     orderStatus: 'Processing'
//                 });
                
//                 const savedOrder = await newOrder.save();

//                 // ==========================================
//                 // ⚡ COUPON USED LOGIC (Razorpay ke liye)
//                 // ==========================================
//                 if (orderDetails?.couponApplied) {
//                     await Coupon.findOneAndUpdate(
//                         { code: orderDetails.couponApplied }, 
//                         { $inc: { usedCount: 1 } }
//                     );

//                     if (userId) {
//                         await User.findByIdAndUpdate(userId, {
//                             $pull: { coupons: orderDetails.couponApplied }
//                         });
//                     }
//                 }
//                 // ==========================================

//                 return res.status(200).json({ 
//                     success: true, 
//                     message: "Payment verified successfully & Order Saved!",
//                     orderId: savedOrder._id
//                 });

//             } catch (dbError) {
//                 console.error("❌ Database Save Error:", dbError.message);
//                 return res.status(500).json({ 
//                     success: false, 
//                     message: "Payment successful but Database Error: " + dbError.message 
//                 });
//             }

//         } else {
//             // ❌ FAKE/HACKED PAYMENT
//             return res.status(400).json({ 
//                 success: false, 
//                 message: "Invalid signature sent! Payment failed." 
//             });
//         }
//     } catch (error) {
//         console.error("Verification Route Error:", error);
//         res.status(500).json({ success: false, message: 'Error verifying payment' });
//     }
// };

const Razorpay = require('razorpay');
const crypto = require('crypto');
const Order = require('../models/orderModel'); 
const User = require('../models/userModel');
const Coupon = require('../models/Coupon');
const { validateRedeemAmount } = require('../services/rewardCalculationService');
const { getOrCreateWallet } = require('../services/walletService');
const { prepareOrderRewardFields, redeemCoinsForOrder } = require('../services/rewardOrderService');
const { sendOrderPlacedEmail } = require('../services/orderEmailService');

const razorpayInstance = new Razorpay({
    key_id: process.env.RAZORPAY_KEY_ID,
    key_secret: process.env.RAZORPAY_KEY_SECRET,
});

const buildOrderPayload = async (req, amount, orderDetails, paymentMethod) => {
    const userId = req.user ? req.user._id : null;
    const coinsToRedeem = Number(orderDetails?.coinsToRedeem) || 0;
    const orderTotal = Number(orderDetails?.totalAmount ?? amount);
    const itemsPrice = orderDetails?.itemsPrice ?? orderTotal;
    const discountAmount = orderDetails?.discountAmount || 0;

    let payableAmount = orderTotal;
    let validatedCoins = 0;

    if (userId && coinsToRedeem > 0) {
        const wallet = await getOrCreateWallet(userId);
        const validation = await validateRedeemAmount(coinsToRedeem, wallet.availableCoins, orderTotal);
        if (!validation.valid) {
            const err = new Error(validation.message);
            err.statusCode = 400;
            throw err;
        }
        validatedCoins = validation.coinsToRedeem;
        payableAmount = validation.payableAmount;
    }

    const rewardFields = await prepareOrderRewardFields(itemsPrice, discountAmount);

    const initialStatus = paymentMethod === 'cod' ? 'Pending' : 'Confirmed';

    return {
        userId,
        payableAmount,
        validatedCoins,
        rewardFields,
        orderData: {
            user: userId,
            guestEmail: orderDetails?.email,
            orderItems: orderDetails?.items || [],
            itemsPrice,
            totalAmount: orderTotal,
            payableAmount,
            discountAmount,
            couponApplied: orderDetails?.couponApplied || null,
            coinsRedeemed: validatedCoins,
            coinsEarned: rewardFields.coinsEarned,
            rewardStatus: rewardFields.rewardStatus,
            shippingAddress: orderDetails?.shippingAddress || {},
            shippingPrice: orderDetails?.shippingPrice || 0,
            paymentInfo: {
                method: paymentMethod === 'cod' ? 'COD' : 'Razorpay',
                paymentStatus: paymentMethod === 'cod' ? 'Pending' : 'Paid',
            },
            orderStatus: initialStatus,
            statusHistory: [{
                status: initialStatus,
                note: paymentMethod === 'cod' ? 'Order placed — COD' : 'Payment successful',
                updatedAt: new Date(),
            }],
        },
    };
};

const notifyOrderPlaced = async (savedOrder, userId) => {
    if (!userId) return;
    const user = await User.findById(userId).select('name email');
    if (user) sendOrderPlacedEmail(savedOrder, user).catch(() => {});
};

const applyCouponUsage = async (orderDetails, userId) => {
    if (!orderDetails?.couponApplied) return;
    await Coupon.findOneAndUpdate(
        { code: orderDetails.couponApplied },
        { $inc: { usedCount: 1 } },
    );
    if (userId) {
        await User.findOneAndUpdate(
            { _id: userId, 'coupons.code': orderDetails.couponApplied },
            { $set: { 'coupons.$.status': 'Used', 'coupons.$.usedAt': new Date() } },
        );
    }
};

// -------------------------------------------------------------------
// API 1: Naya Order Create Karna (Razorpay + COD)
// -------------------------------------------------------------------
exports.createOrder = async (req, res) => {
    try {
        const { amount, paymentMethod, orderDetails } = req.body;

        if (!amount) {
            return res.status(400).json({ success: false, message: 'Amount is required' });
        }

        if (paymentMethod === 'cod') {
            try {
                const { userId, payableAmount, validatedCoins, orderData } =
                    await buildOrderPayload(req, amount, orderDetails, 'cod');

                const newOrder = new Order(orderData);
                const savedOrder = await newOrder.save();

                if (validatedCoins > 0 && userId) {
                    await redeemCoinsForOrder(userId, validatedCoins, savedOrder._id);
                }

                await applyCouponUsage(orderDetails, userId);
                await notifyOrderPlaced(savedOrder, userId);

                return res.status(200).json({
                    success: true,
                    message: 'COD Order created successfully',
                    orderId: savedOrder._id,
                    coinsRedeemed: validatedCoins,
                    payableAmount,
                    coinsEarned: orderData.coinsEarned,
                });
            } catch (dbError) {
                console.error('❌ COD Order Save Error:', dbError.message);
                return res.status(dbError.statusCode || 500).json({
                    success: false,
                    message: dbError.message || 'Failed to create order',
                });
            }
        }

        const { payableAmount, validatedCoins, orderData } =
            await buildOrderPayload(req, amount, orderDetails, 'razorpay');

        const options = {
            amount: Math.round(payableAmount * 100),
            currency: 'INR',
            receipt: `receipt_order_${Date.now()}`,
            notes: {
                coinsRedeemed: String(validatedCoins),
                originalAmount: String(amount),
            },
        };

        const order = await razorpayInstance.orders.create(options);
        
        res.status(200).json({ 
            success: true, 
            order,
            key_id: process.env.RAZORPAY_KEY_ID,
            payableAmount,
            coinsRedeemed: validatedCoins,
            coinsEarned: orderData.coinsEarned,
        });
    } catch (error) {
        console.error('Error creating order:', error);
        res.status(error.statusCode || 500).json({
            success: false,
            message: error.message || 'Error creating order',
        });
    }
};

// -------------------------------------------------------------------
// API 2: Payment Verify Karna aur Database mein Save Karna
// -------------------------------------------------------------------
exports.verifyPayment = async (req, res) => {
    try {
        const { razorpay_order_id, razorpay_payment_id, razorpay_signature, orderDetails } = req.body;

        const sign = razorpay_order_id + "|" + razorpay_payment_id;
        const expectedSign = crypto
            .createHmac("sha256", process.env.RAZORPAY_KEY_SECRET)
            .update(sign.toString())
            .digest("hex");

        if (razorpay_signature === expectedSign) {
            try {
                const amount = orderDetails?.totalAmount || orderDetails?.amount;
                const { userId, validatedCoins, orderData } =
                    await buildOrderPayload(req, amount, orderDetails, 'razorpay');

                const newOrder = new Order({
                    ...orderData,
                    paymentInfo: {
                        method: 'Razorpay',
                        transactionId: razorpay_payment_id,
                        paymentStatus: 'Paid',
                    },
                });
                
                const savedOrder = await newOrder.save();

                if (validatedCoins > 0 && userId) {
                    await redeemCoinsForOrder(userId, validatedCoins, savedOrder._id);
                }

                await applyCouponUsage(orderDetails, userId);
                await notifyOrderPlaced(savedOrder, userId);

                return res.status(200).json({ 
                    success: true, 
                    message: "Payment verified successfully & Order Saved!",
                    orderId: savedOrder._id,
                    coinsRedeemed: validatedCoins,
                    coinsEarned: orderData.coinsEarned,
                });

            } catch (dbError) {
                console.error("❌ Database Save Error:", dbError.message);
                return res.status(dbError.statusCode || 500).json({ 
                    success: false, 
                    message: dbError.message || "Payment successful but order save failed.",
                });
            }

        } else {
            return res.status(400).json({ 
                success: false, 
                message: "Invalid signature sent! Payment failed." 
            });
        }
    } catch (error) {
        console.error("Verification Route Error:", error);
        res.status(500).json({ success: false, message: 'Error verifying payment' });
    }
};