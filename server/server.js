require('dotenv').config();
const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const cookieParser = require('cookie-parser');
const connectDB = require('./config/db');
const errorHandler = require('./middleware/errorHandler');

// Route files
const authRoutes = require('./routes/authRoutes');
const documentRoutes = require('./routes/documentRoutes');
const itineraryRoutes = require('./routes/itineraryRoutes');
const shareRoutes = require('./routes/shareRoutes');

// Connect to MongoDB database
connectDB();

const app = express();

// Security HTTP headers
app.use(helmet({
  crossOriginResourcePolicy: false, // Allows displaying images from Cloudinary directly
}));

// CORS configuration - only allow CLIENT_URL (automatically strips trailing slash)
const clientUrl = (process.env.CLIENT_URL || 'http://localhost:5173').replace(/\/$/, '');
app.use(
  cors({
    origin: clientUrl,
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization'],
  })
);

// Body parsers
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));

// Cookie parser for JWT
app.use(cookieParser());

// Mount routers
app.use('/api/auth', authRoutes);
app.use('/api/documents', documentRoutes);
app.use('/api/itineraries', itineraryRoutes);
app.use('/api', shareRoutes); // shareRoutes holds /api/itineraries/:id/share and /api/share/:shareToken

// Base health check route
app.get('/api/health', (req, res) => {
  res.status(200).json({ success: true, message: 'TripMind API is up and running' });
});

// Centralized error handler
app.use(errorHandler);

const PORT = process.env.PORT || 5001;

const server = app.listen(PORT, () => {
  console.log(`Server running in ${process.env.NODE_ENV || 'development'} mode on port ${PORT}`);
});

// Handle unhandled promise rejections
process.on('unhandledRejection', (err, promise) => {
  console.error(`Unhandled Rejection Error: ${err.message}`);
  // Close server & exit process
  server.close(() => process.exit(1));
});
