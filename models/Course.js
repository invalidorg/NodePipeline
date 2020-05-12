const mongoose = require('mongoose');

const CourseSchema = new mongoose.Schema({
    Teacher: {
        type: String,
        required: true
    },
    Course_Name: {
        type: String,
        required: true
    },
    Poster: {
        type: String,
        required: true
    },
    Duration: {
        type: Number,
        required: true
    },
    Total_Videos: {
        type: Number,
        required: true
    },
    Price: {
        type: Number,
        required: true
    },
    Description: {
        type: String,
        required: true
    },
    ShortDescription: {
        type: String,
        required: true
    },
    Date: {
        type: String,
        default: new Date()
    }
});

const Course = mongoose.model('Course', CourseSchema);

module.exports = Course;
