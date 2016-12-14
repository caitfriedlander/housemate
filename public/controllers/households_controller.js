(function() {
  "use strict";

  angular
      .module("housemateApp")
      .controller("HouseholdsController", HouseholdsController);

  HouseholdsController.$inject = ["$state", "userDataService", "$log", "$http"];

  function HouseholdsController($state, userDataService, $log, $http) {
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
      code: '',
      users: []
    };

    vm.editHousehold = {
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

    vm.getHouseholds      = getHouseholds;
    vm.deleteHousehold    = deleteHousehold;
    vm.updateHousehold    = updateHousehold;
    vm.postHousehold      = postHousehold;
    vm.resetEditForm      = resetEditForm;

    vm.getHouseholds();

    function getHouseholds() {
      userDataService.get(userDataService.user._id)
        .then(function(response) {
          vm.household = response.data.household;
        }, function(errRes) {
          console.error('Error catching household!', errRes);
        });
    }

    function deleteHousehold(id) {
      $http.delete('/api/households/' + id).then(function(response) {
        console.log(response);
      }, function(errRes) {
        console.error('Error deleting household!', errRes);
      }).then(getHouseholds);
    }

    function postHousehold() {
      $http.post('/api/households', vm.newHousehold)
        .then(getHouseholds)
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
        });
    }

    function updateHousehold(id) {
      $http.put('/api/households/' + id, vm.editHousehold).then(function(response) {
        vm.editHousehold = {
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
          }
        };
      }, function(errRes) {
        console.log('Error fixing household!', errRes);
      }).then(getHouseholds);
    }

    function resetEditForm() {
      vm.householdAddress = '';
      vm.householdLandlord.name = '';
      vm.householdLandlord.phoneNumber = '';
      vm.householdLandlord.email = '';
      vm.householdLandlord.address = '';
      vm.householdLandlord.website = '';
      vm.householdPropertyManager.name = '';
      vm.householdPropertyManager.phoneNumber = '';
      vm.householdPropertyManager.email = '';
      vm.householdPropertyManager.address = '';
      vm.householdPropertyManager.website = '';
      vm.householdMaintenance.name = '';
      vm.householdMaintenance.phoneNumber = '';
      vm.householdMaintenance.email = '';
      vm.householdMaintenance.address = '';
      vm.householdMaintenance.website = '';
      vm.householdAmount = '';
      vm.editHousehold = {
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
    }

  }

})();
