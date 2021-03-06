(function() {
  "use strict";

  angular
    .module("housemateApp")
    .controller("LoginController", LoginController);

  LoginController.$inject = ["$state", "userDataService", "$log", "authService"];

  function LoginController($state, userDataService, $log, authService) {
    var vm = this;

    vm.login      = login;
    vm.isLoggedIn = authService.isLoggedIn;
    vm.currentUser = userDataService.user;

    // Form data for login
    vm.loginData;

    function login() {
      authService.login(vm.loginData.email, vm.loginData.password)
        .then(function(res) {
          $log.log(res.data);
          if (res.user) {
            $state.go('householdPage');
          }
        });
    };

  }

})();
