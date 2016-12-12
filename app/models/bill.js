// Require mongoose to create a model.
var mongoose = require('mongoose'),
    User     = require('./user.js');

// Create a schema of your model
var billSchema = new mongoose.Schema({
  name:       String,
  amount:     String,
  category:   String,
  user:       { type: mongoose.Schema.Types.ObjectId, ref:'User' }
});

// Create the model using your schema.
var Bill = mongoose.model('Bill', billSchema);

// Export the model of the Bill.
module.exports = Bill;