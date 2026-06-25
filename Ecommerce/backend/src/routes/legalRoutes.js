const express = require('express');
const { getLegalContent, updateLegalContent } = require('../controllers/legalController');
const router = express.Router();

// Route: http://localhost:8080/api/v1/legal/get-policy/:type
router.get('/get-policy/:type', getLegalContent);

// Route: http://localhost:8080/api/v1/legal/update-policy (For Admin)
router.post('/update-policy', updateLegalContent);

module.exports = router;