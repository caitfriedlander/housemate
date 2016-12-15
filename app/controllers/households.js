var Household   = require('../models/household')
var User       = require('../models/user')

//||||||||||||||||||||||||||--
// CREATE HOUSEHOLD
//||||||||||||||||||||||||||--
var householdCreate = function(req, res) {
    var household                         = new Household();   // create a new instance of the Household model
    household.landlord                    = {}
    household.propertyManager             = {}
    household.maintenance                 = {}
    household.address                                                               = req.body.address;
    if (req.body.landlord) household.landlord = req.body.landlord;
    if (req.body.propertyManager) household.propertyManager  = req.body.propertyManager;
    if (req.body.maintenance) household.maintenance                     = req.body.maintenance;
    household.code                                       = Math.random().toString(36).substring(2,9);
    household.users.push(req.body.user);
    // household.bills                       = [];
    household.save(function(err, newHousehold) {
        if (err) {
          return res.json(err);
        } else {
          res.json({
            household: newHousehold,
            message: "New household created!"
          })
        }
    });

};

//||||||||||||||||||||||||||--
// GET HOUSEHOLD
//||||||||||||||||||||||||||--

// get the user id from the token
// get the household for that user id - You may have to look up a custom mongoose query
// res.json that household
var householdShow = function(req, res, next){
  var id = req.params.id;
  // var user = req.token.user.id;

  Household.findById(id, function(err, bill){
    if (err) {
      res.send(err);
    }
    // var myhouse = household.id where id ===
    // return that bill as JSON
    res.json(household);
  });
};

//||||||||||||||||||||||||||--
// GET HOUSEHOLDS
//||||||||||||||||||||||||||--
var householdIndex = function(req, res, next) {
  if (req.query.code){
    Household.find({code: req.query.code}).populate('users').exec(function(err, household) {
      if (err) {
        res.send(err);
      }
      household[0].bills(function(err, bills) {
        if (err) return res.json(err);

        console.log(bills);
        res.json({success: true, household: household[0], bills: bills})
      })
    })
  } else {
    Household.find({}, function(err, households) {
      if (err) {
        res.send(err);
      }
      res.json(households)
    })
  }
}




//||||||||||||||||||||||||||--
// UPDATE HOUSEHOLD
//||||||||||||||||||||||||||--
var householdUpdate = function(req, res) {
  var id = req.params.id;

  Household.findById(id, function(err, household) {

    if (err) {
      res.send(err);
    }

    // set the new household information if it exists in the request
    if (req.body.address) household.address = req.body.address;
    if (req.body.landlord.name) household.landlord.name = req.body.landlord.name;
    if (req.body.landlord.phoneNumber) household.landlord.phoneNumber = req.body.landlord.phoneNumber;
    if (req.body.landlord.address) household.landlord.address = req.body.landlord.address;
    if (req.body.landlord.email) household.landlord.email = req.body.landlord.email;
    if (req.body.landlord.website) household.landlord.website = req.body.landlord.website;
    if (req.body.propertyManager.name) household.propertyManager.name = req.body.propertyManager.name;
    if (req.body.propertyManager.phoneNumber) household.propertyManager.phoneNumber = req.body.propertyManager.phoneNumber;
    if (req.body.propertyManager.address) household.propertyManager.address = req.body.propertyManager.address;
    if (req.body.propertyManager.email) household.propertyManager.email = req.body.propertyManager.email;
    if (req.body.propertyManager.website) household.propertyManager.website = req.body.propertyManager.website;
    if (req.body.maintenance.name) household.maintenance.name = req.body.maintenance.name;
    if (req.body.maintenance.phoneNumber) household.maintenance.phoneNumber = req.body.maintenance.phoneNumber;
    if (req.body.maintenance.address) household.maintenance.address = req.body.maintenance.address;
    if (req.body.maintenance.email) household.maintenance.email = req.body.maintenance.email;
    if (req.body.maintenance.website) household.maintenance.website = req.body.maintenance.website;
    if (req.body.user) household.users.push(req.body.user);

    // save the household
    household.save(function(err, updatedHousehold) {
      if (err) {
        res.send(err);
      }
      // log a message
      console.log("Household updated");
      // return the household
      res.json(updatedHousehold);
    });
  });
}

//||||||||||||||||||||||||||--
// DELETE HOUSEHOLD
//||||||||||||||||||||||||||--
var householdDelete = function(req, res) {

  var id = req.params.id;

  Household.remove({"_id" : id}, function(err) {
    if (err) {
      res.send(err);
    }

    res.json({ message: 'Household removed!' });
  });
}

//||||||||||||||||||||||||||--
// EXPORT MODULE
//||||||||||||||||||||||||||--
module.exports = {
  householdCreate:   householdCreate,
  householdShow:     householdShow,
  householdUpdate:   householdUpdate,
  householdDelete:   householdDelete,
  householdIndex:    householdIndex
};
