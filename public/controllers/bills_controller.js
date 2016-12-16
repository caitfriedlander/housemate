(function() {
  "use strict";

  angular
      .module("housemateApp")
      .controller("BillsController", BillsController);

  BillsController.$inject = ["$state", "userDataService", "householdDataService", "$log", "$http"];

  function BillsController($state, userDataService, householdDataService, $log, $http) {
    var vm = this;

    // if (!householdDataService.household.code) {
    //   userDataService.get(userDataService.user._id)
    //     .then(function(response) {
    //       householdDataService.household = response.data.household;
    //       vm.household = householdDataService.household;
    //       return vm.household;
    //     }, function(errRes) {
    //       console.error('Error catching household!', errRes);
    //     }).then(function(household) {
    //       getBills();
    //     }, function(err) {
    //       console.error(err);
    //     });
    // } else {
    //   vm.household = householdDataService.household;
    //   getBills();
    // }

    vm.bills = [];

    vm.newBill = {
      name: "",
      amount: "",
      date: "",
      category: "",
      household: vm.household
    };

    vm.editBill = {
      name: "",
      amount: "",
      date: "",
      category: ""
    }

    vm.getBills      = getBills;
    vm.deleteBill    = deleteBill;
    vm.updateBill    = updateBill;
    vm.postBill      = postBill;
    vm.resetEditForm = resetEditForm;

    vm.getBills();

    function getBills() {
      householdDataService.mine()
        .then(function(response) {
        console.log(response);
        vm.bill = response.data.bills
      }, function(err) {
        console.error(err);
      })
    }

    function deleteBill(id) {
      $http.delete('/api/bills/' + id).then(function(response) {
        console.log(response);
      }, function(errRes) {
        console.error('Error deleting bill!', errRes);
      }).then(getBills);
    }

    function postBill() {
      vm.newBill.household = householdDataService.mine();
      $http.post('/api/bills', vm.newBill)
        .then(function(response) {
          vm.bills.push(vm.newBill);
          vm.newBill = {
            name: "",
            amount: "",
            date: "",
            category: "",
            household: vm.household
          };
        });
    }

    function updateBill(id) {
      $http.put('/api/bills/' + id, vm.editBill).then(function(response) {
        console.log(response)
        vm.editBill = {
          name: response.data.name,
          amount: response.data.amount,
          date: response.data.date,
          category: response.data.category
        };
      }, function(errRes) {
        console.log('Error fixing bill!', errRes);
      });
    }

    function resetEditForm() {
      vm.billCategory = '';
      vm.billName = '';
      vm.billAmount = '';
      vm.editBill = {
        name: "",
        amount: "",
        date: "",
        category: ""
      };
    }

  }

})();
