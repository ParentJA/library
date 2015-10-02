(function (window, angular, undefined) {

  "use strict";

  function booksService(BooksModel) {
    var selectedBook = {};

    var service = {
      getBooks: getBooks,
      getSelectedBook: getSelectedBook,
      hasBooks: hasBooks,
      isSelectedBook: isSelectedBook,
      setSelectedBook: setSelectedBook
    };

    function getBooks() {
      return BooksModel.getBooks();
    }

    function getSelectedBook() {
      return selectedBook;
    }

    function hasBooks() {
      return !_.isEmpty(BooksModel.getBooks());
    }

    function isSelectedBook(book) {
      return (selectedBook === book);
    }

    function setSelectedBook(book) {
      selectedBook = book;
    }

    return service;
  }

  angular.module("app")
    .factory("booksService", ["BooksModel", booksService]);

})(window, window.angular);