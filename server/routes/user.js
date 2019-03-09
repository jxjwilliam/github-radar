const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const SECRET = "userloginjsonwebtoken";
const User = require('../models/loginUser');

router.get('/:email', function (req, res, next) {
  const email = req.params.email;
  User.findOne({email: email}, (err, users) => {
    return res.json(users);
  })
});

router.get('/', function (req, res, next) {
  User.find({}, (err, users) => {
    return res.json(users);
  })
});


router.post('/', (req, res, next) => {

  let {firstName, lastName, role, team, location, comment, email} = req.body;
  const data = {
    firstName,
    lastName,
    role,
    team,
    location,
    comment,
    email
  };

  if (!(firstName && lastName && email)) {
    return res.json({
      success: false,
      message: 'Error: mandatory field is missing.'
    });
  }

  User.findOneAndUpdate({email: email}, data, (err, user) => {
    if (err) {
      return res.json({
        success: false,
        message: 'Error: Server error'
      });
    }
    return res.json(data)
  });

});


module.exports = router;