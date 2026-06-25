const express = require('express');
const { submitContactForm } = require('../controllers/contactController');
const router = express.Router();

// Route: http://localhost:8080/api/v1/contact/submit
router.post('/submit', submitContactForm);

module.exports = router;