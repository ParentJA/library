(function (window, angular, undefined) {

  "use strict";

  function logOutService(AccountsModel) {
    var service = {
      logOut: logOut
    };

    function logOut() {
      return $http.get("/log_out/").then(function (response) {
        AccountsModel.update(response.data);
      }, function () {
        console.error("Log out failed!");
      });
    }

    return service;
  }

  angular.module("app")
    .factory("logOutService", ["AccountsModel", logOutService]);

})(window, window.angular);