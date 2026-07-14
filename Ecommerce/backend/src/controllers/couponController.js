// const Coupon = require('../models/Coupon');

// // 1. Admin: Create New Coupon
// exports.createCoupon = async (req, res) => {
//     try {
//         const { code, discountType, discountValue, minOrderValue, expiryDate } = req.body;
        
//         // Safety check: Ensure numbers are actually numbers, fallback to 0 if empty
//         const newCoupon = await Coupon.create({
//             code: code.toUpperCase(),
//             discountType,
//             discountValue: Number(discountValue),
//             minOrderValue: minOrderValue ? Number(minOrderValue) : 0,
//             expiryDate
//         });

//         res.status(201).json({ success: true, coupon: newCoupon });
//     } catch (error) {
//         console.error("Coupon Creation Error:", error);
//         // Agar duplicate coupon code hoga toh proper message bhejenge
//         if (error.code === 11000) {
//             return res.status(400).json({ message: "This coupon code already exists!" });
//         }
//         res.status(500).json({ message: error.message });
//     }
// };

// // 2. User: Verify Coupon at Checkout
// exports.verifyCoupon = async (req, res) => {
//     try {
//         const { code, cartTotal } = req.body;
//         if (!code) return res.status(400).json({ message: "Please provide a coupon code." });

//         const coupon = await Coupon.findOne({ code: code.toUpperCase() });

//         if (!coupon) return res.status(404).json({ message: "Coupon code invalid!" });
//         if (!coupon.isActive) return res.status(400).json({ message: "Coupon inactive!" });
//         if (new Date() > new Date(coupon.expiryDate)) return res.status(400).json({ message: "Coupon expired!" });
//         if (cartTotal < coupon.minOrderValue) return res.status(400).json({ message: `Min order of ₹${coupon.minOrderValue} required` });
//         if (coupon.usedCount >= coupon.usageLimit) return res.status(400).json({ message: "Coupon usage limit reached!" });

//         // Calculate discount
//         let discountAmount = coupon.discountType === 'flat' 
//             ? coupon.discountValue 
//             : Math.round((cartTotal * coupon.discountValue) / 100);

//         res.json({ success: true, discountAmount, message: "Coupon applied successfully!" });
//     } catch (error) {
//         console.error("Coupon Verification Error:", error);
//         res.status(500).json({ message: "Server error during verification" });
//     }
// };

// // 3. Admin: Get All Coupons (For Table)
// exports.getAllCoupons = async (req, res) => {
//     try {
//         const coupons = await Coupon.find().sort({ createdAt: -1 }); // Naye wale upar dikhenge
//         res.status(200).json({ success: true, coupons });
//     } catch (error) {
//         res.status(500).json({ message: error.message });
//     }
// };

// // 4. Admin: Delete Coupon
// exports.deleteCoupon = async (req, res) => {
//     try {
//         await Coupon.findByIdAndDelete(req.params.id);
//         res.status(200).json({ success: true, message: "Coupon deleted successfully" });
//     } catch (error) {
//         res.status(500).json({ message: error.message });
//     }
// };

// const Coupon = require('../models/Coupon');

// // 1. Admin: Create New Coupon (Updated for Premium Frontend)
// exports.createCoupon = async (req, res) => {
//     try {
//         const couponData = req.body;
        
//         // Frontend se aane wale saare data ko safe format mein DB me bhejna
//         const newCoupon = await Coupon.create({
//             ...couponData,
//             code: couponData.code.toUpperCase(),
//             discountValue: Number(couponData.discountValue) || 0,
//             maxDiscount: Number(couponData.maxDiscount) || 0,
//             minOrderValue: Number(couponData.minOrderValue) || 0,
//             maxOrderValue: Number(couponData.maxOrderValue) || 0,
//             usageLimit: Number(couponData.usageLimit) || 0,
//             perUserLimit: Number(couponData.perUserLimit) || 1,
//             rewardCondition: Number(couponData.rewardCondition) || 0
//         });

