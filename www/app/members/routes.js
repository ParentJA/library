(function (window, angular, undefined) {

  "use strict";

  function MembersController($scope) {

  }

  function MembersRouterConfig($stateProvider) {
    $stateProvider.state("library.members", {
      url: "/members",
      templateUrl: "/static/members/views/members/members.html",
      controller: "MembersController"
    });
  }

  angular.module("app")
    .controller("MembersController", ["$scope", MembersController])
    .config(["$stateProvider", MembersRouterConfig]);

})(window, window.angular);