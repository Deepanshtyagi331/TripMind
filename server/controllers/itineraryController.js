const Itinerary = require('../models/Itinerary');
const Document = require('../models/Document');
const { generateItinerary } = require('../services/aiService');

// @desc    Generate a new itinerary from documents
// @route   POST /api/itineraries/generate
// @access  Private
const generate = async (req, res, next) => {
  const { documentIds } = req.body;

  try {
    if (!documentIds || !Array.isArray(documentIds) || documentIds.length === 0) {
      return res.status(400).json({
        success: false,
        message: 'Please provide at least one valid documentId',
      });
    }

    // 1. Fetch documents and verify ownership
    const documents = await Document.find({
      _id: { $in: documentIds },
      userId: req.user._id,
    });

    if (documents.length !== documentIds.length) {
      return res.status(403).json({
        success: false,
        message: 'Unauthorized access to one or more documents, or documents do not exist',
      });
    }

    // 2. Concatenate all extracted texts
    const concatenatedText = documents
      .map((doc) => `--- DOCUMENT: ${doc.fileName} ---\n${doc.extractedText}`)
      .join('\n\n');

    if (!concatenatedText.trim()) {
      return res.status(400).json({
        success: false,
        message: 'No readable text could be found in the uploaded files. Make sure they contain text or high-quality images.',
      });
    }

    // 3. Send text to OpenAI for structured travel info
    const aiResult = await generateItinerary(concatenatedText);

    // 4. Create and save Itinerary document
    const itineraryData = {
      userId: req.user._id,
      documentIds,
      title: aiResult.structured.title || `Trip to ${aiResult.structured.destination}`,
      destination: aiResult.structured.destination,
      travelDates: {
        from: aiResult.structured.travelDates?.from ? new Date(aiResult.structured.travelDates.from) : undefined,
        to: aiResult.structured.travelDates?.to ? new Date(aiResult.structured.travelDates.to) : undefined,
      },
      rawAIResponse: aiResult.raw,
      structured: {
        flights: aiResult.structured.flights || [],
        hotels: aiResult.structured.hotels || [],
        dayWisePlan: aiResult.structured.dayWisePlan || [],
        tips: aiResult.structured.tips || [],
        totalBudgetEstimate: aiResult.structured.totalBudgetEstimate || null,
      },
    };

    const itinerary = await Itinerary.create(itineraryData);

    res.status(201).json({
      success: true,
      itinerary,
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Get all itineraries for logged in user (paginated)
// @route   GET /api/itineraries
// @access  Private
const list = async (req, res, next) => {
  const page = parseInt(req.query.page, 10) || 1;
  const limit = parseInt(req.query.limit, 10) || 10;
  const startIndex = (page - 1) * limit;

  try {
    const total = await Itinerary.countDocuments({ userId: req.user._id });
    const itineraries = await Itinerary.find({ userId: req.user._id })
      .sort({ createdAt: -1 })
      .skip(startIndex)
      .limit(limit);

    const totalPages = Math.ceil(total / limit);

    res.status(200).json({
      success: true,
      count: itineraries.length,
      pagination: {
        page,
        limit,
        total,
        totalPages,
      },
      itineraries,
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Get single itinerary by ID
// @route   GET /api/itineraries/:id
// @access  Private
const getById = async (req, res, next) => {
  try {
    const itinerary = await Itinerary.findById(req.params.id)
      .populate('documentIds', 'fileName fileType fileUrl uploadedAt');

    if (!itinerary) {
      return res.status(404).json({
        success: false,
        message: 'Itinerary not found',
      });
    }

    // Verify ownership
    if (itinerary.userId.toString() !== req.user._id.toString()) {
      return res.status(403).json({
        success: false,
        message: 'Not authorized to access this itinerary',
      });
    }

    res.status(200).json({
      success: true,
      itinerary,
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Delete itinerary by ID
// @route   DELETE /api/itineraries/:id
// @access  Private
const deleteItinerary = async (req, res, next) => {
  try {
    const itinerary = await Itinerary.findById(req.params.id);

    if (!itinerary) {
      return res.status(404).json({
        success: false,
        message: 'Itinerary not found',
      });
    }

    // Verify ownership
    if (itinerary.userId.toString() !== req.user._id.toString()) {
      return res.status(403).json({
        success: false,
        message: 'Not authorized to delete this itinerary',
      });
    }

    await itinerary.deleteOne();

    res.status(200).json({
      success: true,
      message: 'Itinerary deleted successfully',
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  generate,
  list,
  getById,
  deleteItinerary,
};
