const { Admin } = require("../db");
// Middleware for handling auth
 async function adminMiddleware(req, res, next) {
    // Implement admin auth logic
    // You need to check the headers and validate the admin from the admin DB. Check readme for the exact headers to be expected
    const userName = req.headers['username'];
    const pass = req.headers['password'];
    const validation = await Admin.findOne({
        username: userName,
        password: pass
    })
    if(validation) {
        next();
    } else {
        res.status(403).send("your username or password is wrong");
    }

}

module.exports = adminMiddleware;