(function() {
  "use strict";

  angular
      .module("housemateApp")
      .controller("CreateHouseholdsController", CreateHouseholdsController);

  CreateHouseholdsController.$inject = ["$state", "userDataService", "$log", "$http"];

  function CreateHouseholdsController($state, userDataService, $log, $http) {
    var vm = this;

    vm.user = userDataService.user;

    vm.household;

    vm.newHousehold = {
      address: '',
      landlord: {
        name: '',
        phoneNumber: '',
        email: '',
        address: '',
        website: ''
      },
      propertyManager: {
        name: '',
        phoneNumber: '',
        email: '',
        address: '',
        website: ''
      },
      maintenance: {
        name: '',
        phoneNumber: '',
        email: '',
        address: '',
        website: ''
      },
      code: ''
    };

    vm.postHousehold = postHousehold;

    function postHousehold() {
      vm.newHousehold.user = vm.user._id
      console.log(vm.newHousehold)
      $http.post('api/households', vm.newHousehold)
        .then(function(response) {
          vm.newHousehold = {
            address: '',
            landlord: {
              name: '',
              phoneNumber: '',
              email: '',
              address: '',
              website: ''
            },
            propertyManager: {
              name: '',
              phoneNumber: '',
              email: '',
              address: '',
              website: ''
            },
            maintenance: {
              name: '',
              phoneNumber: '',
              email: '',
              address: '',
              website: ''
            },
            code: '',
            users: []
          };
        $state.go('householdPage');
        });
    }
  }
})();
