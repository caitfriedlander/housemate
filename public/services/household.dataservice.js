(function() {
  "use strict";

  angular
    .module("housemateApp")
    .factory("householdDataService", householdDataService);

  householdDataService.$inject = ['$http'];

  function householdDataService($http) {
    var householdFactory = {
      household: {}
    };

    // get a single household
    householdFactory.get = function(id) {
      return $http.get('/api/households/' + id);
    };

    // get all households
    householdFactory.all = function() {
      return $http.get('/api/households/');
    };

    // create a household
    householdFactory.create = function(householdData) {
      return $http.post('/api/households/', householdData);
    };

    // update a household
    householdFactory.update = function(id, householdData) {
      return $http.put('/api/households/' + id, householdData);
    };

    // delete a household
    householdFactory.delete = function(id) {
      return $http.delete('/api/households/' + id);
    };

    // return our entire householdFactory object
    return householdFactory;
  }

})();
