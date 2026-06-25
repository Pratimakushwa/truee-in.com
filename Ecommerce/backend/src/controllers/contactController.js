const Contact = require('../models/ContactModel');

const submitContactForm = async (req, res) => {
    try {
        const { name, email, subject, message } = req.body;

        // Basic Validation
        if (!name || !email || !subject || !message) {
            return res.status(400).json({ success: false, message: "All fields are required." });
        }

        // Save to Database
        const newInquiry = new Contact({ name, email, subject, message });
        await newInquiry.save();

        res.status(201).json({
            success: true,
            message: "Your request has been submitted to our concierge team successfully!"
        });
    } catch (error) {
        res.status(500).json({ success: false, message: "Server Error", error });
    }
};

module.exports = { submitContactForm };