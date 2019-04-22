import * as angular from 'angular';

mdWindowsize.$inject = ['$window'];
export function mdWindowsize($window) {
  return function (scope, element) {
    var w = $window;
    scope.getWindowDimensions = function () {
      return {
        'h': w.innerHeight,
        'w': w.innerWidth
      };
    };
    scope.$watch(scope.getWindowDimensions, function (newValue, oldValue) {
      scope.windowHeight = newValue.h;
      scope.windowWidth = newValue.w;
    }, true);

    angular.element($window).bind('resize', function () {
      scope.$apply();
    });
  };
}
