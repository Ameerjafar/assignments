const jwt = require("jsonwebtoken");
const secretCode = require('../index');
function userMiddleware(req, res, next) {

    // Implement admin auth logic
    // You need to check the headers and validate the admin from the admin DB. Check readme for the exact headers to be expected
    const token = req.headers.authorization;
    const words = token.split(" ");
    const jwtToken = words[1];
    try {
        jwt.verify(jwtToken, secretCode);
        next();   
    }catch(error) {
        res.status(404).json({message: "you entered invalid token or a password"});
    }
} 

module.exports = userMiddleware;