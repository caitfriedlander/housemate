(function() {
  "use strict";

  angular
    .module("housemateApp")
    .config(AppRoutes);

  AppRoutes.$inject = ["$stateProvider", "$urlRouterProvider"];

  function AppRoutes($stateProvider, $urlRouterProvider) {
    $stateProvider
      .state("homePage", {
        url: "/",
        templateUrl: "/templates/home.html",
        controller: "LoginController",
        controllerAs: "vm"
      })
      .state("householdPage", {
        url: "/household",
        templateUrl:  "/templates/household.html",
        controller: "HouseholdsController",
        controllerAs: "vm"
      })
      .state("householdSignUpPage", {
        url: "/newhousehold",
        templateUrl:  "/templates/householdsignup.html",
        controller: "CreateHouseholdsController",
        controllerAs: "vm"
      })
      .state("register", {
        url: "/register",
        templateUrl: "/templates/register.html",
        controller: "CreateUserController",
        controllerAs: "vm"
      })
      .state("bills", {
        url: "/bills",
        templateUrl: "/templates/bills.html",
        controller: "BillsController",
        controllerAs: "vm"
      })
      .state("housematesPage", {
        url: "/housemates",
        templateUrl: "/templates/housemates.html",
        controller: "UsersController",
        controllerAs: "vm"
      });
    $urlRouterProvider.otherwise("/");
  }

})();
