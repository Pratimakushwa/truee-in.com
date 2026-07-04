const router = require('express').Router();
const { getPublicSettings, estimateEarn } = require('../controllers/rewardController');

router.get('/settings', getPublicSettings);
router.get('/estimate', estimateEarn);

module.exports = router;
