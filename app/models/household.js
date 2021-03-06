// Require mongoose to create a model.
var mongoose = require('mongoose'),
    User     = require('./user.js'),
    Bill     = require('./bill.js');

var managementSchema = new mongoose.Schema({
  name: String,
  phoneNumber: String,
  email: String,
  address: String,
  website: String
})

// Create a schema of your model
var householdSchema = new mongoose.Schema({
  address:    { type: String, required: true },
  users:      [{ type: mongoose.Schema.Types.ObjectId, ref:'User' }],
  landlord:   managementSchema,
  propertyManager:  managementSchema,
  maintenance:  managementSchema,
  code:       { type: String, required: true }
});

//Access a household's fish
householdSchema.methods.bills = function(callback) {
  mongoose.model('Bill').find({ household: this._id }, function(err, bills) {
    callback(err, bills);
  })
}

// Create the model using your schema.
var Household = mongoose.model('Household', householdSchema);

// Export the model of the Household.
module.exports = Household;
