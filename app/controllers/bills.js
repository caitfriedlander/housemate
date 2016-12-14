// Require the model/s you're controlling
var Bill = require("../models/bill");

//||||||||||||||||||||||||||--
//  GET BILL
//||||||||||||||||||||||||||--
var billShow = function(req, res, next){
  var id = req.params.id;

  Bill.findById(id, function(err, bill){
    if (err) {
      res.send(err);
    }

    // return that bill as JSON
    res.json(bill);
  });
};

//||||||||||||||||||||||||||--
// GET BILLS
//||||||||||||||||||||||||||--
var billIndex = function(req, res) {
  Bill.find({}, function(err, bills) {
    if (err) {
      res.send(err);
    }

    // return the bills
    res.json(bills);
  });
}

//||||||||||||||||||||||||||--
// CREATE BILL
//||||||||||||||||||||||||||--
var billCreate = function(req, res) {
  var bill       = new Bill();   // create a new instance of the Bill model

  console.log("=========================");
  console.log("POST BILL", req.body);
  console.log("=========================");

  bill.name      = req.body.name;
  bill.amount    = req.body.amount;
  bill.date      = req.body.date;
  bill.category  = req.body.category;
  bill.household = req.body.household;

  bill.save(function(err, savedBill) {
    if (err) {
      res.send(err)
    }

    savedBill.populate('household').exec(function(err, billNHouse) {
      if (err) res.json(err);
      // return the bill
      res.json(billNHouse);
    })
  });
};

//||||||||||||||||||||||||||--
// UPDATE BILL
//||||||||||||||||||||||||||--
var billUpdate = function(req, res) {
  var id = req.params.id;

  Bill.findById(id, function(err, bill) {

    if (err) {
      res.send(err);
    }

    // set the new bill information if it exists in the request
    if (req.body.name) bill.name = req.body.name;
    if (req.body.amount) bill.amount = req.body.amount;
    if (req.body.date) bill.date = req.body.date;
    if (req.body.category) bill.category = req.body.category;

    // save the bill
    bill.save(function(err, updatedBill) {
      if (err) {
        res.send(err);
      }
      // log a message
      console.log("Bill updated");
      // return the bill
      res.json(updatedBill);
    });
  });
}

//||||||||||||||||||||||||||--
// DELETE BILL
//||||||||||||||||||||||||||--
var billDelete = function(req, res) {

  var id = req.params.id;

  Bill.remove({"_id" : id}, function(err) {
    if (err) {
      res.send(err);
    }

    res.json({ message: 'Bill removed!' });
  });
}

// Export the function/s as JSON
module.exports = {
  billShow:   billShow,
  billIndex:  billIndex,
  billCreate: billCreate,
  billUpdate: billUpdate,
  billDelete: billDelete
}
