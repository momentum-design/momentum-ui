/** @component breadcrumbs */
import * as angular from 'angular';

/* @ngInject */
export function csBreadcrumbs($interpolate, $state) {
  // Usage: <cs-breadcrumbs displayname-property="data.displayName"></cs-breadcrumbs>
  let directive = {
    link: link,
    restrict: 'E',
    scope: {
      displaynameProperty: '@',
      abstractProxyProperty: '@?',
      csTabindex: '<?', // used to selectively turn off breadcrumbs in the tabindex when covered by save/cancel buttons
    },
    template: `
      <ul class="md-breadcrumbs">
        <li ng-repeat="crumb in breadcrumbs" ng-class="{ current: $last }">
          <a tabindex="{{csTabindex ? csTabindex : 0}}" ui-sref="{{ crumb.route }}" ng-if="!$last">{{ crumb.displayName }}&nbsp;</a>
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
        // if the displayname-property attribute was not specified, default to the state's name
        return currentState.name;
      }
      propertyReference = getObjectValue(scope.displaynameProperty, currentState);

      if (propertyReference === false) {
        return false;
      } else if (typeof propertyReference === 'undefined') {
        return currentState.name;
      } else {
        // use the $interpolate service to handle any bindings in the propertyReference string.
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
          // if the specified property was not found, default to the state's name
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

/**
* @component breadcrumbs
* @section default
*
* @html
* <ul class="breadcrumbs">
*   <li class="current">Home</li>
* </ul>
* <ul class="breadcrumbs">
*   <li><a href="#">Home</a></li>
*   <li class="current"><a>Library</a></li>
* </ul>
* <ul class="breadcrumbs">
*   <li><a href="#">Home</a></li>
*   <li><a href="#">Library</a></li>
*   <li class="current">Data</li>
* </ul>
*/
