export function csHeader() {
  let directive = {
    restrict: 'EA',
    transclude: true,
    replace: true,
    scope: {
      navstyle: '@',
      headertitle: '@',
      icon: '@',
      image: '@',
    },
    template: `
        <header class="fixed top-bar-{{::navstyle}}">
          <nav class="top-bar" role="navigation" ng-transclude></div>
        </header>
      `,
  };

  return directive;
}

export function csHeaderLeft() {
  let directive = {
    restrict: 'EA',
    transclude: true,
    replace: true,
    template: `
        <ul class="left">
          <li class="name">
              <i ng-if="$parent.icon" class="app-icon icon {{::$parent.$parent.icon}}"></i>
              <img ng-if="$parent.image" class="app-icon" ng-src="{{::$parent.$parent.image}}"/>
            <span class="header-title">{{::$parent.headertitle}}</span>
          </li>
          <li class="top-bar__transclude" ng-transclude></li>
        </ul>
      `,
  };

  return directive;
}

export function csHeaderRight() {
  let directive = {
    restrict: 'EA',
    transclude: true,
    replace: true,
    template: `<div class="right" ng-transclude></div>`,
  };

  return directive;
}
