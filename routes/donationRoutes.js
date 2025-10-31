// routes/donationRoutes.js

const express = require('express');
const router = express.Router();
const donationController = require('../controllers/donationController');
const auth = require('../middleware/auth'); // If you want to identify logged-in users

// Initiate a transaction (using auth optional to capture pseudonymID if logged in)
router.post('/initiate', donationController.initiateDonation);

// Webhook endpoint (MUST be a POST request from Paystack)
router.post('/webhook', donationController.paystackWebhook); 

module.exports = router;