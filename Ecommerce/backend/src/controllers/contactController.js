// const Contact = require('../models/ContactModel');
// // ⚡ FIX: sendEmail utility import ki
// const sendEmail = require('../utils/sendEmail'); 

// const submitContactForm = async (req, res) => {
//     try {
//         const { name, email, subject, message } = req.body;

//         // Basic Validation
//         if (!name || !email || !subject || !message) {
//             return res.status(400).json({ success: false, message: "All fields are required." });
//         }

//         // Save to Database
//         const newInquiry = new Contact({ name, email, subject, message });
//         await newInquiry.save();

//         // ==========================================
//         // ⚡ NAYA LOGIC: ADMIN KO EMAIL BHEJNA
//         // ==========================================
//         const adminMessage = `
// Hello Admin,

// You have received a new inquiry from the Truee Luxury website:

// 👤 Name: ${name}
// ✉️ Email: ${email}
// 📝 Subject: ${subject}

// 💬 Message:
// ${message}
//         `;

//         try {
//             await sendEmail({
//             //   email: "pratimaku6267@gmail.com", // Abhi tumhare email par aayega, baad mein Sir ke
//                 email: process.env.ADMIN_EMAIL,
//                 subject: `New Contact Inquiry: ${subject}`,
//                 message: adminMessage,
//             });
//         } catch (emailError) {
//             console.error("Admin Email Send Error:", emailError);
//             // Email fail hone par bhi hum aage badhenge taaki user ko success dikhe
//         }
//         // ==========================================

//         // Ye wahi tumhara purana response hai
//         res.status(201).json({
//             success: true,
//             message: "Your request has been submitted to our concierge team successfully!"
//         });
//     } catch (error) {
//         res.status(500).json({ success: false, message: "Server Error", error });
//     }
// };

// module.exports = { submitContactForm };
const Contact = require('../models/ContactModel');
const sendEmail = require('../utils/sendEmail'); 

// ⚡ YAHI HAI WAHI LUXURY UI TEMPLATE
const getLuxuryTemplate = (name, email, subject, message) => `
<div style="font-family:Arial,sans-serif;background:#f4f6f9;padding:30px 0;">
  <table width="600" cellpadding="0" cellspacing="0" style="margin:auto;background:#fff;border-radius:8px;overflow:hidden;border:1px solid #ddd;">
    <tr><td style="background:#0A0A0A;padding:24px;text-align:center;border-bottom:4px solid #C8A253;">
      <h2 style="color:#C8A253; margin:0; font-size: 20px; letter-spacing: 1px; text-transform: uppercase;">New Contact Inquiry</h2>
    </td></tr>
    <tr><td style="padding:30px;color:#333;">
      <p>Dear Admin,</p>
      <p>You have received a new message from the <strong>Truee Luxury</strong> website:</p>
      
      <table style="width:100%; border-collapse:collapse; margin-top:20px;">
        <tr><td style="padding:8px; border-bottom:1px solid #eee;"><b>Name:</b></td><td style="padding:8px;">${name}</td></tr>
        <tr><td style="padding:8px; border-bottom:1px solid #eee;"><b>Email:</b></td><td style="padding:8px;">${email}</td></tr>
        <tr><td style="padding:8px; border-bottom:1px solid #eee;"><b>Subject:</b></td><td style="padding:8px;">${subject}</td></tr>
      </table>

      <h3 style="margin-top:20px; color:#0A0A0A;">Message:</h3>
      <p style="line-height:1.6; background:#f9f9f9; padding:15px; border-left:4px solid #C8A253; color:#555;">${message}</p>
    </td></tr>
    <tr><td style="background:#1A1A1A;padding:16px;text-align:center;font-size:12px;color:#C8A253;">
      © ${new Date().getFullYear()} Truee Luxury
    </td></tr>
  </table>
</div>`;

const submitContactForm = async (req, res) => {
    try {
        const { name, email, subject, message } = req.body;

        if (!name || !email || !subject || !message) {
            return res.status(400).json({ success: false, message: "All fields are required." });
        }

        // Save to Database
        const newInquiry = new Contact({ name, email, subject, message });
        await newInquiry.save();

        // ⚡ EMAIL BHEJNA (Luxury Design Ke Saath)
        try {
            await sendEmail({
                email: process.env.ADMIN_EMAIL, // Admin ke paas jayega
                subject: `New Contact Inquiry: ${subject}`,
                message: `New inquiry from ${name}`, // Text backup
                html: getLuxuryTemplate(name, email, subject, message) // Design yahan se ja raha hai
            });
        } catch (emailError) {
            console.error("Admin Email Send Error:", emailError);
        }

        res.status(201).json({
            success: true,
            message: "Your request has been submitted to our concierge team successfully!"
        });
    } catch (error) {
        res.status(500).json({ success: false, message: "Server Error", error });
    }
};

module.exports = { submitContactForm };