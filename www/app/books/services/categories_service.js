(function (window, angular, undefined) {

  "use strict";

  function categoriesService(BooksModel) {
    var selectedCategory = {};

    var service = {
      getCategories: getCategories,
      getSelectedCategory: getSelectedCategory,
      hasCategories: hasCategories,
      isSelectedCategory: isSelectedCategory,
      setSelectedCategory: setSelectedCategory
    };

    function getCategories() {
      return BooksModel.getCategories();
    }

    function getSelectedCategory() {
      return selectedCategory;
    }

    function hasCategories() {
      return !_.isEmpty(BooksModel.getCategories());
    }

    function isSelectedCategory(book) {
      return (selectedCategory === book);
    }

    function setSelectedCategory(book) {
      selectedCategory = book;
    }

    return service;
  }

  angular.module("app")
    .factory("categoriesService", ["BooksModel", categoriesService]);

})(window, window.angular);