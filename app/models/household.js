// Require mongoose to create a model.
var mongoose = require('mongoose'),
    User     = require('./user.js'),
    Bill     = require('./bill.js');

var managementSchema = new mongoose.Schema({
  name: { type: String, required: true },
  phoneNumber: {
    type: String,
    index: { unique: true },
    minlength: 7,
    maxlength: 15 },
  email: String,
  address: String,
  website: String
})

// Create a schema of your model
var householdSchema = new mongoose.Schema({
  address:    { type: String, required: true },
  bills:      [{ type: mongoose.Schema.Types.ObjectId, ref:'Bill' }],
  users:      [{ type: mongoose.Schema.Types.ObjectId, ref:'User' }],
  landlord:   managementSchema,
  propertyManager:  managementSchema,
  maintenance:  managementSchema,
  code:       { type: String, required: true }
});

// Create the model using your schema.
var Household = mongoose.model('Household', householdSchema);

// Export the model of the Household.
module.exports = Household;
