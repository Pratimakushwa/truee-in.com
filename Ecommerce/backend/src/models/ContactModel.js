const mongoose = require('mongoose');

const contactSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true },
    subject: { type: String, required: true },
    message: { type: String, required: true }
}, { timestamps: true });

// ⚡ Bas is aakhri line mein badlaav kiya hai
module.exports = mongoose.model('Contact', contactSchema, 'contact');