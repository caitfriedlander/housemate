(function() {
  "use strict";

  angular
      .module("housemateApp")
      .controller("BillsController", BillsController);

  BillsController.$inject = ["$state", "householdDataService", "$log", "$http"];

  function BillsController($state, householdDataService, $log, $http) {
    var vm = this;

    vm.houshold = housholdDataService.houshold;

    vm.bills = [];

    vm.newBill = {
      name: "",
      amount: "",
      date: "",
      category: ""
    };

    vm.editBill = {
      name: "",
      amount: "",
      date: "",
      category: ""
    }

    vm.getBills     = getBills;
    vm.deleteBill    = deleteBill;
    vm.updateBill    = updateBill;
    vm.postBill      = postBill;
    vm.resetEditForm = resetEditForm;

    vm.getBills();

    function getBills() {
      $http.get('/api/bills').then(function(response) {
        vm.bills = response.data;
      }, function(errRes) {
        console.error('Error catching bill!', errRes);
      });
    }

    function deleteBill(id) {
      $http.delete('/api/bills/' + id).then(function(response) {
        console.log(response);
      }, function(errRes) {
        console.error('Error deleting bill!', errRes);
      }).then(getBills);
    }

    function postBill() {
      $http.post('/api/bills', vm.newBill)
        .then(getBills)
        .then(function(response) {
          vm.newBill = {
            name: "",
            amount: "",
            date: "",
            category: ""
          };
        });
    }

    function updateBill(id) {
      $http.put('/api/bills/' + id, vm.editBill).then(function(response) {
        vm.editBill = {
          name: "",
          amount: "",
          date: "",
          category: ""
        };
      }, function(errRes) {
        console.log('Error fixing bill!', errRes);
      }).then(getBills);
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
