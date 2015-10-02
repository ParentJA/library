(function (window, angular, undefined) {

  "use strict";

  function loadBooksService($http, BASE_URL, BooksModel) {
    var service = {
      getBooks: getBooks
    };

    function getBooks() {
      return $http.get(BASE_URL + "library/book/").then(function (response) {
        BooksModel.update(response.data);
      }, function () {
        console.error("Books failed to load!");
      });
    }

    return service;
  }

  angular.module("app")
    .factory("loadBooksService", ["$http", "BASE_URL", "BooksModel", loadBooksService]);

})(window, window.angular);