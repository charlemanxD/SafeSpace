const mongoose = require('mongoose');

const donationSchema = new mongoose.Schema({
    // Paystack Reference
    transactionRef: { 
        type: String, 
        required: true, 
        unique: true, 
        index: true 
    },
    
    // Donation details
    amount: { 
        type: Number, 
        required: true 
    },
    email: { 
        type: String, 
        required: true 
    },
    
    // Status update (updated by the Paystack Webhook)
    status: { 
        type: String, 
        enum: ['pending', 'success', 'failed', 'abandoned'],
        default: 'pending' 
    },
    
    // Link to user (optional, can be null for non-logged-in donors)
    donorPseudonymID: {
        type: String,
        required: false 
    }
}, { timestamps: true });

const Donation = mongoose.model('Donation', donationSchema);
module.exports = Donation;