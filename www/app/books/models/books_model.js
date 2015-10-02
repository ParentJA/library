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
      _.forEach(data.books, function (book) {
        book._authors = [];

        _.forEach(book.authors, function (authorId) {
          book._authors.push(_.find(data.authors, "id", authorId));
        });

        book._categories = [];

        _.forEach(book.categories, function (categoryId) {
          book._categories.push(_.find(data.categories, "id", categoryId));
        });
      });

      books = data.books;
    }

    return service;
  }

  angular.module("app")
    .factory("BooksModel", [BooksModel]);

})(window, window.angular);