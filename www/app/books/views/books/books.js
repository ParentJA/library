(function (window, angular, undefined) {

  "use strict";

  function BooksController($scope, booksService) {
    $scope.getBooks = function getBooks() {
      return booksService.getBooks();
    };
  }

  angular.module("app")
    .controller("BooksController", ["$scope", "booksService", BooksController]);

})(window, window.angular);