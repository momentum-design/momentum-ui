/** @component breadcrumbs */
import * as angular from 'angular';

mdBreadcrumbs.$inject = ['$interpolate', '$state'];
export function mdBreadcrumbs($interpolate, $state) {
  let directive = {
    link: link,
    restrict: 'E',
    scope: {
      displaynameProperty: '@',
      abstractProxyProperty: '@?',
      mdTabindex: '<?', // used to selectively turn off breadcrumbs in the tabindex when covered by save/cancel buttons
    },
    template: `
      <ul class="md-breadcrumbs">
        <li ng-repeat="crumb in breadcrumbs" ng-class="{ current: $last }">
          <a tabindex="{{mdTabindex ? mdTabindex : 0}}" ui-sref="{{ crumb.route }}" ng-if="!$last">{{ crumb.displayName }}&nbsp;</a>
          <span ng-show="$last">{{ crumb.displayName }}</span>
        </li>
      </ul>
    `,
  };
  return directive;

  function link(scope, element, attrs) {
    scope.breadcrumbs = [];
    if ($state.$current.name !== '') {
      updateBreadcrumbsArray();
    }
    scope.$on('$stateChangeSuccess', function () {
      updateBreadcrumbsArray();
    });

    scope.$on('displayNameUpdated', function () {
      updateBreadcrumbsArray();
    });

    function updateBreadcrumbsArray() {
      let workingState;
      let displayName;
      let breadcrumbs = [];
      let currentState = $state.$current;

      while (currentState && currentState.name !== '') {
        workingState = getWorkingState(currentState);
        if (workingState) {
          displayName = getDisplayName(workingState);

          if (displayName !== false && !stateAlreadyInBreadcrumbs(workingState, breadcrumbs)) {
            breadcrumbs.push({
              displayName: displayName,
              route: workingState.name,
            });
          }
        }
        currentState = currentState.parent;
      }
      breadcrumbs.reverse();
      scope.breadcrumbs = breadcrumbs;
    }

    function getWorkingState(currentState) {
      let proxyStateName;
      let workingState = currentState;
      if (currentState.abstract === true) {
        if (typeof scope.abstractProxyProperty !== 'undefined') {
          proxyStateName = getObjectValue(scope.abstractProxyProperty, currentState);
          if (proxyStateName) {
            workingState = $state.get(proxyStateName);
          } else {
            workingState = false;
          }
        } else {
          workingState = false;
        }
      }
      return workingState;
    }

    function getDisplayName(currentState) {
      let interpolationContext;
      let propertyReference;
      let displayName;

      if (!scope.displaynameProperty) {
        return currentState.name;
      }
      propertyReference = getObjectValue(scope.displaynameProperty, currentState);

      if (propertyReference === false) {
        return false;
      } else if (typeof propertyReference === 'undefined') {
        return currentState.name;
      } else {
        interpolationContext = (typeof currentState.locals !== 'undefined') ? currentState.locals.globals : currentState;
        displayName = $interpolate(propertyReference)(interpolationContext);
        return displayName;
      }
    }

    function getObjectValue(objectPath, context) {
      let i;
      let propertyArray = objectPath.split('.');
      let propertyReference = context;

      for (i = 0; i < propertyArray.length; i++) {
        if (angular.isDefined(propertyReference[propertyArray[i]])) {
          propertyReference = propertyReference[propertyArray[i]];
        } else {
          return undefined;
        }
      }
      return propertyReference;
    }

    function stateAlreadyInBreadcrumbs(state, breadcrumbs) {
      let i;
      let alreadyUsed = false;
      for (i = 0; i < breadcrumbs.length; i++) {
        if (breadcrumbs[i].route === state.name) {
          alreadyUsed = true;
        }
      }
      return alreadyUsed;
    }
  }
}
