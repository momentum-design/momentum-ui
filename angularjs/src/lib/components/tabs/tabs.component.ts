/**
* @category layout
* @component tabs
*/
import * as angular from 'angular';

TabsetController.$inject = ['$scope'];
export function TabsetController($scope) {
  let ctrl = this,
    tabs = ctrl.tabs = $scope.tabs = [];

  ctrl.select = function (selectedTab) {
    angular.forEach(tabs, function (tab) {
      if (tab.active && tab !== selectedTab) {
        tab.active = false;
        tab.onDeselect();
      }
    });
    selectedTab.active = true;
    selectedTab.onSelect();
  };

  ctrl.addTab = function addTab(tab) {
    tabs.push(tab);
    // we can't run the select function on the first tab
    // since that would select it twice
    if (tabs.length === 1) {
      tab.active = true;
    } else if (tab.active) {
      ctrl.select(tab);
    }
  };

  ctrl.removeTab = function removeTab(tab) {
    let index = tabs.indexOf(tab);
    //Select a new tab if the tab to be removed is selected
    if (tab.active && tabs.length > 1) {
      //If this is the last tab, select the previous tab. else, the next tab.
      let newActiveIndex = index === tabs.length - 1 ? index - 1 : index + 1;
      ctrl.select(tabs[newActiveIndex]);
    }
    tabs.splice(index, 1);
  };
}

export function tabset() {
  return {
    restrict: 'EA',
    transclude: true,
    replace: true,
    scope: {
      type: '@',
    },
    controller: 'TabsetController',
    template: `
      <div class="md-tab md-tab--{{type || 'tabs'}}" ng-class="{'md-tab--stacked': vertical, 'md-tab--justified': justified}">
        <ul class="md-tab__list" ng-transclude></ul>
        <div class="md-tab__content">
          <div class="md-tab__pane" ng-repeat="tab in tabs" ng-class="{active: tab.active}" tab-content-transclude="tab">
          </div>
        </div>
      </div>
    `,
    link: function (scope, element, attrs) {
      scope.vertical = angular.isDefined(attrs.vertical) ? scope.$parent.$eval(attrs.vertical) : false;
      scope.justified = angular.isDefined(attrs.justified) ? scope.$parent.$eval(attrs.justified) : false;
    },
  };
}

/* @ngInject */
export function tab($parse) {
  return {
    require: '^tabset',
    restrict: 'EA',
    replace: true,
    template: `
      <li class="md-tab__item" ng-class="{active: active, disabled: disabled}">
        <a href ng-click="select()" tab-heading-transclude>{{heading}}</a>
      </li>
    `,
    transclude: true,
    scope: {
      active: '=?',
      heading: '@',
      onSelect: '&select', //This callback is called in contentHeadingTransclude
      //once it inserts the tab's content into the dom
      onDeselect: '&deselect',
    },
    controller: function () {
      //Empty controller so other directives can require being 'under' a tab
    },
    compile: function (elm, attrs, transclude) {
      return function postLink(scope, elm, attrs, tabsetCtrl) {
        scope.$watch('active', function (active) {
          if (active) {
            tabsetCtrl.select(scope);
          }
        });

        scope.disabled = false;
        if (attrs.disabled) {
          scope.$parent.$watch($parse(attrs.disabled), function (value) {
            scope.disabled = !!value;
          });
        }

        scope.select = function () {
          if (!scope.disabled) {
            scope.active = true;
          }
        };

        tabsetCtrl.addTab(scope);
        scope.$on('$destroy', function () {
          tabsetCtrl.removeTab(scope);
        });

        //We need to transclude later, once the content container is ready.
        //when this link happens, we're inside a tab heading.
        scope.$transcludeFn = transclude;
      };
    },
  };
}

export function tabHeadingTransclude() {
  return {
    restrict: 'A',
    require: '^tab',
    link: function (scope, elm, attrs, tabCtrl) {
      scope.$watch('headingElement', function updateHeadingElement(heading) {
        if (heading) {
          elm.html('');
          elm.append(heading);
        }
      });
    },
  };
}

