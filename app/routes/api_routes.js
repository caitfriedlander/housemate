var express = require('express'),
    router = express.Router();

// Require bills controller
var BillsCtrl = require('../controllers/bills'),
    UsersCtrl  = require('../controllers/users'),
    AuthsCtrl  = require('../controllers/auths'),
    HouseholdCtrl = require('../controllers/households');



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
router.get('/users/:id',     UsersCtrl.userShow);
router.put('/users/:id',     AuthsCtrl.tokenVerify, UsersCtrl.userUpdate);
router.delete('/users/:id',  AuthsCtrl.tokenVerify, UsersCtrl.userDelete);

//||||||||||||||||||||||||||--
// BILLS CRUD SERVICES
//||||||||||||||||||||||||||--
router.get('/bills/:id',    AuthsCtrl.tokenVerify, BillsCtrl.billShow);
router.get('/bills',        BillsCtrl.billIndex);
router.post('/bills',       BillsCtrl.billCreate);
router.put('/bills/:id',    AuthsCtrl.tokenVerify, BillsCtrl.billUpdate);
router.delete('/bills/:id', AuthsCtrl.tokenVerify, BillsCtrl.billDelete);

//||||||||||||||||||||||||||--
// HOUSEHOLD CRUD SERVICES
//||||||||||||||||||||||||||--
router.get('/households',         HouseholdCtrl.householdIndex);
router.post('/households',        HouseholdCtrl.householdCreate);
router.get('/myhousehold',        AuthsCtrl.tokenVerify, HouseholdCtrl.householdShow);
router.put('/households/',        HouseholdCtrl.householdUpdate);
router.delete('/households/:id',  HouseholdCtrl.householdDelete);

module.exports = router;
