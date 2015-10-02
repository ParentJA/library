(function (window, angular, undefined) {

  "use strict";

  function BookController($scope) {
    $scope.authors = _.map($scope.book._authors, function (author) {
      return _.template("${author.first_name} ${author.last_name}")({
        author: author
      });
    });
  }

  function book() {
    return {
      restrict: "A",
      scope: {
        book: "="
      },
      templateUrl: "/static/books/views/books/components/book/book.html",
      controller: "BookController"
    };
  }

  angular.module("app")
    .controller("BookController", ["$scope", BookController])
    .directive("book", [book]);

})(window, window.angular);