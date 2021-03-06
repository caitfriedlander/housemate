(function() {

  angular.module("housemateApp")
         .factory('authService', authService);

  authService.$inject = ["$http", "$q", "authToken", "userDataService", "$state", "$window"];

  //||||||||||||||||||||||||||--
  // AUTH SERVICE FACTORY
  //||||||||||||||||||||||||||--
  function authService($http, $q, authToken, userDataService, $state, $window) {

    // create auth factory object
    var authFactory = {};

    // log a user in
    authFactory.login = function(email, password) {

      // return the promise object and its data
      return $http.post('/api/login', {
        email: email,
        password:    password
      })
        .success(function(data) {
          authToken.setToken(data.token);

          // set userDataService.user to the logged in user
          userDataService.user = data.user;
          console.log("Welcome", userDataService);
          return data;
        });
    };

    // log a user out by clearing the token
    authFactory.logout = function() {
      // clear the token
      authToken.setToken();

      // return to homepage
      $state.go('homePage');
    };

    // check if a user is logged in
    // checks if there is a local token
    authFactory.isLoggedIn = function() {
      if (authToken.getToken())
        return true;
      else
        return false;
    };

    // get the logged in user
    authFactory.setUser = function() {
      var token = authToken.getToken().split('.')[1];
      var user = JSON.parse($window.atob(token));
      userDataService.user = user;
      console.log(user);
      return user;
    };

    // return auth factory object
    return authFactory;
  }

})();
