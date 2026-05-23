const express = require('express');
const { toggleShare, getByShareToken } = require('../controllers/shareController');
const { protect } = require('../middleware/protect');

const router = express.Router();

// Private share toggle
router.post('/itineraries/:id/share', protect, toggleShare);

// Public itinerary lookup by share token (no auth required)
router.get('/share/:shareToken', getByShareToken);

module.exports = router;
