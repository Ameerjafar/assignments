const { Router } = require("express");
const router = Router();
const userMiddleware = require("../middleware/user");
const { Course } = require("../db");

// User Routes
app.post('/signup', (req, res) => {
    User.create({
         username: req.body.username,
         password: req.body.password
    });
    res.status(200).json({message: "User created successfully"});

    // Implement user signup logic
});

app.get('/courses', userMiddleware,async (req, res) => {
    let courses = await Course.find();
    res.status(200).json(courses);
    // Implement listing all courses logic
});

app.post('/courses/:courseId', userMiddleware, async (req, res) => {
    const a = req.params.courseId;
    const one = await Course.find({id: a})
    // Implement course purchase logic
});

app.get('/purchasedCourses', userMiddleware, (req, res) => {

    // Implement fetching purchased courses logic
});
