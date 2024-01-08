const express = require('express');
const adminMiddleware = require("../middleware/admin");
const { Admin, Course } = require("../db");
const bodyParser = require("body-parser");   
const app = express();


app.use(bodyParser.json());

// Admin Routes
app.post('/signup', async (req, res) => {
    // Implement admin signup logic
    const user = req.body.username;
    const pass = req.body.password;
    const present = await Admin.findOne({username, password});
    if(present) {
        res.status(403).json({message: "This username and password is already present in the database"});
    }
    else {
        Admin.create({
            username: user,
            password: pass
        });
        res.json({message: 'Admin  created successfully'});  
    }
});

app.post('/courses', adminMiddleware, async (req, res) => {
    const newCourse = await Course.create({
        title: req.body.title,
        description: req.body.description,
        imageLink: req.body.imageLink,
        price: req.body.price
    });  
    res.json({
        message: "Course created successfully", courseId: newCourse._id });  
    // Implement course creation logic
    
});

app.get('/courses', adminMiddleware, async (req, res) => {
      const allCourse = await Course.find({});
      res.json({message: allCourse});       
    // Implement fetching all courses logic
});
app.listen(3000);
module.exports = app;
