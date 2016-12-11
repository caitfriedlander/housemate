var _ = require('lodash');

var localEnvVars = {
  TITLE:      "Housemate Log",
  SAFE_TITLE: 'housemate_log',
  superSecret: "roommatesarehard"
};


// Merge all environmental variables into one object.
module.exports = _.extend(process.env, localEnvVars);
