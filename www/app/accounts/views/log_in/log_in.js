(function (window, angular, undefined) {

  "use strict";

  function LogInController($scope) {
    $scope.email = "";
    $scope.form = "";
    $scope.password = "";

    $scope.onSubmit = function onSubmit() {

    };
  }

  angular.module("app")
    .controller("LogInController", ["$scope", LogInController]);

})(window, window.angular);