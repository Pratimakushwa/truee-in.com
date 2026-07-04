const nodemailer = require('nodemailer');

const sendEmail = async (options) => {
  // 1. Transporter create karna (Ye batata hai ki kaunsi service use karni hai)
  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });

  // 2. Email ke options define karna (Kisko bhejna hai, kya bhejna hai)
  const mailOptions = {
    from: `Truee Luxury <${process.env.EMAIL_USER}>`,
    to: options.email,
    subject: options.subject,
    text: options.message,
  };

  // 3. Email send karna
  await transporter.sendMail(mailOptions);
};

module.exports = sendEmail;