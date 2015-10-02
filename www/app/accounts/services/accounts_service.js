(function (window, angular, undefined) {

  "use strict";

  function accountsService(AccountsModel) {
    var service = {};

    return service;
  }

  angular.module("app")
    .factory("accountsService", ["AccountsModel", accountsService]);

})(window, window.angular);