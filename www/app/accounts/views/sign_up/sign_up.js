(function (window, angular, undefined) {

  "use strict";

  function SignUpController($scope) {
    $scope.email = "";
    $scope.firstName = "";
    $scope.form = "";
    $scope.lastName = "";
    $scope.password1 = "";
    $scope.password2 = "";

    $scope.onSubmit = function onSubmit() {

    };
  }

  angular.module("app")
    .controller("SignUpController", ["$scope", SignUpController]);

})(window, window.angular);