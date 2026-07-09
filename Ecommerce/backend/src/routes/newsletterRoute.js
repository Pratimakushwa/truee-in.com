// backend/routes/newsletterRoute.js

const express = require('express');
const router = express.Router();
const { subscribeNewsletter, getAllSubscribers } = require('../controllers/newsletterController');

router.post('/subscribe', subscribeNewsletter);
router.get('/all', getAllSubscribers);

module.exports = router;