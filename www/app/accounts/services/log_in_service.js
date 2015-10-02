(function (window, angular, undefined) {

  "use strict";

  function logInService(AccountsModel) {
    var service = {
      logIn: logIn
    };

    function logIn(email, password) {
      return $http.post("/log_in/", {
        email: email,
        password: password
      }).then(function (response) {
        AccountsModel.update(response.data);
      }, function () {
        console.error("Log in failed!");
      });
    }

    return service;
  }

  angular.module("app")
    .factory("logInService", ["AccountsModel", logInService]);

})(window, window.angular);