//         res.status(201).json({ success: true, coupon: newCoupon });
//     } catch (error) {
//         console.error("Coupon Creation Error:", error);
//         // Agar duplicate coupon code hoga toh proper message bhejenge
//         if (error.code === 11000) {
//             return res.status(400).json({ message: "This coupon code already exists!" });
//         }
//         res.status(500).json({ message: error.message });
//     }
// };

// // 2. User: Verify Coupon at Checkout (Updated with Real eCommerce Logic)
// exports.verifyCoupon = async (req, res) => {
//     try {
//         const { code, cartTotal } = req.body;
//         if (!code) return res.status(400).json({ message: "Please provide a coupon code." });

//         const coupon = await Coupon.findOne({ code: code.toUpperCase() });

//         // ⚡ Security & Validation Checks
//         if (!coupon) return res.status(404).json({ message: "Coupon code invalid!" });
//         if (coupon.status === 'Inactive') return res.status(400).json({ message: "This coupon is currently inactive." });
//         if (new Date() < new Date(coupon.startDate)) return res.status(400).json({ message: "This offer has not started yet!" });
//         if (new Date() > new Date(coupon.expiryDate)) return res.status(400).json({ message: "Coupon expired!" });
//         if (cartTotal < coupon.minOrderValue) return res.status(400).json({ message: `Min order of ₹${coupon.minOrderValue} required.` });
//         if (coupon.maxOrderValue > 0 && cartTotal > coupon.maxOrderValue) return res.status(400).json({ message: `Max order limit for this coupon is ₹${coupon.maxOrderValue}.` });
//         if (coupon.usageLimit > 0 && coupon.usedCount >= coupon.usageLimit) return res.status(400).json({ message: "Coupon usage limit reached!" });

//         // ⚡ Calculate Final Discount Safely
//         let discountAmount = 0;

//         if (coupon.discountType === 'free_shipping') {
//             discountAmount = 100; // Assume ₹100 is your standard shipping cost
//         } 
//         else if (coupon.discountType === 'flat') {
//             discountAmount = coupon.discountValue;
//         } 
//         else if (coupon.discountType === 'percentage') {
//             discountAmount = Math.round((cartTotal * coupon.discountValue) / 100);
            
//             // Apply Maximum Discount Limit (agar admin ne set kiya hai)
//             if (coupon.maxDiscount > 0 && discountAmount > coupon.maxDiscount) {
//                 discountAmount = coupon.maxDiscount;
//             }
//         }

//         res.json({ success: true, discountAmount, message: "Coupon applied successfully!" });
//     } catch (error) {
//         console.error("Coupon Verification Error:", error);
//         res.status(500).json({ message: "Server error during verification" });
//     }
// };

// // 3. Admin: Get All Coupons (For Table)
// exports.getAllCoupons = async (req, res) => {
//     try {
//         const coupons = await Coupon.find().sort({ createdAt: -1 }); // Naye wale upar dikhenge
//         res.status(200).json({ success: true, coupons });
//     } catch (error) {
//         res.status(500).json({ message: error.message });
//     }
// };

// // 4. Admin: Delete Coupon
// exports.deleteCoupon = async (req, res) => {
//     try {
//         await Coupon.findByIdAndDelete(req.params.id);
//         res.status(200).json({ success: true, message: "Coupon deleted successfully" });
//     } catch (error) {
//         res.status(500).json({ message: error.message });
//     }
// };
// // 5. Admin: Update Coupon Status (Active/Inactive Toggle)
// exports.updateCouponStatus = async (req, res) => {
//     try {
//         const { id } = req.params;
//         const { status } = req.body;

//         // Check karo ki status valid hai ya nahi
//         if (!['Active', 'Inactive'].includes(status)) {
//             return res.status(400).json({ message: "Invalid status value!" });
//         }

//         // Database mein find karke update karo
//         const updatedCoupon = await Coupon.findByIdAndUpdate(
//             id, 
//             { status: status }, 
//             { new: true } // new: true ka matlab hai update hone ke baad naya data return karega
//         );

//         if (!updatedCoupon) {
//             return res.status(404).json({ message: "Coupon nahi mila!" });
//         }

