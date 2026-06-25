const mongoose = require('mongoose');

const legalSchema = new mongoose.Schema({
    pageType: { type: String, required: true, unique: true }, // 'privacy', 'terms', 'refund', 'shipping'
    heroTitle: { type: String, required: true },
    lastUpdated: { type: String, default: "June 2026" },
    sections: [
        {
            title: { type: String, required: true },
            text: { type: String, required: true }
        }
    ]
}, { timestamps: true });

module.exports = mongoose.model('Legal', legalSchema);