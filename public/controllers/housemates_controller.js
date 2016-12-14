(function() {
  angular.module("housemateApp")
         .controller('HousematesController', HousematesController);

  HousematesController.$inject = ['$state', 'authService', 'userDataService', 'householdDataService', '$log', 'authToken'];

  function HousematesController($state, authService, userDataService, householdDataService, $log, authToken) {
    var vm = this;

    vm.currentUser = userDataService.user;
    // attaching functions to controller
    vm.getUsers = getUsers;
    vm.getUsers()


    function getUsers() {
      userDataService.get(userDataService.user._id)
        .then(function(response) {
          vm.user = response.data.user;
          console.log(vm.user)
        }, function(errRes) {
          console.error('Error catching user!', errRes);
      });
    }
  };
})();
