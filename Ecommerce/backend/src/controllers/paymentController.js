const Razorpay = require('razorpay');
const crypto = require('crypto');
const Order = require('../models/orderModel'); // Apna file path ek baar check kar lena (capital O ya small o)

// Razorpay ka instance banayein .env keys ke sath
const razorpayInstance = new Razorpay({
    key_id: process.env.RAZORPAY_KEY_ID,
    key_secret: process.env.RAZORPAY_KEY_SECRET,
});

// -------------------------------------------------------------------
// API 1: Naya Order Create Karna (Razorpay + COD)
// -------------------------------------------------------------------
exports.createOrder = async (req, res) => {
    try {
        const { amount, paymentMethod, orderDetails } = req.body;

        if (!amount) {
            return res.status(400).json({ success: false, message: 'Amount is required' });
        }

        // ✅ COD ORDER - Direct DB save karenge
        if (paymentMethod === 'cod') {
            try {
                const userId = req.user ? req.user._id : null;

                const newOrder = new Order({
                    user: userId,
                    guestEmail: orderDetails?.email,
                    orderItems: orderDetails?.items || [],
                    totalAmount: amount,
                    shippingAddress: orderDetails?.shippingAddress || {},
                    paymentInfo: {
                        method: 'COD',
                        paymentStatus: 'Pending'
                    },
                    orderStatus: 'Processing'
                });

                const savedOrder = await newOrder.save();

                return res.status(200).json({
                    success: true,
                    message: 'COD Order created successfully',
                    orderId: savedOrder._id
                });
            } catch (dbError) {
                console.error("❌ COD Order Save Error:", dbError.message);
                return res.status(500).json({
                    success: false,
                    message: "Failed to create order: " + dbError.message
                });
            }
        }

        // ✅ RAZORPAY ORDER - Razorpay order create karenge
        const options = {
            amount: amount * 100,
            currency: 'INR',
            receipt: `receipt_order_${Date.now()}`,
        };

        const order = await razorpayInstance.orders.create(options);
        
        res.status(200).json({ 
            success: true, 
            order,
            key_id: process.env.RAZORPAY_KEY_ID 
        });
    } catch (error) {
        console.error("Error creating order:", error);
        res.status(500).json({ success: false, message: 'Error creating order' });
    }
};

// -------------------------------------------------------------------
// API 2: Payment Verify Karna aur Database mein Save Karna
// -------------------------------------------------------------------
exports.verifyPayment = async (req, res) => {
    try {
        // Frontend se aane wali details
        const { razorpay_order_id, razorpay_payment_id, razorpay_signature, orderDetails } = req.body;

        // Security ke liye backend par signature recreate karein
        const sign = razorpay_order_id + "|" + razorpay_payment_id;
        const expectedSign = crypto
            .createHmac("sha256", process.env.RAZORPAY_KEY_SECRET)
            .update(sign.toString())
            .digest("hex");

        // 1. Check karein ki signature match hota hai ya nahi
        if (razorpay_signature === expectedSign) {
            // ✅ PAYMENT 100% SUCCESSFUL

            try {
                // ⚡ FIX: Fallback for req.user if middleware is missing
                const userId = req.user ? req.user._id : null;
                const guestEmail = orderDetails?.email;

                // ⚡ FIX: Matching Exact Mongoose Schema
                const newOrder = new Order({
                    user: userId,
                    guestEmail: guestEmail,
                    orderItems: orderDetails.items,
                    totalAmount: orderDetails.totalAmount,
                    shippingAddress: orderDetails.shippingAddress,
                    paymentInfo: {
                        method: 'Razorpay',
                        transactionId: razorpay_payment_id,
                        paymentStatus: 'Paid'
                    },
                    orderStatus: 'Processing'
                });
                
                const savedOrder = await newOrder.save();

                return res.status(200).json({ 
                    success: true, 
                    message: "Payment verified successfully & Order Saved!",
                    orderId: savedOrder._id
                });

            } catch (dbError) {
                // Agar Payment ho gaya par DB save nahi hua
                console.error("❌ Database Save Error:", dbError.message);
                return res.status(500).json({ 
                    success: false, 
                    message: "Payment successful but Database Error: " + dbError.message 
                });
            }

        } else {
            // ❌ FAKE/HACKED PAYMENT
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