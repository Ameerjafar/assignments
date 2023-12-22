const { User } = require('../db');
 
async function userMiddleware(req, res, next) {
    // Implement user auth logic
    // You need to check the headers and validate the user from the user DB. Check readme for the exact headers to be expected
    const userName = req.headers['username'];
    const pass = req.headers['password'];
    const validation = await User.fndOne({
        username: userName,
        password: pass
    })
    if(validation) {
        next();
    } else {
        res.status(404).send("your username or password is wrong");
    }
}

module.exports = userMiddleware;