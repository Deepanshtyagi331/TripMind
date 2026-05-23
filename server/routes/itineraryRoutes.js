const express = require('express');
const { generate, list, getById, deleteItinerary } = require('../controllers/itineraryController');
const { protect } = require('../middleware/protect');

const router = express.Router();

router.post('/generate', protect, generate);
router.get('/', protect, list);
router.get('/:id', protect, getById);
router.delete('/:id', protect, deleteItinerary);

module.exports = router;
