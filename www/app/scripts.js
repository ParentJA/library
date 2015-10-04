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

  function MainController($scope, accountsService) {
    $scope.getUser = function getUser() {
      return accountsService.getUser();
    };

    $scope.hasUser = function hasUser() {
      return accountsService.hasUser();
    };

    $scope.logOut = function logOut() {
      accountsService.logOut();
    };
  }

  angular.module("app", ["ngCookies", "ui.router"])
    .constant("BASE_URL", "/api/v1/")
    .config(["$httpProvider", HttpConfig])
    .config(["$stateProvider", "$urlRouterProvider", UiRouterConfig])
    .run(["$rootScope", "$state", UiRunner])
    .controller("MainController", ["$scope", "accountsService", MainController]);

})(window, window.angular);
(function (window, angular, undefined) {

  "use strict";

  function AccountsRouterConfig($stateProvider) {
    $stateProvider
      .state("sign_up", {
        url: "/sign_up",
        templateUrl: "/static/accounts/views/sign_up/sign_up.html",
        controller: "SignUpController"
      })
      .state("log_in", {
        url: "/log_in",
        templateUrl: "/static/accounts/views/log_in/log_in.html",
        controller: "LogInController"
      });
  }

  angular.module("app")
    .config(["$stateProvider", AccountsRouterConfig]);

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

  function HomeRouterConfig($stateProvider) {
    $stateProvider.state("home", {
      url: "/",
      templateUrl: "/static/home/views/home/home.html",
      controller: "HomeController"
    });
  }

  angular.module("app")
    .config(["$stateProvider", HomeRouterConfig]);

})(window, window.angular);
(function (window, angular, undefined) {

  "use strict";

  function ProfileRouterConfig($stateProvider) {
    $stateProvider.state("profile", {
      url: "/profile",
      templateUrl: "/static/profile/views/profile/profile.html",
      controller: "ProfileController"
    });
  }

  angular.module("app")
    .config(["$stateProvider", ProfileRouterConfig]);

})(window, window.angular);
(function (window, angular, undefined) {

  "use strict";

  function SettingsRouterConfig($stateProvider) {
    $stateProvider.state("settings", {
      url: "/settings",
      templateUrl: "/static/settings/views/settings/settings.html",
      controller: "SettingsController"
    });
  }

  angular.module("app")
    .config(["$stateProvider", SettingsRouterConfig]);

})(window, window.angular);
(function (window, angular, undefined) {

  "use strict";

  function AccountsModel($cookies) {
    var service = {
      clearUser: clearUser,
      getUser: getUser,
      hasUser: hasUser,
      setUser: setUser
    };

    function clearUser() {
      $cookies.remove("authenticatedUser");
    }

    function getUser() {
      if (!$cookies.get("authenticatedUser")) {
        return undefined;
      }

      return JSON.parse($cookies.get("authenticatedUser"));
    }

    function hasUser() {
      return !!$cookies.get("authenticatedUser");
    }

    function setUser(user) {
      $cookies.put("authenticatedUser", JSON.stringify(user));
    }

    return service;
  }

  angular.module("app")
    .factory("AccountsModel", ["$cookies", AccountsModel]);

})(window, window.angular);
(function (window, angular, undefined) {

  "use strict";

  function accountsService($http, AccountsModel) {
    var service = {
      getUser: getUser,
      hasUser: hasUser,
      logIn: logIn,
      logOut: logOut,
      signUp: signUp
    };

    function getUser() {
      return AccountsModel.getUser();
    }

    function hasUser() {
      return AccountsModel.hasUser();
    }

    function logIn(username, password) {
      return $http.post("/accounts/log_in/", {
        username: username,
        password: password
      }).then(function (response) {
        AccountsModel.setUser(response.data);
      });
    }

    function logOut() {
      return $http.post("/accounts/log_out/", {}).then(function (response) {
        AccountsModel.clearUser();
      }, function () {
        console.error("Log out failed!");
      });
    }

    function signUp(firstName, lastName, email, password) {
      return $http.post("/accounts/sign_up/", {
        first_name: firstName,
        last_name: lastName,
        username: email,
        email: email,
        password: password
      }).then(function () {
        return logIn(email, password);
      });
    }

    return service;
  }

  angular.module("app")
    .factory("accountsService", ["$http", "AccountsModel", accountsService]);

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

  function SignUpController($scope, $state, accountsService) {
    $scope.email = "";
    $scope.error = {};
    $scope.firstName = "";
    $scope.form = "";
    $scope.lastName = "";
    $scope.password1 = "";
    $scope.password2 = "";

    $scope.hasError = function hasError() {
      return !_.isEmpty($scope.error);
    };

    $scope.onSubmit = function onSubmit() {
      accountsService.signUp($scope.firstName, $scope.lastName, $scope.email, $scope.password1).then(function () {
        $state.go("home");
      }, function (response) {
        $scope.error = response.data;
        $scope.email = "";
        $scope.password1 = "";
        $scope.password2 = "";
      });
    };
  }

  angular.module("app")
    .controller("SignUpController", ["$scope", "$state", "accountsService", SignUpController]);

})(window, window.angular);
(function (window, angular, undefined) {

  "use strict";

  function LogInController($scope, $state, accountsService) {
    $scope.error = {};
    $scope.form = "";
    $scope.password = "";
    $scope.username = "";

    $scope.hasError = function hasError() {
      return !_.isEmpty($scope.error);
    };

    $scope.onSubmit = function onSubmit() {
      accountsService.logIn($scope.username, $scope.password).then(function () {
        $state.go("home");
      }, function (response) {
        $scope.error = response.data;
        $scope.password = "";
      });
    };
  }

  angular.module("app")
    .controller("LogInController", ["$scope", "$state", "accountsService", LogInController]);

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

  function HomeController($scope, accountsService) {
    $scope.hasUser = function hasUser() {
      return accountsService.hasUser();
    };
  }

  angular.module("app")
    .controller("HomeController", ["$scope", "accountsService", HomeController]);

})(window, window.angular);
(function (window, angular, undefined) {

  "use strict";

  function ProfileController($scope) {}

  angular.module("app")
    .controller("ProfileController", ["$scope", ProfileController]);

})(window, window.angular);
(function (window, angular, undefined) {

  "use strict";

  function SettingsController($scope) {}

  angular.module("app")
    .controller("SettingsController", ["$scope", SettingsController]);

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