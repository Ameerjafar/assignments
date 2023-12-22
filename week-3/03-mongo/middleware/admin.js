const { Admin } = require("../db");

// Middleware for handling auth
async function adminMiddleware(req, res, next) {
    // Implement admin auth logic
    // You need to check the headers and validate the admin from the admin DB. Check readme for the exact headers to be expected
    try {
    const userName = req.headers['username'];
    const pass = req.headers['password'];

    const validation = await Admin.findOne({
        username: userName,
        password: pass
    })
    next();
    }catch(error) {
        res.status(404).send("admin account is not found")
    }


}

module.exports = adminMiddleware;