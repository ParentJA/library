(function (window, angular, undefined) {

  "use strict";

  function SettingsRouterConfig($stateProvider) {
    $stateProvider.state("settings", {
      url: "/settings",
      templateUrl: "/static/settings/views/settings/settings.html",
      controller: "SettingsController"
    });
  }

  angular.module("app")
    .config(["$stateProvider", SettingsRouterConfig]);

})(window, window.angular);