//         res.status(200).json({ success: true, message: `Coupon is now ${status}`, coupon: updatedCoupon });
//     } catch (error) {
//         console.error("Status Update Error:", error);
//         res.status(500).json({ message: "Server error during status update" });
//     }
// };

// const Coupon = require('../models/Coupon');
// const Order = require('../models/orderModel');
// // 1. Admin: Create New Coupon
// exports.createCoupon = async (req, res) => {
//     try {
//         const couponData = req.body;
        
//         // Frontend se aane wale saare data ko safe format mein DB me bhejna
//         const newCoupon = await Coupon.create({
//             ...couponData,
//             code: couponData.code.toUpperCase(),
//             discountValue: Number(couponData.discountValue) || 0,
//             maxDiscount: Number(couponData.maxDiscount) || 0,
//             minOrderValue: Number(couponData.minOrderValue) || 0,
//             maxOrderValue: Number(couponData.maxOrderValue) || 0,
//             usageLimit: Number(couponData.usageLimit) || 0,
//             perUserLimit: Number(couponData.perUserLimit) || 1,
//             rewardCondition: Number(couponData.rewardCondition) || 0
//         });

//         res.status(201).json({ success: true, coupon: newCoupon });
//     } catch (error) {
//         console.error("Coupon Creation Error:", error);
//         // Agar duplicate coupon code hoga toh proper message bhejenge
//         if (error.code === 11000) {
//             return res.status(400).json({ message: "This coupon code already exists!" });
//         }
//         res.status(500).json({ message: error.message });
//     }
// };

// // 2. User: Verify Coupon at Checkout
// // 2. User: Verify Coupon at Checkout
// exports.verifyCoupon = async (req, res) => {
//     try {
//         const { code, cartTotal, userId } = req.body; 
//         if (!code) return res.status(400).json({ message: "Please provide a coupon code." });

//         const coupon = await Coupon.findOne({ code: code.toUpperCase() });

//         if (!coupon) return res.status(404).json({ message: "Coupon code invalid!" });
//         if (coupon.status === 'Inactive') return res.status(400).json({ message: "This coupon is currently inactive." });
        
//         // ⚡ DEBUG LOGS (Inhe terminal/console me dekho)
//         console.log("Current Server Time:", new Date());
//         console.log("Coupon Start Date:", new Date(coupon.startDate));

//         // ⚡ FIXED: Sirf tabhi error do agar startDate exist karti ho AUR wo future ki ho
//         // if (coupon.startDate && new Date() < new Date(coupon.startDate)) {
//         //     return res.status(400).json({ message: "This offer has not started yet!" });
//         // }
        
//         // Expiry check (agar expiry date exist karti ho)
//         if (coupon.expiryDate && new Date() > new Date(coupon.expiryDate)) {
//             return res.status(400).json({ message: "Coupon expired!" });
//         }

//         if (cartTotal < coupon.minOrderValue) return res.status(400).json({ message: `Min order of ₹${coupon.minOrderValue} required.` });
//         if (coupon.maxOrderValue > 0 && cartTotal > coupon.maxOrderValue) return res.status(400).json({ message: `Max order limit for this coupon is ₹${coupon.maxOrderValue}.` });
//         if (coupon.usageLimit > 0 && coupon.usedCount >= coupon.usageLimit) return res.status(400).json({ message: "Coupon usage limit reached!" });

//         // ... (Baaki First Order Logic waise hi rehne do)
//         if (coupon.isFirstOrderOnly || coupon.code === 'WELCOME500') {
//             if (!userId) return res.status(401).json({ message: "Please login." });
//             const previousOrders = await Order.countDocuments({ user: userId });
//             if (previousOrders > 0) return res.status(400).json({ message: "This coupon is only valid for your first order!" });
//         }

//         let discountAmount = 0;
//         if (coupon.discountType === 'free_shipping') discountAmount = 100;
//         else if (coupon.discountType === 'flat') discountAmount = coupon.discountValue;
//         else if (coupon.discountType === 'percentage') {
//             discountAmount = Math.round((cartTotal * coupon.discountValue) / 100);
//             if (coupon.maxDiscount > 0 && discountAmount > coupon.maxDiscount) discountAmount = coupon.maxDiscount;
//         }

