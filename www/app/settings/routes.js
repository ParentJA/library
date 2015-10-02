(function (window, angular, undefined) {

  "use strict";

  function SettingsController($scope) {

  }

  function SettingsRouterConfig($stateProvider) {
    $stateProvider.state("settings", {
      url: "/settings",
      templateUrl: "/static/settings/views/settings/settings.html",
      controller: "SettingsController"
    });
  }

  angular.module("app")
    .controller("SettingsController", ["$scope", SettingsController])
    .config(["$stateProvider", SettingsRouterConfig]);

})(window, window.angular);