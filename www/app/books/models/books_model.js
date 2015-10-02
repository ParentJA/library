(function (window, angular, undefined) {

  "use strict";

  function BooksModel() {
    var authors = [];
    var books = [];
    var categories = [];

    var service = {
      getAuthors: getAuthors,
      getBooks: getBooks,
      getCategories: getCategories,
      update: update
    };

    function getAuthors() {
      return authors;
    }

    function getBooks() {
      return books;
    }

    function getCategories() {
      return categories;
    }

    function update(data) {
      authors = data.authors;
      categories = data.categories;

      // Update books with author and category objects...
      _.forEach(data.books, function (book) {
        book._authors = [];
        book._categories = [];

        _.forEach(book.authors, function (authorId) {
          book._authors.push(_.find(data.authors, "id", authorId));
        });

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