export function tabContentTransclude() {
  return {
    restrict: 'A',
    require: '^tabset',
    link: function (scope, elm, attrs) {
      let tab = scope.$eval(attrs.tabContentTransclude);
      //Now our tab is ready to be transcluded: both the tab heading area
      //and the tab content area are loaded.  Transclude 'em both.
      tab.$transcludeFn(tab.$parent, function (contents) {
        angular.forEach(contents, function (node) {
          if (isTabHeading(node)) {
            //Let tabHeadingTransclude know.
            tab.headingElement = node;
          } else {
            elm.append(node);
          }
        });
      });
    },
  };
  function isTabHeading(node) {
    return node.tagName && (
      node.hasAttribute('tab-heading') ||
      node.hasAttribute('data-tab-heading') ||
      node.tagName.toLowerCase() === 'tab-heading' ||
      node.tagName.toLowerCase() === 'data-tab-heading'
    );
  }
}
/*
* @name Horizontal Tabs
* @description The Horizontal Tab component consists of clickable tabs, that are aligned side by side.
* @category layout
* @component tabs
* @section default
*
* @html
<tabset>
  <tab heading="Auto Attendant">
    <div class="md-tab__content">
      Auto Attendant Tab Content
    </div>
  </tab>
  <tab heading="Call Park">
    <div class="md-tab__content">
      Call Park Tab Content
    </div>
  </tab>
  <tab heading="Call Pick Up">
    <div class="md-tab__content">
      Call Pick Up Tab Content
    </div>
  </tab>
  <tab heading="Intercom Groups">
    <div class="md-tab__content">
      Intercom Groups Tab Content
    </div>
  </tab>
</tabset>
*
*/

/*
* @name Vertical Tabs
* @description The Vertical Tab component consists of clickable tabs, that are stacked vertically.
* @category layout
* @component tabs
* @section vertical
*
* @html
<div class="row">
  <div class="col-sm-4">
    <tabset vertical="true">
      <tab heading="Auto Attendant">
        <div class="md-tab__content">
          Auto Attendant Tab Content
        </div>
      </tab>
      <tab heading="Call Park">
        <div class="md-tab__content">
          Call Park Tab Content
        </div>
      </tab>
      <tab heading="Call Pick Up">
        <div class="md-tab__content">
          Call Pick Up Tab Content
        </div>
      </tab>
      <tab heading="Intercom Groups">
        <div class="md-tab__content">
          Intercom Groups Tab Content
        </div>
      </tab>
    </tabset>
  </div>
</div>
*
*/

/*
* @name Horizontal Justified Tabs
* @description The Horizintal Justified Tab component consists of clickable tabs, that are aligned side by side in a grid that takes up full width of its parent element.
* @category layout
* @component tabs
* @section horizontal-justified
*
* @html
  <tabset justified="true">
    <tab heading="Auto Attendant">
      <div class="md-tab__content">
        Auto Attendant Tab Content
      </div>
    </tab>
    <tab heading="Call Park">
      <div class="md-tab__content">
        Call Park Tab Content
      </div>
    </tab>
    <tab heading="Call Pick Up">
      <div class="md-tab__content">
        Call Pick Up Tab Content
      </div>
    </tab>
    <tab heading="Intercom Groups">
      <div class="md-tab__content">
        Intercom Groups Tab Content
      </div>
    </tab>
  </tabset>
*
*/

/*
* @name Horizontal Pills
* @description The Pills Tabs have the look and feel of buttons. The Horizontal Pills Tabs are aligned side by side.
* @category layout
* @component tabs
* @section horizontal-pills
*
* @html
  <tabset type="pills">
    <tab heading="Auto Attendant">
      <div class="md-tab__content">
        Auto Attendant Tab Content
      </div>
    </tab>
    <tab heading="Call Park">
      <div class="md-tab__content">
        Call Park Tab Content
      </div>
    </tab>
    <tab heading="Call Pick Up">
      <div class="md-tab__content">
        Call Pick Up Tab Content
      </div>
    </tab>
    <tab heading="Intercom Groups">
      <div class="md-tab__content">
        Intercom Groups Tab Content
      </div>
    </tab>
  </tabset>
*
*/

/*
* @name Vertical Pills
* @description The Vertical Pills Tabs have the look and feel of buttons and are stacked vertically.
* @category layout
* @component tabs
* @section vertical-pills
*
* @html
  <div class="col-sm-4">
    <tabset vertical="true" type="pills">
      <tab heading="Auto Attendant">
        <div class="md-tab__content">
          Auto Attendant Tab Content
        </div>
      </tab>
      <tab heading="Call Park">
        <div class="md-tab__content">
          Call Park Tab Content
        </div>
      </tab>
      <tab heading="Call Pick Up">
        <div class="md-tab__content">
          Call Pick Up Tab Content
        </div>
      </tab>
      <tab heading="Intercom Groups">
        <div class="md-tab__content">
          Intercom Groups Tab Content
        </div>
      </tab>
    </tabset>
  </div>
*
*/

