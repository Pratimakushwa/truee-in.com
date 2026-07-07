// const transporter = require('../config/mailConfig');
// const { baseLayout, ctaButton, FRONTEND_URL } = require('../templates/email/baseLayout');

// const getSender = (type = 'orders') => {
//   const map = {
//     orders: process.env.EMAIL_ORDERS_FROM || process.env.SMTP_FROM_EMAIL,
//     support: process.env.EMAIL_SUPPORT_FROM || process.env.SMTP_FROM_EMAIL,
//     help: process.env.EMAIL_HELP_FROM || process.env.SMTP_FROM_EMAIL,
//     admin: process.env.EMAIL_ADMIN_TO || process.env.SMTP_FROM_EMAIL,
//   };
//   return map[type] || process.env.SMTP_FROM_EMAIL;
// };

// const sendMail = async ({ to, subject, html, fromType = 'orders', replyTo }) => {
//   if (!process.env.SMTP_FROM_EMAIL || !process.env.SMTP_PASS || !to) return null;
//   try {
//     return await transporter.sendMail({
//       from: `"TRUEE" <${getSender(fromType)}>`,
//       to,
//       replyTo: replyTo || getSender('support'),
//       subject,
//       html,
//     });
//   } catch (err) {
//     console.error('Email send failed:', err.message);
//     return null;
//   }
// };

// const orderItemsTable = (order) => {
//   const rows = (order.orderItems || [])
//     .map(
//       (item) => `
//       <tr>
//         <td style="padding:8px;border-bottom:1px solid #eee;">${item.name}</td>
//         <td style="padding:8px;border-bottom:1px solid #eee;text-align:center;">${item.quantity}</td>
//         <td style="padding:8px;border-bottom:1px solid #eee;text-align:right;">₹${(item.price * item.quantity).toLocaleString('en-IN')}</td>
//       </tr>`,
//     )
//     .join('');
//   return `
//     <table width="100%" cellpadding="0" cellspacing="0" style="margin:16px 0;font-size:14px;">
//       <tr style="background:#f9f9f9;">
//         <th style="padding:8px;text-align:left;">Product</th>
//         <th style="padding:8px;">Qty</th>
//         <th style="padding:8px;text-align:right;">Amount</th>
//       </tr>
//       ${rows}
//       <tr>
//         <td colspan="2" style="padding:12px 8px;font-weight:bold;text-align:right;">Total</td>
//         <td style="padding:12px 8px;font-weight:bold;text-align:right;">₹${(order.payableAmount || order.totalAmount || 0).toLocaleString('en-IN')}</td>
//       </tr>
//     </table>`;
// };

// const sendOrderStatusEmail = async (order, user, statusLabel) => {
//   if (!user?.email) return null;
//   const orderId = order._id.toString().slice(-8).toUpperCase();
//   const body = `
//     <p>Dear <strong>${user.name || 'Customer'}</strong>,</p>
//     <p>Your order <strong>#${orderId}</strong> status has been updated to:</p>
//     <p style="font-size:20px;font-weight:bold;color:#C8A253;margin:16px 0;">${statusLabel}</p>
//     ${orderItemsTable(order)}
//     ${ctaButton('Track Your Order', `${FRONTEND_URL}/profile/order/${order._id}`)}
//     <p style="color:#666;font-size:13px;">Questions? Contact us at ${getSender('support')}</p>`;

//   return sendMail({
//     to: user.email,
//     subject: `TRUEE Order #${orderId} — ${statusLabel}`,
//     html: baseLayout({ title: `Order ${statusLabel}`, bodyContent: body }),
//     fromType: 'orders',
//   });
// };

// const sendOrderPlacedEmail = async (order, user) => {
//   if (!user?.email) return null;
//   const orderId = order._id.toString().slice(-8).toUpperCase();
//   const body = `
//     <p>Dear <strong>${user.name || 'Customer'}</strong>,</p>
//     <p>Thank you for shopping with TRUEE! Your order has been placed successfully.</p>
//     <p><strong>Order ID:</strong> #${orderId}</p>
//     <p><strong>Payment:</strong> ${order.paymentInfo?.paymentStatus || 'Pending'}</p>
//     ${orderItemsTable(order)}
//     ${ctaButton('View Order', `${FRONTEND_URL}/profile/order/${order._id}`)}
//     <p style="color:#666;font-size:13px;">GST invoice available upon delivery.</p>`;

//   await sendMail({
//     to: user.email,
//     subject: `TRUEE — Order Confirmed #${orderId}`,
//     html: baseLayout({ title: 'Order Confirmed', preheader: `Order #${orderId} confirmed`, bodyContent: body }),
//     fromType: 'orders',
//   });

//   // Notify admin
//   const adminTo = process.env.EMAIL_ADMIN_TO;
//   if (adminTo) {
//     await sendMail({
//       to: adminTo,
//       subject: `New Order #${orderId} — ₹${order.totalAmount}`,
//       html: baseLayout({
//         title: 'New Order',
//         bodyContent: `<p>New order received from ${user.name} (${user.email})</p>${orderItemsTable(order)}`,
//       }),
//       fromType: 'admin',
//     });
//   }
// };

