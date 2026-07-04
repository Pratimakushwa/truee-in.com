const Contact = require('../models/ContactModel');
// ⚡ FIX: sendEmail utility import ki
const sendEmail = require('../utils/sendEmail'); 

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

        // ==========================================
        // ⚡ NAYA LOGIC: ADMIN KO EMAIL BHEJNA
        // ==========================================
        const adminMessage = `
Hello Admin,

You have received a new inquiry from the Truee Luxury website:

👤 Name: ${name}
✉️ Email: ${email}
📝 Subject: ${subject}

💬 Message:
${message}
        `;

        try {
            await sendEmail({
                email: process.env.EMAIL_USER, // Abhi tumhare email par aayega, baad mein Sir ke
                subject: `New Contact Inquiry: ${subject}`,
                message: adminMessage,
            });
        } catch (emailError) {
            console.error("Admin Email Send Error:", emailError);
            // Email fail hone par bhi hum aage badhenge taaki user ko success dikhe
        }
        // ==========================================

        // Ye wahi tumhara purana response hai
        res.status(201).json({
            success: true,
            message: "Your request has been submitted to our concierge team successfully!"
        });
    } catch (error) {
        res.status(500).json({ success: false, message: "Server Error", error });
    }
};

module.exports = { submitContactForm };