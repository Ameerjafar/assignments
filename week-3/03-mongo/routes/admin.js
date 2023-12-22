const { Router } = require("express");
const adminMiddleware = require("../middleware/admin");
const router = Router();
const zod = require('zod');
const { Admin, Course } = require("../db");



// Admin Routes
app.post('/admin/signup', (req, res) => {
    Admin.create({
         username: req.body.username,
         password: req.body.password
    })

    res.json({message: "Admin created successfully"})
    // Implement admin signup logic
});

app.post('/admin/courses', adminMiddleware, (req, res) => {
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

app.get('/admin/courses', adminMiddleware, async (req, res) => {
    let courses = await Course.find();
    res.status(200).json(courses);
    // Implement fetching all courses logic
});

module.exports = router;