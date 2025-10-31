const jwt = require('jsonwebtoken');

// Get secret key from .env
const JWT_SECRET = process.env.JWT_SECRET;

// Middleware to verify the token sent in the header
module.exports = function (req, res, next) {
    // 1. Get token from header 
    const token = req.header('x-auth-token') || req.header('Authorization').split(' ')[1];; 

    // 2. Check if no token
    if (!token) {
        return res.status(401).json({ msg: 'No token, authorization denied.' });
    }

    // 3. Verify token validity or authenticity
    try {
        // Handle Bearer token format: "Bearer <token>" (case-insensitive)
        let tokenToVerify = token.replace(/^\s*Bearer\s+/i, '').trim();

        const decoded = jwt.verify(tokenToVerify, JWT_SECRET);
        
        // Attach the user info to the request object
        req.user = decoded.user;
        next();
    } catch (err) {
        // Response, If the token is invalid or expired
        console.error("JWT Verification Failed:", err.message);
        res.status(401).json({ msg: 'Token is not valid.' });
    }
};








// const jwt = require('jsonwebtoken');

// module.exports = function(req, res, next) {
//     // 1. Get token from the 'Authorization' header
//     const authHeader = req.header('Authorization');

//     // Check 1: Is the header present at all?
//     if (!authHeader) {
//         // This is the 'No token...' error, which you passed, so this block is not running.
//         return res.status(401).json({ msg: 'No token, authorization denied' });
//     }

//     // Check 2: Does it contain the 'Bearer ' prefix?
//     if (!authHeader.startsWith('Bearer ')) {
//         // This means the token is present, but not in the expected format.
//         return res.status(401).json({ msg: 'Authorization header is malformed (missing Bearer prefix)' });
//     }

//     // 3. Extract and trim the token string
//     let tokenToVerify = authHeader.slice(7).trim(); 

//     // 💡 VITAL LOGS: Place these immediately before jwt.verify
//     console.log("--- DEBUG START ---");
//     console.log("JWT Secret (Length):", process.env.JWT_SECRET.length);
//     console.log("Cleaned Token (Length):", tokenToVerify.length);
//     console.log("Cleaned Token (Value):", tokenToVerify);
//     console.log("--- DEBUG END ---");

//     // This is the line that throws the error:
//     const decoded = jwt.verify(tokenToVerify, process.env.JWT_SECRET);
    
//     // 💡 VITAL: Check 3: Is the resulting string empty? (This often causes "jwt malformed")
//     if (!tokenToVerify) {
//         return res.status(401).json({ msg: 'Token is malformed (empty after stripping Bearer)' });
//     }
    
//     // 4. Attempt verification
//     try {
//         // Verification requires a clean JWT string
//         const decoded = jwt.verify(tokenToVerify, process.env.JWT_SECRET);
        
//         req.user = decoded.user;
//         next();

//     } catch (err) {
//         // 💡 This is the block running now! The error object (err) is where 'jwt malformed' is originating.
//         console.error("JWT Verification Failed:", err.message); 
//         return res.status(401).json({ msg: 'Token is not valid' });
//     }
// };