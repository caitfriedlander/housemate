(function() {
  "use strict";

  angular
      .module("housemateApp")
      .controller('UsersController', UsersController);

  UsersController.$inject = ['$state', 'authService', 'userDataService', 'householdDataService', '$log', 'authToken', '$http'];

  function UsersController($state, authService, userDataService, householdDataService, $log, authToken, $http) {
    var vm = this;

    // if (!householdDataService.household.code && userDataService.user._id) {
    //   userDataService.get(userDataService.user._id)
    //     .then(function(response) {
    //       householdDataService.household = response.data.household;
    //       vm.household = householdDataService.household;
    //       return vm.household;
    //     }, function(errRes) {
    //       console.error('Error catching household!', errRes);
    //     }).then(function(household) {
    //       getUsers();
    //     }, function(err) {
    //       console.error(err);
    //     });
    // } else {
    //   vm.household = householdDataService.household;
    //   getUsers();
    // }

    vm.currentUser = userDataService.user;

    // vm.createUser = createUser;
    vm.getUsers = getUsers;
    vm.updateUser = updateUser;

    vm.editUser = {
      firstName: '',
      lastName: '',
      email: '',
      phoneNumber: ''
    };

    function updateUser(id) {
      $http.put('/api/users/' + id, vm.editUser).then(function(response) {
        vm.editUser = {
          firstName: '',
          lastName: '',
          email: '',
          phoneNumber: ''
          }
      }, function(errRes) {
        console.log('Error fixing user!', errRes);
      }).then(getUsers);
    }

    vm.getUsers()
    function getUsers() {
      householdDataService.mine()
      .then(function(response) {
        console.log(response)
        vm.user = response.data.users;
        }, function(errRes) {
          console.error('Error catching user!', errRes);
      });
    }
  }
})();
