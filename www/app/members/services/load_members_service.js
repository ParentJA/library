(function (window, angular, undefined) {

  "use strict";

  function loadMembersService($http, BASE_URL, MembersModel) {
    var service = {
      getMembers: getMembers
    };

    function getMembers() {
      return $http.get(BASE_URL + "library/member/").then(function (response) {
        MembersModel.update(response.data);
      }, function () {
        console.error("Members failed to load!");
      });
    }

    return service;
  }

  angular.module("app")
    .factory("loadMembersService", ["$http", "BASE_URL", "MembersModel", loadMembersService]);

})(window, window.angular);