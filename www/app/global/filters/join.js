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