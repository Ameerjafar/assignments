const { Router } = require("express");
const router = Router();
const userMiddleware = require("../middleware/user");
const { Course, User } = require("../db");

app.use(bodyParser.json());

// Admin Routes
app.post('/user/signup', async (req, res) => {
    try {
        const validatedData = validation.parse({
            username: req.body.username,
            password: req.body.password,
        });

        // Validation successful, proceed to create admin
        await User.create({
            username: validatedData.username,
            password: validatedData.password,
        });

        res.json({ message: 'Admin created successfully' });
    } catch (error) {
        // Validation failed
        res.status(400).send("Your username or password does not meet the given constraints");
    }
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

// User Routes
});

router.post('/signup', (req, res) => {
    // Implement user signup logic
});

router.get('/courses', (req, res) => {
    // Implement listing all courses logic
});

router.post('/courses/:courseId', userMiddleware, (req, res) => {
    // Implement course purchase logic
});

router.get('/purchasedCourses', userMiddleware, (req, res) => {
    // Implement fetching purchased courses logic
});

module.exports = router;