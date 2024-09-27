const { Router } = require("express");
const adminMiddleware = require("../middleware/admin");
const router = Router();
const jwt = require("jsonwebtoken");
const { Admin, Course } = require("../db");
// Admin Routes
app.post('/signup', (req, res) => {
    // Implement admin signup logic
    const user = req.body.username;
    const pass = req.body.password;
    Admin.create({
        username: user,
        password: pass
    })
    res.json({message: "admin is created sucessfully"});
});

app.post('/signin', adminMiddleware,async (req, res) => {
    // Implement admin signup logic
    const user = req.body.username;
    const pass = req.body.password;
    const us = await User.find({
        username,
        password
    });
    if(user) {
        const yourToken = jwt.sign({user, password}, secretcode);
        res.json({token: yourToken});
    }
    else {
        res.json({message: "your enter the wrong credientials"})
    }
    });  
app.post('/courses', adminMiddleware, (req, res) => {
    Course.create({
        title: req.body.title,
        description: req.body.description,
        price: req.body.price,
        imageLink: req.body.imageLink
    })
    res.json({message: "course created succesfully"})
    // Implement course creation logic
});
app.get('/admin/courses', async (req, res) => {
    let courses = await Course.find();
    res.status(200).json(courses);
});

module.exports = router;