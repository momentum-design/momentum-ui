mdLeftNav.$inject = ['$location'];
export function mdLeftNav($location) {
  let mdLeftNavDirective = {
    restrict: 'EA',
    scope: {
      pages: '=',
    },
    template: `
      <nav class="leftnav-wrapper" windowsize role="navigation">
        <div class="leftnav">
          <ul>
            <li md-dropdown is-open="page.isSelected" ng-repeat="page in pages" class="{{page.tab}} dropup" ng-class="{active: page.isActive && !(page.isSelected && page.subPages), selected: page.isSelected && page.subPages}">
              <a href md-dropdown-toggle ng-click="selectPage($index, $event); scope.subnavinfo()" ng-if="page.title.length > 10" md-tooltip="{{page.title}}" tooltip-placement="right">
                <i class="icon {{page.icon}}"></i>
                <span class="title">{{page.title}}</span>
              </a>
              <a href md-dropdown-toggle ng-click="selectPage($index, $event); scope.subnavinfo()" ng-if="page.title.length <= 10">
                <i class="icon {{page.icon}}"></i>
                <span class="title">{{page.title}}</span>
              </a>
              <ul md-sub-nav ng-if="page.subPages" class="sub-nav" ng-class="{'show-up' : showUp}" md-dropdown-menu ng-show="page.isSelected">
                <li ng-repeat="subPage in page.subPages">
                  <a ng-href="{{subPage.link}}">
                    <span class="title">{{subPage.title}}</span>
                  </a>
                </li>
              </ul>
            </li>
          </ul>
        </div>
      </nav>
    `,
    link: link,
  };

  function link(scope, element, atttrs) {
    scope.selectPage = function (index, $event) {
      let selectedPage = scope.pages[index];
      if (selectedPage.link) {
        $location.path(selectedPage.link);
      } else {
        let targetElem = $($event.target).closest('li').find('.sub-nav');
        let _clone = targetElem.clone().foobar({ display: 'inline-block', visibility: 'hidden' }).removeClass('ng-hide').appendTo('body');
        let width = _clone.width();
        _clone.remove();
        if (targetElem.data('width-added') !== 'true') {
          targetElem.width(width + 48);
          targetElem.data('width-added', 'true');
        }
      }
    };
  }

  return mdLeftNavDirective;
}

/* @ngInject */
export function mdSubNav($timeout) {
  let mdSubNavDirective = {
    restrict: 'EA',
    scope: true,
    link: link,
  };

  function link(scope, element, atttrs) {
    scope.showUp = false;

    function setSubNavDirection() {
      scope.showUp = false;
      $timeout(function () {
        element.attr('style', 'visibility: hidden !important; display: block !important');
        let elementInfo = element[0].getBoundingClientRect();
        let elementBottom = elementInfo.bottom;
        if (elementBottom > scope.windowHeight) {
          scope.showUp = true;
          element.removeAttr('style');
        } else {
          scope.showUp = false;
          element.removeAttr('style');
        }
      });
    }

    scope.$watch('windowHeight', function (newValue, oldValue) {
      setSubNavDirection();
    });
  }

  return mdSubNavDirective;
}
