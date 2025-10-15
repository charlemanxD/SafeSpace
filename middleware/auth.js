const jwt = require('jsonwebtoken');

// Get secret key from .env
const JWT_SECRET = process.env.JWT_SECRET;

// Middleware to verify the token sent in the header
module.exports = function (req, res, next) {
    // 1. Get token from header 
    const token = req.header('x-auth-token'); 

    // 2. Check if no token
    if (!token) {
        return res.status(401).json({ msg: 'No token, authorization denied.' });
    }

    // 3. Verify token validity or authenticity
    try {
        const decoded = jwt.verify(token, JWT_SECRET);
        
        // Add the user object (containing id and pseudonymID) to the request
        req.user = decoded.user;
        next();
    } catch (err) {
        // Response, If the token is invalid or expired
        res.status(401).json({ msg: 'Token is not valid.' });
    }
};