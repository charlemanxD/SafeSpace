const axios = require('axios');
const Donation = require('../models/Donation');
const crypto = require('crypto'); // Node module for webhook signature

const PAYSTACK_SECRET_KEY = process.env.PAYSTACK_SECRET_KEY;
const PAYSTACK_WEBHOOK_URL = process.env.PAYSTACK_WEBHOOK_URL; // For reference/verification

// @route POST /api/donate/initiate
// @desc Initiate a donation transaction with Paystack
// @access Public (Frontend calls this to get redirect URL)
exports.initiateDonation = async (req, res) => {
    const { amount, email, currency } = req.body; 
    
    // Get pseudonym if user is logged in (auth middleware can be used)
    const donorPseudonymID = req.user ? req.user.pseudonymID : null;

    if (!amount || !email || !currency) {
        return res.status(400).json({ msg: 'Amount and email are required.' });
    }

    // 1. Create unique transaction reference
    const reference = `safespace-${Date.now()}-${Math.random().toString(36).substring(2, 9)}`;

    try {
        // 2. Save the transaction intention as 'pending'
        const newDonation = new Donation({
            transactionRef: reference,
            amount,
            email,
            donorPseudonymID,
            status: 'pending'
        });
        await newDonation.save();

        // 3. Initiate transaction with Paystack API
        const paystackResponse = await axios.post(
            'https://api.paystack.co/transaction/initialize',
            {
                email,
                amount: amount, // amount in kobo/minor unit
                reference: reference,
                currency: currency,
                callback_url: `${req.headers.origin}/support-us?ref=${reference}` // Redirect back to your frontend
            },
            {
                headers: {
                    Authorization: `Bearer ${PAYSTACK_SECRET_KEY}`,
                    'Content-Type': 'application/json'
                }
            }
        );

        // 4. Send back the authorization URL (redirect link) to the frontend
        res.json({ 
            authorization_url: paystackResponse.data.data.authorization_url,
            reference: reference
        });

    } catch (err) {
        console.error('Paystack Initiation Error:', err.message);
        res.status(500).send('Server error. Could not initiate payment.');
    }
};

// @route POST /api/donate/webhook
// @desc Endpoint to receive payment notifications from Paystack
// @access Public
exports.paystackWebhook = async (req, res) => {
    // 1. Verify the webhook signature
    const hash = crypto.createHmac('sha512', PAYSTACK_SECRET_KEY)
                        .update(JSON.stringify(req.body))
                        .digest('hex');

    if (hash !== req.headers['x-paystack-signature']) {
        return res.status(400).send({ msg: 'Invalid webhook signature.' });
    }

    const event = req.body;

    // 2. Handle the successful payment event
    if (event.event === 'charge.success') {
        const { reference, amount, customer } = event.data;

        try {
            // Find the pending transaction and update its status
            const donation = await Donation.findOneAndUpdate(
                { transactionRef: reference, status: 'pending' },
                { status: 'success' },
                { new: true } // Return the updated document
            );

            if (!donation) {
                console.warn(`Webhook received for unknown or already processed reference: ${reference}`);
            }
            // Log successful donation
            console.log(`Donation success recorded for ref: ${reference}, amount: ${amount}`);

        } catch (err) {
            console.error('Database update error on webhook:', err.message);
            // Send 200 response to Paystack even if DB update fails, but log the error
        }
    }
    
    // 3. Respond to Paystack
    // Return a 200 status to acknowledge receipt of the webhook.
    res.sendStatus(200); 
};