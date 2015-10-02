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

  function BooksController($scope, booksService) {
    $scope.getBooks = function getBooks() {
      return booksService.getBooks();
    };
  }

  function BooksRouterConfig($stateProvider) {
    $stateProvider.state("library.books", {
      url: "/books",
      templateUrl: "/static/books/views/books/books.html",
      controller: "BooksController"
    });
  }

  angular.module("app")
    .controller("BooksController", ["$scope", "booksService", BooksController])
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

  angular.module("app");

})(window, window.angular);