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
    household.users             = //look in req.decoded

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


//||||||||||||||||||||||||||--
// UPDATE HOUSEHOLD
//||||||||||||||||||||||||||--


//||||||||||||||||||||||||||--
// DELETE HOUSEHOLD
//||||||||||||||||||||||||||--


//||||||||||||||||||||||||||--
// EXPORT MODULE
//||||||||||||||||||||||||||--
module.exports = {
  householdCreate:   householdCreate
};
