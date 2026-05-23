const Document = require('../models/Document');
const { uploadToStorage } = require('../services/storageService');
const { extractText } = require('../services/extractionService');

// @desc    Upload documents & extract text
// @route   POST /api/documents/upload
// @access  Private
const uploadDocuments = async (req, res, next) => {
  try {
    if (!req.files || req.files.length === 0) {
      return res.status(400).json({
        success: false,
        message: 'Please upload at least one file',
      });
    }

    if (req.files.length > 5) {
      return res.status(400).json({
        success: false,
        message: 'You can upload up to 5 files at a time',
      });
    }

    // Process files in parallel
    const documentPromises = req.files.map(async (file) => {
      // Determine file type
      const fileType = file.mimetype === 'application/pdf' ? 'pdf' : 'image';

      // 1. Upload to cloud storage (Cloudinary or S3)
      const storageResult = await uploadToStorage(file.buffer, file.originalname, file.mimetype);

      // 2. Extract text from file
      const extractedText = await extractText(file.buffer, fileType);

      // 3. Create Document record in DB
      const document = await Document.create({
        userId: req.user._id,
        fileName: file.originalname,
        fileType,
        fileUrl: storageResult.url,
        extractedText,
      });

      return document;
    });

    const savedDocuments = await Promise.all(documentPromises);
    const documentIds = savedDocuments.map((doc) => doc._id);

    res.status(201).json({
      success: true,
      documentIds,
      documents: savedDocuments.map((doc) => ({
        id: doc._id,
        fileName: doc.fileName,
        fileType: doc.fileType,
        fileUrl: doc.fileUrl,
        uploadedAt: doc.uploadedAt,
      })),
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  uploadDocuments,
};
