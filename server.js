// Import modules
require('dotenv').config(); // Load environment variables
const express = require('express');
const connectDB = require('./db/conn');
// const customLogger = require('./middleware/loggerMiddleware');
const authRoutes = require('./routes/authRoutes');
const postRoutes = require('./routes/postRoutes');


// PORT
PORT = process.env.PORT || 5050;

// Initialize Express App
const app = express();


// ********** Middleware Setup - [START] **********

// 1. Logger Middleware
// app.use(customLogger);

// 2. Body Parser
app.use(express.json({ extended: false }))

// OTHER MIDDLEWARES



// ********** Middleware Setup - [END] **********




// Database Connection
connectDB();

// API Routes
app.use('/api/auth', authRoutes);
app.use('/api/posts', postRoutes);
// app.use('/api/users', require('./routes/userRoutes'));

// DEFAULT(HOME) Route
app.get('/', (req, res) => {
    res.send('Welcome to the SAFESPACE API! Go to /api/users to see all users ...');
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});

// Export the app for testing purposes
module.exports = app; 
