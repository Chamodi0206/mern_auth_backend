require('dotenv').config(); // Load environment variables
const express = require('express'); // Import Express
const mongoose = require('mongoose'); // Import Mongoose
const cors = require('cors'); // Import CORS middleware

const app = express(); // Initialize the Express app

// Log all incoming requests
app.use((req, res, next) => {
  console.log(`${req.method} ${req.url}`);
  next(); // Pass control to the next middleware
});

// Middleware
app.use(express.json()); // Parse JSON bodies
app.use(cors()); // Enable CORS

// MongoDB Connection
mongoose
  .connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true }) // Connection options
  .then(() => console.log('MongoDB connected'))
  .catch((err) => {
    console.error('Database connection error:', err);
    process.exit(1); // Exit the process if the database connection fails
  });

// Import Routes
const authRoutes = require('./routes/auth');
app.use('/api/auth', authRoutes); // Use auth routes

// Handle 404 Errors for Undefined Routes
app.use((req, res, next) => {
  res.status(404).json({ error: 'Route not found' });
});

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
