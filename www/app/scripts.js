(function (window, angular, undefined) {

  "use strict";

  function HttpConfig($httpProvider) {
    $httpProvider.defaults.xsrfHeaderName = "X-CSRFToken";
    $httpProvider.defaults.xsrfCookieName = "csrftoken";
  }

  function UiRouterConfig($stateProvider, $urlRouterProvider) {
    $stateProvider
      .state("library", {
        url: "/library",
        template: "<div ui-view></div>",
        resolve: {
          books: function(booksService, loadBooksService) {
            if (!booksService.hasBooks()) {
              loadBooksService.getBooks();
            }

            return booksService.getBooks();
          },
          members: function(loadMembersService, membersService) {
            if (!membersService.hasMembers()) {
              loadMembersService.getMembers();
            }

            return membersService.getMembers();
          }
        },
        abstract: true
      });

    //Default state...
    $urlRouterProvider.otherwise("/");
  }

  function UiRunner($rootScope, $state) {
    $rootScope.$state = $state;
  }

  angular.module("app", ["ui.router"])
    .constant("BASE_URL", "/api/v1/")
    .config(["$httpProvider", HttpConfig])
    .config(["$stateProvider", "$urlRouterProvider", UiRouterConfig])
    .run(["$rootScope", "$state", UiRunner]);

})(window, window.angular);
(function (window, angular, undefined) {

  "use strict";

  function BooksRouterConfig($stateProvider) {
    $stateProvider.state("library.books", {
      url: "/books",
      templateUrl: "/static/books/views/books/books.html",
      controller: "BooksController"
    });
  }

  angular.module("app")
    .config(["$stateProvider", BooksRouterConfig]);

})(window, window.angular);
(function (window, angular, undefined) {

  "use strict";

  function HomeController($scope) {}

  function HomeRouterConfig($stateProvider) {
    $stateProvider.state("home", {
      url: "/",
      templateUrl: "/static/home/views/home/home.html",
      controller: "HomeController"
    });
  }

  angular.module("app")
    .controller("HomeController", ["$scope", HomeController])
    .config(["$stateProvider", HomeRouterConfig]);

})(window, window.angular);
(function (window, angular, undefined) {

  "use strict";

  function MembersController($scope) {

  }

  function MembersRouterConfig($stateProvider) {
    $stateProvider.state("library.members", {
      url: "/members",
      templateUrl: "/static/members/views/members/members.html",
      controller: "MembersController"
    });
  }

  angular.module("app")
    .controller("MembersController", ["$scope", MembersController])
    .config(["$stateProvider", MembersRouterConfig]);

})(window, window.angular);
(function (window, angular, undefined) {

  "use strict";

  function SettingsController($scope) {

  }

  function SettingsRouterConfig($stateProvider) {
    $stateProvider.state("settings", {
      url: "/settings",
      templateUrl: "/static/settings/views/settings/settings.html",
      controller: "SettingsController"
    });
  }

  angular.module("app")
    .controller("SettingsController", ["$scope", SettingsController])
    .config(["$stateProvider", SettingsRouterConfig]);

})(window, window.angular);
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
(function (window, angular, undefined) {

  "use strict";

  function join() {
    return function joinFilter(strings, separator) {
      separator = separator || ", ";

      return strings.join(separator);
    };
  }

  angular.module("app")
    .filter("join", [join]);

})(window, window.angular);
(function (window, angular, undefined) {

  "use strict";

  function MembersModel() {
    var members = [];

    var service = {
      getMembers: getMembers,
      update: update
    };

    function getMembers() {
      return members;
    }

    function update(data) {

    }

    return service;
  }

  angular.module("app")
    .factory("MembersModel", [MembersModel]);

})(window, window.angular);
(function (window, angular, undefined) {

  "use strict";

  function loadMembersService($http, BASE_URL, MembersModel) {
    var service = {
      getMembers: getMembers
    };

    function getMembers() {
      return $http.get(BASE_URL + "library/member/").then(function (response) {
        MembersModel.update(response.data);
      }, function () {
        console.error("Members failed to load!");
      });
    }

    return service;
  }

  angular.module("app")
    .factory("loadMembersService", ["$http", "BASE_URL", "MembersModel", loadMembersService]);

})(window, window.angular);
(function (window, angular, undefined) {

  "use strict";

  function membersService(MembersModel) {
    var selectedMember = {};

    var service = {
      getMembers: getMembers,
      getSelectedMember: getSelectedMember,
      hasMembers: hasMembers,
      isSelectedMember: isSelectedMember,
      setSelectedMember: setSelectedMember
    };

    function getMembers() {
      return MembersModel.getMembers();
    }

    function getSelectedMember() {
      return selectedMember;
    }

    function hasMembers() {
      return !_.isEmpty(MembersModel.getMembers());
    }

    function isSelectedMember(member) {
      return (selectedMember === member);
    }

    function setSelectedMember(member) {
      selectedMember = member;
    }

    return service;
  }

  angular.module("app")
    .factory("membersService", ["MembersModel", membersService]);

})(window, window.angular);
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
(function (window, angular, undefined) {

  "use strict";

  angular.module("app");

})(window, window.angular);
(function (window, angular, undefined) {

  "use strict";

  angular.module("app");

})(window, window.angular);
(function (window, angular, undefined) {

  "use strict";

  angular.module("app");

})(window, window.angular);
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