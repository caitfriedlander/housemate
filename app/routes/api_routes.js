var express = require('express'),
    router = express.Router();

// Require bills controller
var BillsCtrl = require('../controllers/bills'),
    UsersCtrl  = require('../controllers/users'),
    AuthsCtrl  = require('../controllers/auths');


// GET CURRENT USER - WE'RE DOING THIS IN THE BROWSER THOUGH!
// apiRouter.get('/me', function(req, res) {
//   res.send(req.decoded);
// });

//||||||||||||||||||||||||||--
// USERS CRUD SERVICES
//||||||||||||||||||||||||||--
router.post('/login',                               AuthsCtrl.userAuth);
router.get('/users',                                UsersCtrl.usersAll);
router.post('/users',                               UsersCtrl.userCreate);
router.get('/users/:id',     AuthsCtrl.tokenVerify, UsersCtrl.userShow);
router.put('/users/:id',     AuthsCtrl.tokenVerify, UsersCtrl.userUpdate);
router.delete('/users/:id',  AuthsCtrl.tokenVerify, UsersCtrl.userDelete);

//||||||||||||||||||||||||||--
// BILLS CRUD SERVICES
//||||||||||||||||||||||||||--
router.get('/bills/:id',    AuthsCtrl.tokenVerify, BillsCtrl.billShow);
router.get('/bills',        AuthsCtrl.tokenVerify, BillsCtrl.billIndex);
router.post('/bills',       AuthsCtrl.tokenVerify, BillsCtrl.billCreate);
router.put('/bills/:id',    AuthsCtrl.tokenVerify, BillsCtrl.billUpdate);
router.delete('/bills/:id', AuthsCtrl.tokenVerify, BillsCtrl.billDelete);

module.exports = router;
