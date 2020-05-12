const express = require('express');
const router = express.Router();
var md5 = require('md5');
const jwt = require('jsonwebtoken');
const Course = require('../models/Course');
tokenVerification = require('./verification')


router.post('/add', (req, res, next) => {
    if (tokenVerification.VerifyToken(req, res, next)) {
        jwt.verify(req.token, 'secretkey', (err, authData) => {
            if (err) {
                res.sendStatus(403);
            } else {
                const { courseName, poster, description, shortDescription, duration, totalVideos, price } = req.query;
                // const { courseName, poster, description, shortDescription } = req.body;
                if (courseName != '' || !poster, !description || !shortDescription || !duration || !totalVideos || !price) {
                    res.status(200).json({
                        message: "Missing Felid"
                    });
                }
                else {
                    userId = authData.user._id;
                    const newCourse = new Course({
                        Teacher: userId,
                        Course_Name: courseName,
                        Poster: poster,
                        Duration: duration,
                        Total_Videos: totalVideos,
                        Price: price,
                        Description: description,
                        ShortDescription: shortDescription
                    });
                    newCourse.save()
                        .then(course => {
                            // console.log(user)
                            res.status(200).json({
                                message: "Course Created Successfully", course
                            });
                        })
                        .catch(err => {
                            res.status(200).json({
                                message: "Saving Failed, Missing required Felid", newCourse
                            });
                            console.log(err)
                        });
                }
            }
        });
    }
    else {
        res.sendStatus(403);
    }

});




router.post('/subscribe', (req, res, next) => {
    if (tokenVerification.VerifyToken(req, res, next)) {
        jwt.verify(req.token, 'secretkey', (err, authData) => {
            if (err) {
                res.sendStatus(403);
            } else {
                const { courseId } = req.query;
                // const { courseName, poster, description, shortDescription } = req.body;
                if (!courseId) {
                    res.status(200).json({
                        message: "Missing Felid"
                    });
                }
                else {
                    userId = authData.user._id;
                    Course.findById(courseId)
                        .then(course => {
                            const NewMyCourse = new MyCourse(
                                {
                                    UserId: userID,
                                    course
                                }
                            )
                            console.log(NewMyCourse)

                            NewMyCourse.save.
                            then(MyCourse => {
                                res.status(200).json({
                                    message: "Success", MyCourse
                                });
                            })
                            .catch(err => {
                                res.status(200).json({
                                    message: "Failed, Missing required Parameter", newCourse
                                });
                                console.log(err)
                            });
                        })


                }
            }
        });
    }
    else {
        res.sendStatus(403);
    }

});


router.post('/all', (req, res, next) => {
    Course.find()
        .then(course => {
            res.status(200).json({
                response: 1,
                course
            });
        })
        .catch(err => {
            res.status(200).json({
                message: "Saving Failed, Missing required Felid", newCourse
            });
            console.log(err)
        });

});

router.post('/view', (req, res, next) => {
    const { id } = req.body;
    console.log(req.body)
    Course.findById(id)
        .then(course => {
            res.status(200).json({
                response: 1,
                course
            });
        })
        .catch(err => {
            res.status(200).json({
                message: "Failed, Missing required Parameter", newCourse
            });
            console.log(err)
        });
});






module.exports = router;
