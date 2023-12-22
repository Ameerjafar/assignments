



const mongoose = require('mongoose');

// Connect to MongoDB
mongoose.connect('mongodb://localhost:27017');

// Define schemas
const AdminSchema = new mongoose.Schema({
    // Schema definition here
    username: String,
    password: String
});

const UserSchema = new mongoose.Schema({
    // Schema definition here
    username: String,
    password: String
});

const CourseSchema = new mongoose.Schema({
    // Schema definition here
    title: String,
    description: String,
    price: Number, 
    image: String

});
const purchasedCoursesSchema = new mongoose.Schema({
    courseId: Number,
    title: String,
    description: String,
    price: String,
    image: String
});

const Admin = mongoose.model('Admin', AdminSchema);
const User = mongoose.model('User', UserSchema);
const Course = mongoose.model('Course', CourseSchema);
const purchasedCourses = mongoose.model('PurchasedCourses', purchasedCoursesSchema);
module.exports = {
    Admin,
    User,
    Course,
    purchasedCourses
}
