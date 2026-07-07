// const nodemailer = require("nodemailer");

// const transporter = nodemailer.createTransport({
//   service: "gmail",
//   auth: {
//     user: process.env.SMTP_USER,
//     pass: process.env.SMTP_PASS
//   }
// });

// module.exports = transporter;
const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,   // Hostinger ka address (smtp.hostinger.com)
  port: process.env.SMTP_PORT,   // 465
  secure: true,                  // 465 port ke liye true zaroori hai
  auth: {
    user: process.env.SMTP_USER, // no-reply@opserv.in
    pass: process.env.SMTP_PASS  // "Op#Serv#25#Si"
  }
});

module.exports = transporter;