const router = require('express').Router()
const User = require('../models/github')
const LIMIT = 6;

//https://scotch.io/tutorials/using-mongoosejs-in-node-js-and-mongodb-applications
//total items:
router.route('/total')
  .get((req, res, next) => {
    User.countDocuments({}, (err, count) => {
      if (err) return next(err)
      return res.json({total: count, limit: LIMIT})
    })
  });

// pagination: /api/users/page/1, /api/user/page/2...
router.route('/page/:page')
  .get((req, res, next) => {
    const offset = req.params.page - 1;
    User.find().skip(offset * LIMIT).limit(LIMIT).exec((err, users) => {
      if (err) return next(err)
      return res.json(users)
    })
  })

// works but deprecated, not use anymore.
router.route('/')
  .get((req, res, next) => {
    //User.findOne({_id: token }, callback);
    User.find((err, users) => {
      if (err) return next(err)
      return res.json(users)
    })
  })

  .post((req, res, next) => {

    var user = new User(req.body);
    user.password = user.generateHash(req.body.password)

    user.save((err, nuser) => {
      if (err) return next(err)

      console.log('nuser', nuser)
      return res.status(201).json(nuser)
    })
  })

  .put((req, res, next) => {
    const {firstName, lastName, email, team, role, location, comment} = req.body;
    const data = {
      firstName,
      lastName,
      role,
      team,
      location,
      comment,
      email
    }

    User.findOneAndUpdate({_id: req.body._id}, {$set: data}, {new: true},
      (err, user) => {
        if (err) return next(err)

        return res.json(user)
      })
  })
  .delete((req, res, next) => {
    /**
     * req.body include: id and email. delete by id or email?
     */
    User.deleteOne({_id: req.body.id}, (err) => {
      if (err) return next(err)
      res.status(204).end()
    })
  });


/**
 * 1. only [:keyword] is not empty
 * 2. fetch all results, no pagination
 */
router.route('/search/:keyword')
  .get((req, res, next) => {
    var search = req.params.keyword;
    var reg = new RegExp(req.params.keyword, 'i');
    User.find({
      '$or': [
        {firstName: reg},
        {lastName: reg},
        {email: reg}
      ]
    }).exec((err, users) => {
      if (err) return next(err)
      return res.json(users)
    })
  });


router.param('id', (req, res, next, id) => {
  User.findById(id, (err, user) => {
    if (err) return next(err)

    // If the user is not found then the app returns a 404
    if (!user) {
      err = new Error('User not found')
      err.status = 404
    } else {
      req.user = user
    }

    return next(err)
  })
});

router.route('/:uid')
  .delete((req, res, next) => {
    console.log('should not be here...')

    User.findByIdAndRemove(req.user._id, (err) => {
      if (err) return next(err);

      res.status(204).end()
    })
  })

module.exports = router
