const Notification = require('../models/Notification');
const transporter = require('../config/mailConfig');
const User = require('../models/userModel');

const createInAppNotification = async (userId, type, { title, message, orderId, coins, transactionId }) => {
  return Notification.create({
    user: userId,
    type,
    title,
    message,
    metadata: { orderId, coins, transactionId },
  });
};

const sendCoinEmail = async (user, subject, htmlBody) => {
  if (!user?.email || !process.env.SMTP_FROM_EMAIL) return;
  try {
    await transporter.sendMail({
from: `"Truee Rewards" <${process.env.SMTP_FROM_EMAIL}>`,
      to: user.email,
      subject,
      html: htmlBody,
    });
  } catch (err) {
    console.error('Coin email failed:', err.message);
  }
};

const sendAdminEmail = async (subject, htmlBody) => {
  const adminEmail = process.env.ADMIN_EMAIL;
  if (!adminEmail || !process.env.SMTP_FROM_EMAIL) return;
  try {
    await transporter.sendMail({
      from: `"Truee Rewards" <${process.env.SMTP_FROM_EMAIL}>`,
      to: adminEmail,
      subject,
      html: htmlBody,
    });
  } catch (err) {
    console.error('Admin email failed:', err.message);
  }
};

const FRONTEND_URL = process.env.VITE_FRONTEND_URL || 'https://truee.in';
const LOGO_URL = process.env.EMAIL_LOGO_URL || `${FRONTEND_URL}/Truee_Luxury_Logo.png`;

const emailTemplate = (name, heading, body) => `
  <div style="font-family:Arial,sans-serif;background:#f4f6f9;padding:30px 0;">
    <table width="600" cellpadding="0" cellspacing="0" style="margin:auto;background:#fff;border-radius:8px;overflow:hidden;">
      <tr><td style="background:#0A0A0A;padding:24px;text-align:center;border-bottom:4px solid #C8A253;">
        <a href="${FRONTEND_URL}" style="text-decoration:none;">
          <img src="${LOGO_URL}" alt="TRUEE" width="120" style="display:block;margin:0 auto;max-width:120px;height:auto;border:0;" />
        </a>
        <p style="margin:10px 0 0;color:#9ca3af;font-size:11px;letter-spacing:0.2em;text-transform:uppercase;">Truee Rewards</p>
      </td></tr>
      <tr><td style="padding:30px;color:#333;">
        <p>Dear <strong>${name}</strong>,</p>
        <h3 style="color:#0A0A0A;">${heading}</h3>
        <p style="line-height:1.6;">${body}</p>
        <p style="margin-top:24px;">Visit your <a href="${process.env.VITE_FRONTEND_URL}/profile" style="color:#C8A253;">Reward Wallet</a> to view details.</p>
      </td></tr>
      <tr><td style="background:#1A1A1A;padding:16px;text-align:center;font-size:12px;color:#C8A253;">
        © ${new Date().getFullYear()} Truee Luxury
      </td></tr>
    </table>
  </div>`;

const sendCoinNotification = async (userId, type, { coins, orderId, message }) => {
  const user = await User.findById(userId).select('name email');
  if (!user) return;

  const titles = {
    COIN_CREDIT: 'Reward Coins Credited! 🎉',
    COIN_REDEEM: 'Coins Redeemed on Order',
    COIN_DEBIT: 'Wallet Update',
    ADMIN_ADJUST: 'Wallet Adjustment',
  };

  const title = titles[type] || 'Wallet Update';
  await createInAppNotification(userId, type, {
    title,
    message,
    orderId,
    coins,
  });

  const userHtml = emailTemplate(user.name, title, message);
  await sendCoinEmail(user, title, userHtml);

  // Send a copy to the admin so it appears in the admin mailbox with the same UI
  const adminBody = `
    <p><strong>User:</strong> ${user.name} &lt;${user.email}&gt;</p>
    <p><strong>Type:</strong> ${type}</p>
    <p><strong>Message:</strong></p>
    <p>${message}</p>
    <p><strong>Order ID:</strong> ${orderId || 'N/A'}</p>
    <p><strong>Coins:</strong> ${coins || 0}</p>
  `;
  const adminHtml = emailTemplate(user.name, `${title} — User Notification`, adminBody);
  await sendAdminEmail(title, adminHtml);
};

const getUserNotifications = async (userId, { page = 1, limit = 20 } = {}) => {
  const skip = (page - 1) * limit;
  const [notifications, total, unreadCount] = await Promise.all([
    Notification.find({ user: userId }).sort({ createdAt: -1 }).skip(skip).limit(limit).lean(),
    Notification.countDocuments({ user: userId }),
    Notification.countDocuments({ user: userId, read: false }),
  ]);
  return { notifications, total, unreadCount, page, pages: Math.ceil(total / limit) };
};

const markNotificationRead = async (userId, notificationId) => {
  return Notification.findOneAndUpdate(
    { _id: notificationId, user: userId },
    { read: true },
    { new: true },
  );
};

module.exports = {
  sendCoinNotification,
  getUserNotifications,
  markNotificationRead,
  createInAppNotification,
  sendAdminEmail,
};
