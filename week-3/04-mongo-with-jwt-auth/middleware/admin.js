const jwt = require("jsonwebtoken");
const { Admin } = require('../db');
// Middleware for handling auth
const secret = require('../index');
function adminMiddleware(req, res, next) {
    // Implement admin auth logic
    // You need to check the headers and validate the admin from the admin DB. Check readme for the exact headers to be expected
    const token = req.headers.authorization;
    const words = token.split(" ");
    const jwtToken = words[1];
    try {
        jwt.verify(jwtToken, secret);
        next();   
    }catch(error) {
        res.status(404).json({message: "you entered invalid token or a password"});
    }
}

module.exports = adminMiddleware;