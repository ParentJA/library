(function (window, angular, undefined) {

  "use strict";

  function signUpService(AccountsModel) {
    var service = {
      signUp: signUp
    };

    function signUp(firstName, lastName, email, password) {
      return $http.post("/sign_up/", {
        first_name: firstName,
        last_name: lastName,
        email: email,
        password: password
      }).then(function (response) {
        AccountsModel.update(response.data);
      }, function () {
        console.error("Sign up failed!");
      });
    }

    return service;
  }

  angular.module("app")
    .factory("signUpService", ["AccountsModel", signUpService]);

})(window, window.angular);