// Require mongoose to create a model.
var mongoose = require('mongoose'),
    Household     = require('./household.js');

// Create a schema of your model
var billSchema = new mongoose.Schema({
  name:       { type: String, required: true },
  amount:     { type: Number, required: true },
  date:       { type: String, required: true },
  category:   { type: String, required: true },
  household:  { type: mongoose.Schema.Types.ObjectId, ref:'Household' }
});

// Create the model using your schema.
var Bill = mongoose.model('Bill', billSchema);

// Export the model of the Bill.
module.exports = Bill;
