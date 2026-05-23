const { v4: uuidv4 } = require('uuid');
const Itinerary = require('../models/Itinerary');

// @desc    Toggle public sharing of an itinerary
// @route   POST /api/itineraries/:id/share
// @access  Private
const toggleShare = async (req, res, next) => {
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
        message: 'Not authorized to share this itinerary',
      });
    }

    // Toggle public state
    const newPublicState = !itinerary.isPublic;
    itinerary.isPublic = newPublicState;

    // Generate unique shareToken if enabling share and none exists
    if (newPublicState && !itinerary.shareToken) {
      itinerary.shareToken = uuidv4();
    }

    await itinerary.save();

    const clientUrl = process.env.CLIENT_URL || 'http://localhost:5173';
    const shareUrl = newPublicState ? `${clientUrl}/share/${itinerary.shareToken}` : null;

    res.status(200).json({
      success: true,
      isPublic: itinerary.isPublic,
      shareToken: itinerary.shareToken,
      shareUrl,
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Get a shared public itinerary
// @route   GET /api/share/:shareToken
// @access  Public
const getByShareToken = async (req, res, next) => {
  const { shareToken } = req.params;

  try {
    const itinerary = await Itinerary.findOne({
      shareToken,
      isPublic: true,
    }).populate('documentIds', 'fileName fileType uploadedAt'); // only share safe document metadata

    if (!itinerary) {
      return res.status(404).json({
        success: false,
        message: 'Shared itinerary not found or is no longer public',
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

module.exports = {
  toggleShare,
  getByShareToken,
};
