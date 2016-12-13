var Household   = require('../models/household')

//||||||||||||||||||||||||||--
// CREATE HOUSEHOLD
//||||||||||||||||||||||||||--
var householdCreate = function(req, res) {
    var household               = new Household();   // create a new instance of the Household model
    household.address           = req.body.address;  // set the household address (comes from the request)
    household.landlord          = req.body.landlord;  // set the household lastName (comes from the request)
    household.propertyManager   = req.body.propertyManager; // set the household propertyManager (comes from the request)
    household.maintenance       = req.body.maintenance;  // set the household maintenance (comes from the request)
    household.code              = Math.random().toString(36).substring(2,9);
    household.users             = [];
    household.bills             = [];

    household.save(function(err, newUser) {
        if (err) {
          return res.json(err);
        } else {
          res.json({
            message: "New household created!"
          })
        }
    });

};

//||||||||||||||||||||||||||--
// GET HOUSEHOLD
//||||||||||||||||||||||||||--
var householdShow = function(req, res, next){
  var id = req.params.id;

  Household.findById(id, function(err, bill){
    if (err) {
      res.send(err);
    }

    // return that bill as JSON
    res.json(household);
  });
};

//||||||||||||||||||||||||||--
// GET HOUSEHOLDS
//||||||||||||||||||||||||||--
var householdIndex = function(req, res, next) {
  if (req.query.code){
    Household.find({code: req.query.code}, function(err, household) {
      if (err) {
        res.send(err);
      }
      res.json(household[0])
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
    if (req.body.landlord) household.landlord = req.body.landlord;
    if (req.body.propertyManager) household.propertyManager = req.body.propertyManager;
    if (req.body.maintenance) household.maintenance = req.body.maintenance;
    if (req.body.roommate) household.users.push(req.body.roommate);

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
