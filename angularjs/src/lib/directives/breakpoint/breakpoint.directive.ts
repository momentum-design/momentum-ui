import * as angular from 'angular';

export interface IBreakpointRootScopeService extends ng.IRootScopeService {
  breakpoint: string;
}

mdBreakpoint.$inject = ['$window', '$rootScope'];
export function mdBreakpoint($window, $rootScope) {
  let directive = {
    restrict: 'A',
    link: link,
  };

  function link(scope, element, attr) {
    $rootScope.breakpoint = '';
    scope.mdBreakpoint = {
      class: '',
      windowSize: $window.innerWidth,
    }; // Initialise Values

    let mdBreakpoints = (scope.$eval(attr.mdBreakpoint));
    let firstTime = true;

    angular.element($window).bind('resize', setWindowSize);

    scope.$watch('mdBreakpoint.windowSize', function (windowWidth, oldValue) {
      setClass(windowWidth);
    });

    scope.$watch('mdBreakpoint.class', function (newClass, oldClass) {
      if (newClass !== oldClass || firstTime) {
        broadcastEvent(oldClass);
        firstTime = false;
      }
    });

    function broadcastEvent(oldClass) {
      $rootScope.$broadcast('mdBreakpointChange', scope.mdBreakpoint, oldClass);
    }

    function setWindowSize() {
      scope.mdBreakpoint.windowSize = $window.innerWidth;
      if (!scope.$$phase) {
        scope.$apply();
      }
    }

    function setClass(windowWidth) {
      let classSet = mdBreakpoints[Object.keys(mdBreakpoints)[0]];
      for (let mdBreakpoint in mdBreakpoints) {
        if (mdBreakpoints.hasOwnProperty(mdBreakpoint)) {
          if (mdBreakpoint < windowWidth) {
            classSet = mdBreakpoints[mdBreakpoint];
          }
          element.removeClass(mdBreakpoints[mdBreakpoint]);
        }
      }
      element.addClass(classSet);
      scope.mdBreakpoint.class = classSet;
      $rootScope.breakpoint = classSet;
      if (!scope.$$phase) {
        scope.$apply();
      }
    }

  }

  return directive;
}
