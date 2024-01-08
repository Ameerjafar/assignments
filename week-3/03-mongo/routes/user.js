const { Router } = require("express");
const router = Router();
const userMiddleware = require("../middleware/user");
const { Course, User } = require("../db");
const z = require('zod');
app.use(bodyParser.json());

const validation = z.object({
    username: z.string().email(),
    password: z.string().min(6)
})

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
        res.status(400).send("Your username or password does not met  the given constraints");
    }
});

app.get('/courses', userMiddleware,async (req, res) => {
    let courses = await Course.find({});
    res.status(200).json(courses);
    // Implement listing all courses logic
});

app.post('/courses/:courseId', userMiddleware, async (req, res) => {
    const courseId = req.params.courseId;
    const username = req.headers['username'];
    try {
        await User.updateOne({
            username: username
        }, {
            "$push": {
                purchasedCourses: courseId
          }
        });
    } catch(error) {
        console.log(error);
    }
    res.json({
        message: "purshase completed"
    });
    // Implement course purchase logic
});
 
app.get('/purchasedCourses', userMiddleware, async (req, res) => {
    // User Routes
    const user = await User.findOne({
        username: req.headers.username  
    })
    const courses = await Course.find({
        _id: {
            "$in": user.purchasedCourses
        }
    }) 
     res.json({
        courses: courses
     })
}); 

module.exports = router;