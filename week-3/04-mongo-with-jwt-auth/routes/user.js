const { Router } = require("express");
const router = Router();
const userMiddleware = require("../middleware/user");

// User Routes
app.post('/signup', (req, res) => {
    // Implement user signup logic
    const user = req.body.username;
    const pass = req.body.password;
    User.create({
        username: user,
        password: pass
    });
    res.json({message: "User created successfully"});
});

app.post('/signin', (req, res) => {
    // Implement admin signup logic
    User.create({
        username: req.body.username,
        password: req.body.password
    });
    const yourToken = jwt.sign({user}, req.body.password);
    res.json({token: yourToken});
});

app.get('/courses', (req, res) => {
    // Implement listing all courses logic
    
});

app.post('/courses/:courseId', userMiddleware, (req, res) => {
    // Implement course purchase logic
});

app.get('/purchasedCourses', userMiddleware, (req, res) => {
    // Implement fetching purchased courses logic
});
 