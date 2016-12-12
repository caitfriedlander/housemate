var mongoose = require('./database');

var Bill = require('../models/bill'),
    User = require('../models/user');

var users = [
  { // 0
    firstName: "Earl",
    lastName: "Url",
    email: "abc@123.com",
    phoneNumber: "4442831923",
    password: "fr1ensh1pw1ns"
  },
  { // 1
    firstName: "Mary",
    lastName: "Funnelcake",
    email: "abcd@123.com",
    phoneNumber: "3235558743",
    password: "tuberculos1s"
  },
  { // 2
    firstName: "Ayn Rand",
    lastName: "Paul Walker",
    email: "abcde@123.com",
    phoneNumber: "1001011101",
    password: "objecteav8ism"
  },
  { // 3
    firstName: "Dude",
    lastName: "McDude",
    email: "abcdef@123.com",
    phoneNumber: "5554445555",
    password: "abc123"
  }
];

// remove any fish or users in the database
Bill.remove({}, function(err) {
  if (err) console.log(err);

  User.remove({}, function(err) {
    if (err) console.log(err);

    // create users
    User.create(users, function(err, users) {

      var bills = [
        { // 0
          name: "Cable",
          category:  "Utility",
          user: users[0]._id
        },
        { // 1
          name: "December Rent",
          category:  "Rent",
          user: users[1]._id
        },
        { // 2
          name: "Netflix",
          category: "Streaming Service",
          user: users[0]._id
        },
        { // 3
          name: "Water/Trash",
          category: "Utility",
          user: users[3]._id
        },
        { // 4
          name: "Power",
          category: "Utility",
          user: users[2]._id
        }
      ];

      // create default bills
      Bill.create(bills, function(err, bills) {

        if (err) {
          console.log(err);
        } else{
          console.log(`Database seeded with ${users.length} users and ${bills.length} bills`);

          // disconnect db
          mongoose.connection.close(function(err) {
            if (err) console.log(err);
            process.exit(0);
          });
        }
        process.exit();
      });
    });
  });
});
