const express = require('express');
const adminMiddleware = require("../middleware/admin");
const { Admin, Course } = require("../db");
const bodyParser = require("body-parser");
const z = require('zod'); 
const app = express();

const validation = z.object({
    username: z.string().email(),
    password: z.string().min(6),
});

app.use(bodyParser.json());

// Admin Routes
app.post('/admin/signup', async (req, res) => {
    try {
        const validatedData = validation.parse({
            username: req.body.username,
            password: req.body.password,
        });

        // Validation successful, proceed to create admin
        await Admin.create({
            username: validatedData.username,
            password: validatedData.password,
        });

        res.json({ message: 'Admin created successfully' });
    } catch (error) {
        // Validation failed
        res.status(400).send("Your username or password does not meet the given constraints");
    }
});
app.use(adminMiddleware);
app.post('/admin/courses', (req, res) => {
    Course.create({
        title: req.body.title,
        description: req.body.description,
        price: req.body.price,
        imageLink: req.body.image
    })
    res.json({
        message: "Course created successfully",
        courseId: parseInt(Math.random() * 10000)
    })
    // Implement course creation logic
    
});

app.get('/admin/courses', async (req, res) => {
    let courses = await Course.find();
    res.status(200).json(courses);
    // Implement fetching all courses logic
});
app.listen(3000);
module.exports = app;
