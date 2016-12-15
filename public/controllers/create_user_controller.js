(function() {
  "use strict";

  angular
      .module("housemateApp")
      .controller('CreateUserController', CreateUserController);

  CreateUserController.$inject = ['$state', 'authService', 'userDataService', 'householdDataService', '$log', 'authToken', '$http'];
  //pulled create user function out of user controller to make creation of a new user with or without a household possible.
  function CreateUserController($state, authService, userDataService, householdDataService, $log, authToken, $http) {
    var vm = this;

    vm.createUser = createUser;
    function createUser() {
      vm.message = '';
      // use the create function in the userService
      userDataService.create(vm.userData)
        .then(function(data) {
          vm.userData = {};
          vm.message = data.data.message;
          console.log(data);
          authToken.setToken(data.data.token);
          userDataService.user = data.data.user;
          $state.go('householdSignUpPage');
        }, function(err) {
          $log.error(err);
          $state.go('homePage');
        });
    };
  }
})();
