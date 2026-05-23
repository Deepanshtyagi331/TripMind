const express = require('express');
const { uploadDocuments } = require('../controllers/uploadController');
const { protect } = require('../middleware/protect');
const upload = require('../config/multer');

const router = express.Router();

// Upload multiple documents
router.post('/upload', protect, upload.array('files', 5), uploadDocuments);

module.exports = router;
