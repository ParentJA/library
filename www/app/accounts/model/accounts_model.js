(function (window, angular, undefined) {

  "use strict";

  function AccountsModel($cookies) {
    var service = {
      clearUser: clearUser,
      getUser: getUser,
      hasUser: hasUser,
      setUser: setUser
    };

    function clearUser() {
      $cookies.remove("libAuthenticatedUser");
    }

    function getUser() {
      if (!$cookies.get("libAuthenticatedUser")) {
        return undefined;
      }

      return JSON.parse($cookies.get("libAuthenticatedUser"));
    }

    function hasUser() {
      return !!$cookies.get("libAuthenticatedUser");
    }

    function setUser(data) {
      $cookies.put("libAuthenticatedUser", JSON.stringify(data.user));
    }

    return service;
  }

  angular.module("app")
    .factory("AccountsModel", ["$cookies", AccountsModel]);

})(window, window.angular);