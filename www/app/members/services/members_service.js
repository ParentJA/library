(function (window, angular, undefined) {

  "use strict";

  function membersService(MembersModel) {
    var selectedMember = {};

    var service = {
      getMembers: getMembers,
      getSelectedMember: getSelectedMember,
      hasMembers: hasMembers,
      isSelectedMember: isSelectedMember,
      setSelectedMember: setSelectedMember
    };

    function getMembers() {
      return MembersModel.getMembers();
    }

    function getSelectedMember() {
      return selectedMember;
    }

    function hasMembers() {
      return !_.isEmpty(MembersModel.getMembers());
    }

    function isSelectedMember(member) {
      return (selectedMember === member);
    }

    function setSelectedMember(member) {
      selectedMember = member;
    }

    return service;
  }

  angular.module("app")
    .factory("membersService", ["MembersModel", membersService]);

})(window, window.angular);