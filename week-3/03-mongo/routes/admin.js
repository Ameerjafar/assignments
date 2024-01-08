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
app.post('/signup', (req, res) => {
    // Implement admin signup logic
});

app.post('/courses', adminMiddleware, (req, res) => {
    // Implement course creation logic
    
});

app.get('/courses', adminMiddleware, (req, res) => {
    // Implement fetching all courses logic
});
app.listen(3000);
module.exports = app;
