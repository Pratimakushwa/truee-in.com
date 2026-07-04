const wrapAsync = require('../utils/wrapAsync');
const { getUserNotifications, markNotificationRead } = require('../services/notificationService');

module.exports.getNotifications = wrapAsync(async (req, res) => {
  const result = await getUserNotifications(req.user._id, req.query);
  res.json({ success: true, ...result });
});

module.exports.markRead = wrapAsync(async (req, res) => {
  const notification = await markNotificationRead(req.user._id, req.params.id);
  res.json({ success: true, notification });
});

module.exports.markAllRead = wrapAsync(async (req, res) => {
  const Notification = require('../models/Notification');
  await Notification.updateMany({ user: req.user._id, read: false }, { read: true });
  res.json({ success: true, message: 'All notifications marked as read.' });
});
