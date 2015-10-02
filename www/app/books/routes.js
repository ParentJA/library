(function (window, angular, undefined) {

  "use strict";

  function BooksRouterConfig($stateProvider) {
    $stateProvider.state("library.books", {
      url: "/books",
      templateUrl: "/static/books/views/books/books.html",
      controller: "BooksController"
    });
  }

  angular.module("app")
    .config(["$stateProvider", BooksRouterConfig]);

})(window, window.angular);