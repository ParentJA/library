(function (window, angular, undefined) {

  "use strict";

  function BooksModel() {
    var books = [];

    var service = {
      getBooks: getBooks,
      update: update
    };

    function getBooks() {
      return books;
    }

    function update(data) {

    }

    return service;
  }

  angular.module("app")
    .factory("BooksModel", [BooksModel]);

})(window, window.angular);