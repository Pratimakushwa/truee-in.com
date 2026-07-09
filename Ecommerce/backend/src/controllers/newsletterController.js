// backend/controllers/newsletterController.js

const Subscriber = require('../models/subscriberModel');
const sendEmail = require('../utils/sendEmail'); 

// 1. User jab website se subscribe karega
exports.subscribeNewsletter = async (req, res) => {
    try {
        const { email } = req.body;

        if (!email) {
            return res.status(400).json({ success: false, message: "Please enter an email address." });
        }

        // Check if already subscribed
        const existingSubscriber = await Subscriber.findOne({ email });
        if (existingSubscriber) {
            return res.status(400).json({ 
                success: false, 
                message: "You are already a part of The Inner Circle!" 
            });
        }

        // Save to Database
        await Subscriber.create({ email });

        // Send Welcome Email
        try {
            const message = `Welcome to TRUEE Luxury!\n\nThank you for subscribing to The Inner Circle. You will now get early access to our limited releases and curated tech stories.\n\nEnjoy your premium journey!`;
            
            await sendEmail({
                email: email,
                subject: 'Welcome to TRUEE Inner Circle!',
                message: message
            });
        } catch (emailError) {
            console.log("Welcome Mail error:", emailError);
        }

        res.status(200).json({ success: true, message: "Subscribed successfully!" });

    } catch (error) {
        console.error("Subscription Error:", error);
        res.status(500).json({ success: false, message: "Server Error" });
    }
};

// 2. Admin jab dashboard se list dekhega
exports.getAllSubscribers = async (req, res) => {
    try {
        const subscribers = await Subscriber.find().sort({ subscribedAt: -1 }); 
        res.status(200).json({ success: true, subscribers });
    } catch (error) {
        console.error("Fetch Error:", error);
        res.status(500).json({ success: false, message: "Server Error" });
    }
};