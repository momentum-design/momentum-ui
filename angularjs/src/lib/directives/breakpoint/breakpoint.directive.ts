import * as angular from 'angular';

export interface IBreakpointRootScopeService extends ng.IRootScopeService {
  breakpoint: string;
}

csBreakpoint.$inject = ['$window', '$rootScope'];
export function csBreakpoint($window, $rootScope) {
  let directive = {
    restrict: 'A',
    link: link,
  };

  function link(scope, element, attr) {
    $rootScope.breakpoint = '';
    scope.csBreakpoint = {
      class: '',
      windowSize: $window.innerWidth,
    }; // Initialise Values

    let csBreakpoints = (scope.$eval(attr.csBreakpoint));
    let firstTime = true;

    angular.element($window).bind('resize', setWindowSize);

    scope.$watch('csBreakpoint.windowSize', function (windowWidth, oldValue) {
      setClass(windowWidth);
    });

    scope.$watch('csBreakpoint.class', function (newClass, oldClass) {
      if (newClass !== oldClass || firstTime) {
        broadcastEvent(oldClass);
        firstTime = false;
      }
    });

    function broadcastEvent(oldClass) {
      $rootScope.$broadcast('csBreakpointChange', scope.csBreakpoint, oldClass);
    }

    function setWindowSize() {
      scope.csBreakpoint.windowSize = $window.innerWidth;
      if (!scope.$$phase) {
        scope.$apply();
      }
    }

    function setClass(windowWidth) {
      let classSet = csBreakpoints[Object.keys(csBreakpoints)[0]];
      for (let csBreakpoint in csBreakpoints) {
        if (csBreakpoints.hasOwnProperty(csBreakpoint)) {
          if (csBreakpoint < windowWidth) {
            classSet = csBreakpoints[csBreakpoint];
          }
          element.removeClass(csBreakpoints[csBreakpoint]);
        }
      }
      element.addClass(classSet);
      scope.csBreakpoint.class = classSet;
      $rootScope.breakpoint = classSet;
      if (!scope.$$phase) {
        scope.$apply();
      }
    }

  }

  return directive;
}
