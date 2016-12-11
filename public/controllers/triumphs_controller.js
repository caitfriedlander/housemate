(function() {
  "use strict";

  angular
      .module("housemateApp")
      .controller("TriumphsController", TriumphsController);

  TriumphsController.$inject = ["$state", "userDataService", "$log", "$http"];

  function TriumphsController($state, userDataService, $log, $http) {
    var vm = this;

    vm.user = userDataService.user;

    vm.bills = [];

    vm.newBill = {
      name: "",
      amount: "",
      category: ""
    };

    vm.editBill = {
      name: "",
      amount: "",
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
        console.error('Error catchin bill!', errRes);
      });
    }

    function deleteBill(id) {
      $http.delete('/api/bills/' + id).then(function(response) {
        console.log(response);
      }, function(errRes) {
        console.error('Error deletin bill!', errRes);
      }).then(getBills);
    }

    function postBill() {
      $http.post('/api/bills', vm.newBill)
        .then(getBills)
        .then(function(response) {
          vm.newBill = {
            name: "",
            amount: "",
            category: ""
          };
        });
    }

    function updateBill(id) {
      $http.put('/api/bills/' + id, vm.editBill).then(function(response) {
        vm.editBill = {
          name: "",
          amount: "",
          category: ""
        };
      }, function(errRes) {
        console.log('Error fixin bill!', errRes);
      }).then(getBills);
    }

    function resetEditForm() {
      vm.billCategory = '';
      vm.billName = '';
      vm.editBill = {
        name: "",
        amount: "",
        category: ""
      };
    }

  }

})();