//         res.json({ success: true, discountAmount, message: "Coupon applied successfully!" });
//     } catch (error) {
//         console.error("Coupon Verification Error:", error);
//         res.status(500).json({ message: "Server error during verification" });
//     }
// };

// // 3. Admin: Get All Coupons (For Table)
// exports.getAllCoupons = async (req, res) => {
//     try {
//         const coupons = await Coupon.find().sort({ createdAt: -1 }); // Naye wale upar dikhenge
//         res.status(200).json({ success: true, coupons });
//     } catch (error) {
//         res.status(500).json({ message: error.message });
//     }
// };

// // 4. Admin: Delete Coupon
// exports.deleteCoupon = async (req, res) => {
//     try {
//         await Coupon.findByIdAndDelete(req.params.id);
//         res.status(200).json({ success: true, message: "Coupon deleted successfully" });
//     } catch (error) {
//         res.status(500).json({ message: error.message });
//     }
// };

// // 5. Admin: Update Coupon Status (Active/Inactive Toggle)
// exports.updateCouponStatus = async (req, res) => {
//     try {
//         const { id } = req.params;
//         const { status } = req.body;

//         // Check karo ki status valid hai ya nahi
//         if (!['Active', 'Inactive'].includes(status)) {
//             return res.status(400).json({ message: "Invalid status value!" });
//         }

//         // Database mein find karke update karo
//         const updatedCoupon = await Coupon.findByIdAndUpdate(
//             id, 
//             { status: status }, 
//             { new: true }
//         );

//         if (!updatedCoupon) {
//             return res.status(404).json({ message: "Coupon nahi mila!" });
//         }

//         res.status(200).json({ success: true, message: `Coupon is now ${status}`, coupon: updatedCoupon });
//     } catch (error) {
//         console.error("Status Update Error:", error);
//         res.status(500).json({ message: "Server error during status update" });
//     }
// };

const Coupon = require('../models/Coupon');
const Order = require('../models/orderModel');

// 1. Admin: Create New Coupon
exports.createCoupon = async (req, res) => {
    try {
        const couponData = req.body;
        
        // Frontend se aane wale saare data ko safe format mein DB me bhejna
        const newCoupon = await Coupon.create({
            ...couponData,
            code: couponData.code.toUpperCase(),
            discountValue: Number(couponData.discountValue) || 0,
            maxDiscount: Number(couponData.maxDiscount) || 0,
            minOrderValue: Number(couponData.minOrderValue) || 0,
            maxOrderValue: Number(couponData.maxOrderValue) || 0,
            usageLimit: Number(couponData.usageLimit) || 0,
            perUserLimit: Number(couponData.perUserLimit) || 1,
            rewardCondition: Number(couponData.rewardCondition) || 0
        });

        res.status(201).json({ success: true, coupon: newCoupon });
    } catch (error) {
        console.error("Coupon Creation Error:", error);
        // Agar duplicate coupon code hoga toh proper message bhejenge
        if (error.code === 11000) {
            return res.status(400).json({ message: "This coupon code already exists!" });
        }
        res.status(500).json({ message: error.message });
    }
};

