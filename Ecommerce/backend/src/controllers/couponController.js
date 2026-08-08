const Coupon = require('../models/Coupon');
const Order = require('../models/orderModel');

// 1. Admin: Create New Coupon
exports.createCoupon = async (req, res) => {
    try {
        const couponData = req.body;
        
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

        const formattedCode = code.trim().toUpperCase();

        // Direct Database Check
        const coupon = await Coupon.findOne({ code: formattedCode });

        if (!coupon) return res.status(404).json({ message: "Coupon code invalid!" });
        if (coupon.status === 'Inactive') return res.status(400).json({ message: "This coupon is currently inactive." });
        
        console.log("Current Server Time:", new Date());
        console.log("Coupon Start Date:", new Date(coupon.startDate));
        
        if (coupon.expiryDate && new Date() > new Date(coupon.expiryDate)) {
            return res.status(400).json({ message: "Coupon expired!" });
        }

        if (cartTotal < coupon.minOrderValue) return res.status(400).json({ message: `Min order of ₹${coupon.minOrderValue} required.` });
        if (coupon.maxOrderValue > 0 && cartTotal > coupon.maxOrderValue) return res.status(400).json({ message: `Max order limit for this coupon is ₹${coupon.maxOrderValue}.` });
        if (coupon.usageLimit > 0 && coupon.usedCount >= coupon.usageLimit) return res.status(400).json({ message: "Coupon usage limit reached!" });

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
        const coupons = await Coupon.find().sort({ createdAt: -1 });
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

        if (!['Active', 'Inactive'].includes(status)) {
            return res.status(400).json({ message: "Invalid status value!" });
        }

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

// 6. Admin: Update Coupon Date directly from table
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