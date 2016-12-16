var User        = require('../models/user'),
    bcrypt      = require('bcrypt-nodejs'),
    jwt         = require('jsonwebtoken'),
    env         = require('../config/environment'),
    superSecret = env.superSecret;

//||||||||||||||||||||||||||--
// CREATE USER
//||||||||||||||||||||||||||--
var userCreate = function(req, res) {
    var user          = new User();   // create a new instance of the User model
    user.firstName    = req.body.firstName;  // set the users firstName (comes from the request)
    user.lastName     = req.body.lastName;  // set the users lastName (comes from the request)
    user.email        = req.body.email; // set the users email (comes from the request)
    user.phoneNumber  = req.body.phoneNumber;  // set the users phone number (comes from the request)
    user.password     = req.body.password;  // set the users password (comes from the request)


    user.save(function(err, newUser) {
        if (err) {
          // duplicate entry
          if (err.code == 11000)
            return res.json({ success: false, message: 'User already exists! '});
          else
            return res.json(err);
        }

          var token = jwt.sign({
            email:       user.email,
            firstName:   user.firstName,
            lastName:    user.lastName,
            phoneNumber: user.phoneNumber,
            _id:         user._id
          }, superSecret, {
            expiresIn: '30d' // expires in 30 days
          });

        // return a message
        res.json({
          message: "Welcome to Housemate!",
          user: newUser,
          token: token
        });
      });

};

//||||||||||||||||||||||||||--
// GET USER
//||||||||||||||||||||||||||--
var userShow = function(req, res) {
  User.findById(req.params.id, function(err, user) {
        if (err) res.send(err);

        user.household(function(err, household) {
          // return that user
          res.json({user, household})
        })
  });
};

//||||||||||||||||||||||||||--
// GET USERS
//||||||||||||||||||||||||||--
var usersAll = function(req, res) {
  User.find({}, function(err, users) {
        if (err) res.send(err);

        // return the users
        res.json(users);
  });
}

//||||||||||||||||||||||||||--
// UPDATE USER
//||||||||||||||||||||||||||--
var userUpdate = function(req, res) {
  User.findById(req.params.id, function(err, user) {
      console.log("Whu?");

        if (err) res.send(err);

        // set the new user information if it exists in the request
        if (req.body.firstName)        user.firstName        = req.body.firstName;
        if (req.body.lastName)        user.lastName        = req.body.lastName;
        if (req.body.email)        user.email        = req.body.email;
        if (req.body.phoneNumber) user.phoneNumber = req.body.phoneNumber;
        if (req.body.password)    user.password    = req.body.password;

        // save the user
        user.save(function(err) {
          if (err) res.send(err);

          // return a message
          res.json({ message: 'User updated!' });
        });
  });
}

//||||||||||||||||||||||||||--
// DELETE USER
//||||||||||||||||||||||||||--
var userDelete = function(req, res) {
  User.remove({
        _id: req.params.id
      }, function(err, user) {
        if (err) res.send(err);

        res.json({ message: 'Successfully deleted' });
  });
}

//||||||||||||||||||||||||||--
// EXPORT MODULE
//||||||||||||||||||||||||||--
module.exports = {
  userCreate:   userCreate,
  userShow:     userShow,
  usersAll:     usersAll,
  userUpdate:   userUpdate,
  userDelete:   userDelete
};
