(function (window, angular, undefined) {

  "use strict";

  function BooksController($scope, booksService) {
    $scope.getBooks = function getBooks() {
      return booksService.getBooks();
    };
  }

  function BooksRouterConfig($stateProvider) {
    $stateProvider.state("library.books", {
      url: "/books",
      templateUrl: "/static/books/views/books/books.html",
      controller: "BooksController"
    });
  }

  angular.module("app")
    .controller("BooksController", ["$scope", "booksService", BooksController])
    .config(["$stateProvider", BooksRouterConfig]);

})(window, window.angular);