// module.exports = {
//   sendMail,
//   sendOrderStatusEmail,
//   sendOrderPlacedEmail,
//   getSender,
// };


const transporter = require('../config/mailConfig');
const { baseLayout, ctaButton, FRONTEND_URL } = require('../templates/email/baseLayout');

const getSender = (type = 'orders') => {
  const map = {
    orders: process.env.EMAIL_ORDERS_FROM || process.env.SMTP_FROM_EMAIL,
    support: process.env.EMAIL_SUPPORT_FROM || process.env.SMTP_FROM_EMAIL,
    help: process.env.EMAIL_HELP_FROM || process.env.SMTP_FROM_EMAIL,
    admin: process.env.EMAIL_ADMIN_TO || process.env.SMTP_FROM_EMAIL,
  };
  return map[type] || process.env.SMTP_FROM_EMAIL;
};

const sendMail = async ({ to, subject, html, fromType = 'orders', replyTo }) => {
  if (!process.env.SMTP_FROM_EMAIL || !process.env.SMTP_PASS || !to) return null;
  try {
    return await transporter.sendMail({
      // ⚡ YAHI MAIN FIX HAI: from address hamesha login wala hona chahiye
      from: `"TRUEE" <${process.env.SMTP_FROM_EMAIL}>`,
      to,
      replyTo: replyTo || getSender('support'),
      subject,
      html,
    });
  } catch (err) {
    console.error('Email send failed:', err.message);
    return null;
  }
};

const orderItemsTable = (order) => {
  const rows = (order.orderItems || [])
    .map(
      (item) => `
      <tr>
        <td style="padding:8px;border-bottom:1px solid #eee;">${item.name}</td>
        <td style="padding:8px;border-bottom:1px solid #eee;text-align:center;">${item.quantity}</td>
        <td style="padding:8px;border-bottom:1px solid #eee;text-align:right;">₹${(item.price * item.quantity).toLocaleString('en-IN')}</td>
      </tr>`,
    )
    .join('');
  return `
    <table width="100%" cellpadding="0" cellspacing="0" style="margin:16px 0;font-size:14px;">
      <tr style="background:#f9f9f9;">
        <th style="padding:8px;text-align:left;">Product</th>
        <th style="padding:8px;">Qty</th>
        <th style="padding:8px;text-align:right;">Amount</th>
      </tr>
      ${rows}
      <tr>
        <td colspan="2" style="padding:12px 8px;font-weight:bold;text-align:right;">Total</td>
        <td style="padding:12px 8px;font-weight:bold;text-align:right;">₹${(order.payableAmount || order.totalAmount || 0).toLocaleString('en-IN')}</td>
      </tr>
    </table>`;
};

const sendOrderStatusEmail = async (order, user, statusLabel) => {
  if (!user?.email) return null;
  const orderId = order._id.toString().slice(-8).toUpperCase();
  const body = `
    <p>Dear <strong>${user.name || 'Customer'}</strong>,</p>
    <p>Your order <strong>#${orderId}</strong> status has been updated to:</p>
    <p style="font-size:20px;font-weight:bold;color:#C8A253;margin:16px 0;">${statusLabel}</p>
    ${orderItemsTable(order)}
    ${ctaButton('Track Your Order', `${FRONTEND_URL}/profile/order/${order._id}`)}
    <p style="color:#666;font-size:13px;">Questions? Contact us at ${getSender('support')}</p>`;

  return sendMail({
    to: user.email,
    subject: `TRUEE Order #${orderId} — ${statusLabel}`,
    html: baseLayout({ title: `Order ${statusLabel}`, bodyContent: body }),
    fromType: 'orders',
  });
};

const sendOrderPlacedEmail = async (order, user) => {
  if (!user?.email) return null;
  const orderId = order._id.toString().slice(-8).toUpperCase();
  const body = `
    <p>Dear <strong>${user.name || 'Customer'}</strong>,</p>
    <p>Thank you for shopping with TRUEE! Your order has been placed successfully.</p>
    <p><strong>Order ID:</strong> #${orderId}</p>
    <p><strong>Payment:</strong> ${order.paymentInfo?.paymentStatus || 'Pending'}</p>
    ${orderItemsTable(order)}
    ${ctaButton('View Order', `${FRONTEND_URL}/profile/order/${order._id}`)}
    <p style="color:#666;font-size:13px;">GST invoice available upon delivery.</p>`;

  await sendMail({
    to: user.email,
    subject: `TRUEE — Order Confirmed #${orderId}`,
    html: baseLayout({ title: 'Order Confirmed', preheader: `Order #${orderId} confirmed`, bodyContent: body }),
    fromType: 'orders',
  });

  // Notify admin
  const adminTo = process.env.EMAIL_ADMIN_TO;
  if (adminTo) {
    await sendMail({
      to: adminTo,
      subject: `New Order #${orderId} — ₹${order.totalAmount}`,
      html: baseLayout({
        title: 'New Order',
        bodyContent: `<p>New order received from ${user.name} (${user.email})</p>${orderItemsTable(order)}`,
      }),
      fromType: 'admin',
    });
  }
};

module.exports = {
  sendMail,
  sendOrderStatusEmail,
  sendOrderPlacedEmail,
  getSender,
};