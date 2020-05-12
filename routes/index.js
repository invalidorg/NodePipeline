const express = require('express');
const router = express.Router();
const { ensureAuthenticated, forwardAuthenticated } = require('../config/auth');

router.get("/", (req, res, next) => {
    res.status(409).json({
        message: "Home Page"
    });
})

module.exports = router;