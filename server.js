// Import modules
require('dotenv').config(); // Load environment variables
const express = require('express');
const connectDB = require('./db/conn');
// const customLogger = require('./middleware/loggerMiddleware');
const authRoutes = require('./routes/authRoutes');
const postRoutes = require('./routes/postRoutes');
const resourceRoutes = require('./routes/resourceRoutes');
const donationRoutes = require('./routes/donationRoutes');


// PORT
PORT = process.env.PORT || 5050;

// Initialize Express App
const app = express();


// ********** Middleware Setup - [START] **********

// 1. Logger Middleware
// app.use(customLogger);

// 2. Body Parser
app.use(express.json());

// OTHER MIDDLEWARES



// ********** Middleware Setup - [END] **********


// Database Connection
connectDB();


// ********** API Routes - [START] **********

app.use('/api/auth', authRoutes);

// Posts routes
app.use('/api/posts', postRoutes);

// Resources routes
app.use('/api/resources', resourceRoutes);

// Donation Routes
app.use('/api/donate', donationRoutes);


// HOME(DEFAULT) Route
app.get('/', (req, res) => {
    res.send('Welcome to the SAFESPACE API! ...');
});


// ********** API Routes - [END] **********


// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});

// Export the app for testing purposes
module.exports = app; 
