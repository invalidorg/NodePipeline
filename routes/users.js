const express = require('express');
const router = express.Router();
var md5 = require('md5');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const Session = require('../models/Session');
tokenVerification = require('./verification')


// Register
router.post('/register', (req, res) => {
  const { name, email, password, password2, userType } = req.body;
  // console.log((req.body.password))
  let error = 0;
  let error_message = "";
  if (!name || !email || !password || !password2) {
    error = 1;
    res.status(200).json({
      message: "Please Enter All Felids"
    });
  }

  if (password != password2) {
    error = 1
    res.status(200).json({
      message: "Passwords do not match"
    });
  }

  if (password.length < 6) {
    error = 1

    res.status(200).json({
      message: "Passwords must be greater than 6 character"
    });
  }

  if (error == 1) {
    res.status(200).json({
      message: "Something Wrong Happens"
    });

  } else {
    User.findOne({ email: email }).then(user => {
      if (user) {

        res.status(200).json({
          message: "User Already Exist"
        });
      } else {
        const newUser = new User({
          name,
          email,
          password, userType
        });
        newUser.password = md5(newUser.password);

        newUser
          .save()
          .then(user => {
            // console.log(user)
            res.status(200).json({
              message: "User Created Successfully Please Login",
              detail: user,
              response: 1
            });
          })
          .catch(err => console.log(err));
      }
    });
  }
});



// Login
router.post('/login', (req, res, next) => {
  LoginUser(res, req)
});


async function LoginUser(res, req) {
  var { email, password } = req.body;
  // var { email, password } = req.query;
  if (email || password) {
    password = md5(password);
    User.findOne({ email: email }).then(user => {
      if (user) {
        User.findOne({ password: password,email:email }).then(user => {
          if (user) {
            saveSession(user, res)
          }
          else {
            res.status(200).json({
              message: "Password Doesn't Matches"
            });
          }
        })
      }
      else {
        res.status(200).json({
          message: "User Doesn't Exist"
        });
      }
    })
  }
  else {
    res.status(200).json({
      message: "Missing Felid"
    });
  }
}

function saveSession(user, res) {
  const newSession = new Session({
    userId: user._id
  });
  newSession
    .save()
    .then(session_info => {
      console.log(session_info)
      jwt.sign({ user }, 'secretkey', { expiresIn: '30d' }, (err, token) => {
        res.json({
          token: token,
          message: "Session Created Successfully",
          session_info: session_info,
          userID: user._id,
          userType: user.userType,
          userEmail: user.email,
          name: user.name
        });
      })
    })
    .catch(err => console.log(err));
}



// verification
router.post('/verify', (req, res, next) => {
  // console.log(typeof (req.body))
  // console.log((req))
  if (tokenVerification.VerifyToken(req, res, next)) {
    jwt.verify(req.token, 'secretkey', (err, authData) => {
      if (err) {
        res.sendStatus(403);
      } else {
        res.json({
          message: 'Post created...',
          authData
        });
      }
    });
  }
  else {
    res.sendStatus(403);
  }
});





module.exports = router;
