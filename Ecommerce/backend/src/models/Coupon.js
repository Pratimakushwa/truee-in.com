

const mongoose = require('mongoose');

const CouponSchema = new mongoose.Schema({
    // 1. Basic Info & Campaign Type
    campaignType: { type: String, default: 'Festival' },
    name: { type: String, required: true },
    code: { type: String, required: true, unique: true, uppercase: true },
    description: { type: String },

    // 2. Discount & Validity
    discountType: { type: String, enum: ['flat', 'percentage', 'free_shipping'], required: true },
    discountValue: { type: Number, default: 0 },
    maxDiscount: { type: Number, default: 0 }, // Percentage ke case me max limit
    startDate: { type: Date, required: true },
    expiryDate: { type: Date, required: true },
    status: { type: String, enum: ['Active', 'Inactive'], default: 'Active' }, // isActive ki jagah naya status

    // 3. Order Conditions
    minOrderValue: { type: Number, default: 0 },
    maxOrderValue: { type: Number, default: 0 },

    // 4. Targeting (User & Product Conditions)
    applicableFor: { type: String, enum: ['All Users', 'New Users', 'Existing Users', 'Premium Users'], default: 'All Users' },
    isFirstOrderOnly: { type: Boolean, default: false },
    applicableBrand: { type: String, default: 'All' },
    applicableCategory: { type: String, default: 'All' },

    // 5. Usage Limits
    usageLimit: { type: Number, default: 0 }, // 0 ka matlab unlimited
    perUserLimit: { type: Number, default: 1 },
    usedCount: { type: Number, default: 0 },

    // 6. Display & Premium Features
    showOn: [{ type: String }], // Array: jaise ['Home Banner', 'Checkout Page']
    isReward: { type: Boolean, default: false },
    rewardCondition: { type: Number, default: 0 },
    rewardCode: { type: String },
    autoApply: { type: Boolean, default: false }

}, { timestamps: true });

module.exports = mongoose.model('Coupon', CouponSchema);