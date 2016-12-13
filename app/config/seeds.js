var mongoose = require('./database');

var Bill = require('../models/bill'),
    User = require('../models/user'),
    Household = require('../models/household');


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
Household.remove({}, function(err) {
  if (err) console.log(err);

  User.remove({}, function(err) {
    if (err) console.log(err);

    // create users
    User.create(users, function(err, users) {
      var households = [
        { //0
          address: '123 Main St Apt 1 Los Angeles, CA 90000',
          landlord: {
            name: 'Steve Smith',
            phoneNumber: '1234567890',
            email: 'ss@abc.com',
            address: '1933 s braodway Los Angeles, CA 91602',
            website: 'abcproperty.com'
          },
          propertyManager: {
            name: 'Bob Hope',
            phoneNumber: '2345678901',
            email: 'bh@abc.com',
            address: '1933 s braodway Los Angeles, CA 91602',
            website: 'abcproperty.com'
          },
          maintenance: {
            name: 'Gordon Ramsey',
            phoneNumber: '3456789012',
            email: 'notgordonramsey@abc.com',
            address: '1933 s braodway Los Angeles, CA 91602',
            website: 'abcproperty.com'
          },
          code: 'qlocb34',
          users: []
        },{ //1
          address: '1 West St Apt 4 Arlington, VA 80000',
          landlord: {
            name: 'Sally Ward',
            phoneNumber: '4567890123',
            email: 'sw@abc.com',
            address: '369 Orange st Oragne Country, CA 70000',
            website: '123property.com'
          },
          propertyManager: {
            name: 'Danny Do',
            phoneNumber: '0987654321',
            email: 'dd@123.com',
            address: '',
            website: '123property.com'
          },
          maintenance: {
            name: 'Ollie Frank',
            phoneNumber: '9876543210',
            email: 'ollie@abc.com',
            address: '',
            website: '123property.com'
          },
          code: 'uf5bp9y',
          users: ''
        }
      ]

      // create default households
      Household.create(households, function(err, households) {

        if (err) {
          console.log(err);
        } else {
          Bills.remove({}, function(err, bills) {
            var bills = [
              { // 0
                name: "Cable",
                amount: 60,
                date: "1/1/17",
                category:  "Utility",
                user: users[0]._id
              },
              { // 1
                name: "December Rent",
                amount: 2000,
                date: "1/1/17",
                category:  "Rent",
                user: users[1]._id
              },
              { // 2
                name: "Netflix",
                amount: 10,
                date: "1/1/17",
                category: "Streaming Service",
                user: users[0]._id
              },
              { // 3
                name: "Water/Trash",
                amount: 100,
                date: "1/1/17",
                category: "Utility",
                user: users[3]._id
              },
              { // 4
                name: "Power",
                amount: 350,
                date: "1/1/17",
                category: "Utility",
                user: users[2]._id
              }
            ];
          })

          Bill.create(bills, function(err, bills) {
            if (err) {
              console.log(err);
            } else {
              console.log(`Database seeded with ${users.length} users, ${households.length} households, and ${bills.length} bills`);
            }
          })
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
