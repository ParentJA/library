(function (window, angular, undefined) {

  "use strict";

  function HttpConfig($httpProvider) {
    $httpProvider.defaults.xsrfHeaderName = "X-CSRFToken";
    $httpProvider.defaults.xsrfCookieName = "csrftoken";
  }

  function UiRouterConfig($stateProvider, $urlRouterProvider) {
    $stateProvider
      .state("library", {
        url: "/library",
        template: "<div ui-view></div>",
        resolve: {
          books: function(booksService, loadBooksService) {
            console.log("Has books: %s", booksService.hasBooks());
            if (!booksService.hasBooks()) {
              loadBooksService.getBooks();
            }

            return booksService.getBooks();
          },
          members: function(loadMembersService, membersService) {
            if (!membersService.hasMembers()) {
              loadMembersService.getMembers();
            }

            return membersService.getMembers();
          }
        },
        abstract: true
      });

    //Default state...
    $urlRouterProvider.otherwise("/");
  }

  function UiRunner($rootScope, $state) {
    $rootScope.$state = $state;
  }

  angular.module("app", ["ui.router"])
    .constant("BASE_URL", "/api/v1/")
    .config(["$httpProvider", HttpConfig])
    .config(["$stateProvider", "$urlRouterProvider", UiRouterConfig])
    .run(["$rootScope", "$state", UiRunner]);

})(window, window.angular);