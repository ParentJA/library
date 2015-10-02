(function (window, angular, undefined) {

  "use strict";

  function authorsService(BooksModel) {
    var selectedAuthor = {};

    var service = {
      getAuthors: getAuthors,
      getSelectedAuthor: getSelectedAuthor,
      hasAuthors: hasAuthors,
      isSelectedAuthor: isSelectedAuthor,
      setSelectedAuthor: setSelectedAuthor
    };

    function getAuthors() {
      return BooksModel.getAuthors();
    }

    function getSelectedAuthor() {
      return selectedAuthor;
    }

    function hasAuthors() {
      return !_.isEmpty(BooksModel.getAuthors());
    }

    function isSelectedAuthor(author) {
      return (selectedAuthor === author);
    }

    function setSelectedAuthor(author) {
      selectedAuthor = author;
    }

    return service;
  }

  angular.module("app")
    .factory("authorsService", ["BooksModel", authorsService]);

})(window, window.angular);