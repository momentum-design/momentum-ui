mdHeaderPushContainer.$inject = ['pushService', '$rootScope', '$state'];
export function mdHeaderPushContainer(pushService, $rootScope, $state) {
  let directive = {
    restrict: 'EA',
    transclude: true,
    template: `
        <div class="push-down-container" ng-class="{'open': pushToggle}">
          <div ng-click="toggle()"><i class="icon icon-close"></i></div>
          <div class="container-fluid push-down-container-inner" ng-transclude></div>
        </div>
      `,
    link: link,
  };

  return directive;

  function link(scope) {
    scope.toggle = toggle;

    function toggle() {
      pushService.toggle();
    }
    scope.$watch(function () {
      return pushService.toggleState;
    }, function (newVal) {
      scope.pushToggle = newVal;
    });

    $rootScope.$on('$stateChangeStart',
      function (event, toState, toParams, fromState, fromParams) {
        if (scope.pushToggle === true) {
          scope.toggle();
        }
      });

  }
}

mdHeaderPushTrigger.$inject = ['pushService', '$state'];
export function mdHeaderPushTrigger(pushService, $state) {
  let directive = {
    restrict: 'EA',
    scope: {
      icon: '=',
      state: '=',
      label: '=',
    },
    template: `
        <div class="push-down-trigger">
          <button class="md-button btn--header state-{{state}}" ng-click="toggle()" ng-class="{open: pushToggle}">
           <div>
            <i class="icon icon-{{icon}}"></i>
            <span class="push-label header-label">{{label}}</span>
           </div>
          </button>
        </div>
      `,
    link: link,
  };

  return directive;

  function link(scope) {
    scope.toggle = toggle;

    function toggle() {
      pushService.toggle();
      if ($state.sidepanel) {
        $state.sidepanel.close();
      }
    }

    scope.$watch(function () {
      return pushService.toggleState;
    }, function (newVal) {
      scope.pushToggle = newVal;
    });
  }
}

export function pushService() {
  let toggleState = false;
  let service = {
    toggle: toggle,
    toggleState: toggleState,
  };

  return service;

  function toggle() {
    if (service.toggleState) {
      service.toggleState = false;
    } else {
      service.toggleState = true;
    }
  }
}
