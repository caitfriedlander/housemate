(function() {
  "use strict";

  angular
      .module("housemateApp")
      .controller('UsersController', UsersController);

  UsersController.$inject = ['$state', 'authService', 'userDataService', 'householdDataService', '$log', 'authToken', '$http'];

  function UsersController($state, authService, userDataService, householdDataService, $log, authToken, $http) {
    var vm = this;

    if (!householdDataService.household.code) {
      userDataService.get(userDataService.user._id)
        .then(function(response) {
          householdDataService.household = response.data.household;
          vm.household = householdDataService.household;
          return vm.household;
        }, function(errRes) {
          console.error('Error catching household!', errRes);
        }).then(function(household) {
          getUsers();
        }, function(err) {
          console.error(err);
        });
    } else {
      vm.household = householdDataService.household;
      getUsers();
    }

    vm.currentUser = userDataService.user;

    // vm.createUser = createUser;
    vm.getUsers = getUsers;

    // defining function declarations
    // function createUser() {
    //   vm.message = '';
    //   // use the create function in the userService
    //   userDataService.create(vm.userData)
    //     .then(function(data) {
    //       vm.userData = {};
    //       vm.message = data.data.message;
    //       authToken.setToken(data.data.token);
    //       userDataService.user = data.data.user;
    //       $state.go('homePage');
    //     }, function(err) {
    //       $log.error(err);
    //       $state.go('homePage');
    //     });

    // };

    function getUsers() {
      $http.get('/api/households/?code=' + vm.household.code).then(function(response) {
        vm.users = response.data.household.users;
        }, function(errRes) {
          console.error('Error catching user!', errRes);
      });
    }
  };
})();
