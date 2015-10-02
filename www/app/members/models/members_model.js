(function (window, angular, undefined) {

  "use strict";

  function MembersModel() {
    var members = [];

    var service = {
      getMembers: getMembers,
      update: update
    };

    function getMembers() {
      return members;
    }

    function update(data) {

    }

    return service;
  }

  angular.module("app")
    .factory("MembersModel", [MembersModel]);

})(window, window.angular);