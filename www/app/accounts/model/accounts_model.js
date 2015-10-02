(function (window, angular, undefined) {

  "use strict";

  function AccountsModel() {
    var account = {};

    var service = {
      update: update
    };

    function update(data) {

    }

    return service;
  }

  angular.module("app")
    .factory("AccountsModel", [AccountsModel]);

})(window, window.angular);