const User = require('../models/User'); 
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { randomUUID } = require('crypto'); // in-built UUID library generator


// --- Pseudony Generation & REGISTRATION Logic ---

//  JWT Secret key
const JWT_SECRET = process.env.JWT_SECRET;

// Function to generate a unique ID  and create a Pseudonym
// UUID is secure and ensures global uniqueness.
const generatePseudonymID = () => {
    // Take the first 8 characters of a UUID for a slightly shorter, unique ID
    return 'User-' + randomUUID().substring(0, 8); 
};

// @route POST /api/auth/register
// @desc Register user & generate Pseudonym
// @access Public
exports.registerUser = async (req, res) => {
    const { email, username, password } = req.body;

    try {
        // 1. Check if user already exists
        let user = await User.findOne({ email });
        if (user) {
            return res.status(400).json({ msg: 'User already exists with this email.' });
        }
        
        // Check if username is already taken
        user = await User.findOne({ username });
        if (user) {
            return res.status(400).json({ msg: 'Username is already taken.' });
        }

        // 2. Hash the Password
        const salt = await bcrypt.genSalt(10);
        const hash = await bcrypt.hash(password, salt);

        // 3. Generate Anonymous Pseudonym ID
        const pseudonymID = generatePseudonymID();
        
        // 4. Create and Save New User
        user = new User({
            email,
            username,
            hashedPassword: hash, // Store the hashed password
            pseudonymID, // Store the unique pseudonym
            status: 'active' // Initial status
        });

        await user.save();

        // 5. Create JWT Payload (Critical: only include non-sensitive data)
        const payload = {
            user: {
                id: user.id,
                pseudonymID: user.pseudonymID // The ID used for display and posts
            }
        };

        // 6. Sign/Generate the Token and Send Response
        try {
            const token = jwt.sign(
                payload,
                JWT_SECRET,
                { expiresIn: '1h' }
            );
            // The response in the terminal, If JWT Token creation SUCESSFUL
            // res.json({ token, pseudonymID: user.pseudonymID });
            console.log({token, pseudonymID: user.pseudonymID})

            // The response in the FrondEnd if JWT Token creation SUCESSFUL
            res.status(201).json({
                msg: 'Registrtion Successful ✅.',
                pseudoID: user.pseudonymID
            });
            
        } catch (jwtErr) {
            // TEMPORARY The response in the terminal  if JWT token creation FAILS
            console.error('JWT SIGNING ERROR:', jwtErr.message);

            // TEMPORARY response in FrontEnd  if JWT token creation FAILS
            return res.status(500).json({
                msg: 'Registrtion Successful ✅, but token creation failed. Please try logging in.',
                errorDetail: jwtErr.message
            });
        };

    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error during registration.');
    }
};




// --- LOGIN Logic ---

// @route POST /api/auth/login
// @desc Authenticate User & get token
// @access Public
exports.loginUser = async (req, res) => {
    const { email, password } = req.body;

    try {
        // 1. Check for user existence
        let user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({ msg: 'Invalid Credentials.' });
        }

        // 2. Check Password
        const isMatch = await bcrypt.compare(password, user.hashedPassword);
        if (!isMatch) {
            return res.status(400).json({ msg: 'Invalid Credentials.' });
        }

        // 3. Check for Active Status (Moderation check)
        if (user.status !== 'active') {
            return res.status(403).json({ msg: `Account is ${user.status}. Access denied.` });
        }

        // 4. Create JWT Payload 
        const payload = {
            user: {
                id: user.id,
                pseudonymID: user.pseudonymID
            }
        };

        // 5. Create JWT Token  
        try {
            const token =   jwt.sign(
            payload,
            JWT_SECRET,
            { expiresIn: '1h' }
        );

        // Backend response, if the JWT token creation is a SUCCESS
        console.log({ token, pseudonymID: user.pseudonymID });

        // FrontEnd response, if the JWT token creation is a SUCCESS
        res.json({
            msg: `You are LOGGED-IN! Welcome, ${user.pseudonymID}`
        })
        } catch (jwtErr) {
            // Backend response, if JWT token creation FAILS
            console.error('JWT SIGNING ERROR:', jwtErr.message)

            // FrontEnd response, if JWT token creation FAILS
            res.status(400).json('Token creation failed. Please try logging in')
        };

    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error during login.');
    }
};