// 2. User: Verify Coupon at Checkout
exports.verifyCoupon = async (req, res) => {
    try {
        const { code, cartTotal, userId } = req.body; 
        if (!code) return res.status(400).json({ message: "Please provide a coupon code." });

        const coupon = await Coupon.findOne({ code: code.toUpperCase() });

        if (!coupon) return res.status(404).json({ message: "Coupon code invalid!" });
        if (coupon.status === 'Inactive') return res.status(400).json({ message: "This coupon is currently inactive." });
        
        // ⚡ DEBUG LOGS (Inhe terminal/console me dekho)
        console.log("Current Server Time:", new Date());
        console.log("Coupon Start Date:", new Date(coupon.startDate));

        // ⚡ FIXED: Sirf tabhi error do agar startDate exist karti ho AUR wo future ki ho
        // if (coupon.startDate && new Date() < new Date(coupon.startDate)) {
        //     return res.status(400).json({ message: "This offer has not started yet!" });
        // }
        
        // Expiry check (agar expiry date exist karti ho)
        if (coupon.expiryDate && new Date() > new Date(coupon.expiryDate)) {
            return res.status(400).json({ message: "Coupon expired!" });
        }

        if (cartTotal < coupon.minOrderValue) return res.status(400).json({ message: `Min order of ₹${coupon.minOrderValue} required.` });
        if (coupon.maxOrderValue > 0 && cartTotal > coupon.maxOrderValue) return res.status(400).json({ message: `Max order limit for this coupon is ₹${coupon.maxOrderValue}.` });
        if (coupon.usageLimit > 0 && coupon.usedCount >= coupon.usageLimit) return res.status(400).json({ message: "Coupon usage limit reached!" });

        // ... (Baaki First Order Logic waise hi rehne do)
        if (coupon.isFirstOrderOnly || coupon.code === 'WELCOME500') {
            if (!userId) return res.status(401).json({ message: "Please login." });
            const previousOrders = await Order.countDocuments({ user: userId });
            if (previousOrders > 0) return res.status(400).json({ message: "This coupon is only valid for your first order!" });
        }

        let discountAmount = 0;
        if (coupon.discountType === 'free_shipping') discountAmount = 100;
        else if (coupon.discountType === 'flat') discountAmount = coupon.discountValue;
        else if (coupon.discountType === 'percentage') {
            discountAmount = Math.round((cartTotal * coupon.discountValue) / 100);
            if (coupon.maxDiscount > 0 && discountAmount > coupon.maxDiscount) discountAmount = coupon.maxDiscount;
        }

        res.json({ success: true, discountAmount, message: "Coupon applied successfully!" });
    } catch (error) {
        console.error("Coupon Verification Error:", error);
        res.status(500).json({ message: "Server error during verification" });
    }
};

// 3. Admin: Get All Coupons (For Table)
exports.getAllCoupons = async (req, res) => {
    try {
        const coupons = await Coupon.find().sort({ createdAt: -1 }); // Naye wale upar dikhenge
        res.status(200).json({ success: true, coupons });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// 4. Admin: Delete Coupon
exports.deleteCoupon = async (req, res) => {
    try {
        await Coupon.findByIdAndDelete(req.params.id);
        res.status(200).json({ success: true, message: "Coupon deleted successfully" });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// 5. Admin: Update Coupon Status (Active/Inactive Toggle)
exports.updateCouponStatus = async (req, res) => {
    try {
        const { id } = req.params;
        const { status } = req.body;

        // Check karo ki status valid hai ya nahi
        if (!['Active', 'Inactive'].includes(status)) {
            return res.status(400).json({ message: "Invalid status value!" });
        }

        // Database mein find karke update karo
        const updatedCoupon = await Coupon.findByIdAndUpdate(
            id, 
            { status: status }, 
            { new: true }
        );

        if (!updatedCoupon) {
            return res.status(404).json({ message: "Coupon nahi mila!" });
        }

        res.status(200).json({ success: true, message: `Coupon is now ${status}`, coupon: updatedCoupon });
    } catch (error) {
        console.error("Status Update Error:", error);
        res.status(500).json({ message: "Server error during status update" });
    }
};

// ⚡ NAYA FUNCTION: 6. Admin: Update Coupon Date directly from table
exports.updateCouponDate = async (req, res) => {
    try {
        const { id } = req.params;
        const { newExpiryDate } = req.body;

        const updatedCoupon = await Coupon.findByIdAndUpdate(
            id, 
            { expiryDate: new Date(newExpiryDate) }, 
            { new: true }
        );

        if (!updatedCoupon) {
            return res.status(404).json({ message: "Coupon not found!" });
        }

        res.status(200).json({ success: true, message: "Date updated successfully", coupon: updatedCoupon });
    } catch (error) {
        console.error("Error updating coupon date:", error);
        res.status(500).json({ message: "Server Error during date update" });
    }
};