/*
* @name Horizontal Justified Pills
* @description The Horizintal Justified Pills Tabs are aligned side by side in a grid that takes up full width of its parent element, with the look and feel of buttons
* @category layout
* @component tabs
* @section horizontal-pills-justified
*
* @html
  <tabset type="pills" justified="true">
    <tab heading="Auto Attendant">
      <div class="md-tab__content">
        Auto Attendant Tab Content
      </div>
    </tab>
    <tab heading="Call Park">
      <div class="md-tab__content">
        Call Park Tab Content
      </div>
    </tab>
    <tab heading="Call Pick Up">
      <div class="md-tab__content">
        Call Pick Up Tab Content
      </div>
    </tab>
    <tab heading="Intercom Groups">
      <div class="md-tab__content">
        Intercom Groups Tab Content
      </div>
    </tab>
  </tabset>
*
*/

/*
* @name Small Tabs
* @description
* @category layout
* @component tabs
* @section small
*
* @html
  <cs-tabset>
    <cs-tab>
      <cs-tab-heading  >Small tab 1</cs-tab-heading>
      <div >
          content
      </div>
    </cs-tab>
    <cs-tab>
      <cs-tab-heading>Small tab 2</cs-tab-heading>
      <div >
        content 2
      </div>
    </cs-tab>
    <cs-tab>
      <cs-tab-heading>Small tab 3</cs-tab-heading>
      <div >
        content 3
      </div>
    </cs-tab>
  </cs-tabset>
  <br>
  <cs-tabset justified="true">
    <cs-tab>
      <cs-tab-heading  >Small tab 1</cs-tab-heading>
      <div >
          content
      </div>
    </cs-tab>
    <cs-tab>
      <cs-tab-heading>Small tab 2</cs-tab-heading>
      <div >
        content 2
      </div>
    </cs-tab>
    <cs-tab>
      <cs-tab-heading>Small tab 3</cs-tab-heading>
      <div >
        content 3
      </div>
    </cs-tab>
  </cs-tabset>
*
*/

/*
* @name Gray Tabs
* @description
* @category layout
* @component tabs
* @section gray
*
* @html
  <cs-tabset graytab="true">
    <cs-tab>
      <cs-tab-heading  >Gray tab 1</cs-tab-heading>
      <div >
          content
      </div>
    </cs-tab>
    <cs-tab>
      <cs-tab-heading>Gray tab 2</cs-tab-heading>
      <div >
        content 2
      </div>
    </cs-tab>
    <cs-tab>
      <cs-tab-heading>Gray tab 3</cs-tab-heading>
      <div >
        content 3
      </div>
    </cs-tab>
  </cs-tabset>
  <br>
  <cs-tabset graytab="true" justified="true">
    <cs-tab>
      <cs-tab-heading  >Gray tab 1</cs-tab-heading>
      <div >
          content
      </div>
    </cs-tab>
    <cs-tab>
      <cs-tab-heading>Gray tab 2</cs-tab-heading>
      <div >
        content 2
      </div>
    </cs-tab>
    <cs-tab>
      <cs-tab-heading>Gray tab 3</cs-tab-heading>
      <div >
        content 3
      </div>
    </cs-tab>
  </cs-tabset>
*
*/

/*
* @name Large Tabs
* @description
* @category layout
* @component tabs
* @section large
*
* @html
  <cs-tabset large="true">
    <cs-tab  >
      <cs-tab-heading  >Large tab 1<div>345</div></cs-tab-heading>
      <div>
          content
      </div>
    </cs-tab>
    <cs-tab>
      <cs-tab-heading>Large tab 2</cs-tab-heading>
      <div >
        content 2
      </div>
    </cs-tab>
    <cs-tab>
      <cs-tab-heading>Large tab 3<div>435456</div></cs-tab-heading>
      <div >
        content 3
      </div>
    </cs-tab>
  </cs-tabset>
  <br>
  <cs-tabset large="true" justified="true">
    <cs-tab  >
      <cs-tab-heading  >Large tab 1<div>345</div></cs-tab-heading>
      <div>
          content
      </div>
    </cs-tab>
    <cs-tab>
      <cs-tab-heading>Large tab 2</cs-tab-heading>
      <div >
        content 2
      </div>
    </cs-tab>
    <cs-tab>
      <cs-tab-heading>Large tab 3<div>435456</div></cs-tab-heading>
      <div >
        content 3
      </div>
    </cs-tab>
  </cs-tabset>
*
*/

