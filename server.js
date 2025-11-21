// Import modules
require('dotenv').config(); // Load environment variables
const express = require('express');
const cors = require('cors');
const connectDB = require('./db/conn');
// const customLogger = require('./middleware/loggerMiddleware');
const authRoutes = require('./routes/authRoutes');
const postRoutes = require('./routes/postRoutes');
const resourceRoutes = require('./routes/resourceRoutes');
const donationRoutes = require('./routes/donationRoutes');

const path = require('path');


// PORT
PORT = process.env.PORT || 5050;

// Initialize Express App
const app = express();

// Set the allowed frontend origins
const allowedOrigins = process.env.ALLOWED_ORIGINS

// Configure CORS
const corsOptions = {
    origin: (origin, callback) => {
        // Allow requests with no origin (like mobile apps or postman)
        if (!origin || allowedOrigins.includes(origin)) {
            callback(null, true);
        } else {
            callback(new Error('Not allowed by CORS'));
        }
    },
    // methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    // credentials: true,
    // optionsSuccessStatus: 204
};


// ********** Middleware Setup - [START] **********

// 1. Logger Middleware
// app.use(customLogger);

// 1. CORS Middleware
app.use(cors(corsOptions));

// 2. Body Parser
app.use(express.json());


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


// Home Route @Development
// app.get('/', (req, res) => {
//     res.send('Welcome to the SAFESPACE API! ...');
// });

// Home Route @Production
// app.use(express.static(path.join(__dirname, 'frontend/dist')));

// Catch-all route to serve the frontend application
// app.use('*' , (req, res) => {
//     res.sendFile(path.join(__dirname, 'frontend/dist/index.html'));
// })

// ********** API Routes - [END] **********


// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});

// Export the app for testing purposes
module.exports = app; 
