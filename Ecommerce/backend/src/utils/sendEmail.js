// const nodemailer = require('nodemailer');

// const sendEmail = async (options) => {
//   // 1. Transporter create karna (Ye batata hai ki kaunsi service use karni hai)
//   const transporter = nodemailer.createTransport({
//     service: 'gmail',
//     auth: {
//       user: process.env.EMAIL_USER,
//       pass: process.env.EMAIL_PASS,
//     },
//   });

//   // 2. Email ke options define karna (Kisko bhejna hai, kya bhejna hai)
//   const mailOptions = {
//     from: `Truee Luxury <${process.env.EMAIL_USER}>`,
//     to: options.email,
//     subject: options.subject,
//     text: options.message,
//   };

//   // 3. Email send karna
//   await transporter.sendMail(mailOptions);
// };

// module.exports = sendEmail;

const nodemailer = require('nodemailer');

const sendEmail = async (options) => {
  // 1. Transporter create karna (Ab ye Gmail ki jagah Hostinger SMTP use karega)
  const transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: process.env.SMTP_PORT,
    secure: true, // 465 port ke liye hamesha true rakhte hain
    auth: {
      user: process.env.SMTP_FROM_EMAIL,
      pass: process.env.SMTP_PASS,
    },
  });

  // 2. Email ke options define karna (Kisko bhejna hai, kya bhejna hai)
  const mailOptions = {
    // ⚡ Yahan se automatically 'TRUEE' likha aayega sender ke naam par
    from: `"${process.env.SMTP_FROM_NAME}" <${process.env.SMTP_FROM_EMAIL}>`,
    to: options.email,
    subject: options.subject,
    text: options.message,
  };

  // Agar tumhare code mein kahin HTML format mein email bheja ja raha hai (jaise OTP design)
  if (options.html) {
    mailOptions.html = options.html;
  }

  // 3. Email send karna
  try {
    await transporter.sendMail(mailOptions);
    console.log(`Email successfully sent to ${options.email}`);
  } catch (error) {
    console.error("Email bhejne mein error aayi:", error);
    throw new Error("Email sending failed");
  }
};

module.exports = sendEmail;