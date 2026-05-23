const mongoose = require('mongoose');

const FlightSchema = new mongoose.Schema({
  airline: { type: String, default: '' },
  flightNo: { type: String, default: '' },
  from: { type: String, default: '' },
  to: { type: String, default: '' },
  departure: { type: String, default: '' },
  arrival: { type: String, default: '' },
});

const HotelSchema = new mongoose.Schema({
  name: { type: String, default: '' },
  checkIn: { type: String, default: '' },
  checkOut: { type: String, default: '' },
  address: { type: String, default: '' },
  confirmationNo: { type: String, default: '' },
});

const ActivitySchema = new mongoose.Schema({
  time: { type: String, default: '' },
  activity: { type: String, default: '' },
  location: { type: String, default: '' },
  notes: { type: String, default: '' },
});

const DayPlanSchema = new mongoose.Schema({
  day: { type: Number, required: true },
  date: { type: String, default: '' },
  activities: [ActivitySchema],
});

const ItinerarySchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  documentIds: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Document',
  }],
  title: {
    type: String,
    required: true,
  },
  destination: {
    type: String,
    required: true,
  },
  travelDates: {
    from: { type: Date },
    to: { type: Date },
  },
  rawAIResponse: {
    type: String,
    required: true,
  },
  structured: {
    flights: [FlightSchema],
    hotels: [HotelSchema],
    dayWisePlan: [DayPlanSchema],
    tips: [String],
    totalBudgetEstimate: { type: String, default: null },
  },
  shareToken: {
    type: String,
    unique: true,
    sparse: true,
    index: true,
  },
  isPublic: {
    type: Boolean,
    default: false,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model('Itinerary', ItinerarySchema);
