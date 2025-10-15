
const express = require('express');
const router = express.Router();
const { registerUser, loginUser } = require('../controllers/authController');


// Input validation (e.g., using express-validator) should ideally be added here!

// POST /api/auth/register
router.post('/register', registerUser);

// POST /api/auth/login
router.post('/login', loginUser);

module.exports = router;