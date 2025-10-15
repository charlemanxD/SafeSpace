const mongoose = require('mongoose');
// require('dotenv').config();


const connectDB = async () => {
    try {
        await mongoose.connect(process.env.ATLAS_URI);
        console.log('✅ MongoDB connection SUCCESSFUL . . . 👌');
        
    } catch (error) {
        console.error(`❌ MongoDB connection FAILED: ${error.message}`);
        process.exit(1);
    }
}

module.exports = connectDB;