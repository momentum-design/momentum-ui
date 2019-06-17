import * as angular from 'angular';

export interface ISidenavAdmin extends ng.IScope {
  collapsed: { value: boolean };
  autoCollapsed: boolean;
  selectedPage: any;
  pages: any[];
  isSmallScreen: () => boolean;
  toggleCollapse: (event: Event) => void;
  selectPage: (index: number, event: Event) => void;
  onResizeFn?: Function;
  onClickItemFn?: Function;
}

export interface ISidenavAdminFooter extends ng.IScope {
  collapsed: { value: boolean };
  selectAdminPage: (index: number, event: Event) => void;
  selectedPage: any;
  adminpages: any[];
}

class SidenavAdmin implements ng.IDirective {
  constructor(
    private $location: ng.ILocationService,
    private $window: ng.IWindowService,
    private $timeout: ng.ITimeoutService
  ) {}

  public restrict: 'E';
  public transclude = true;
  public scope = {
    collapsed: '<?',
    pages: '<',
    headertitle: '@?',
    icon: '@?',
    image: '@?',
    onResizeFn: '&?',
    onClickItemFn: '&?',
  };
  public template = `
    <nav class="sidenav-admin-wrapper" role="navigation">
      <div class="sidenav-admin" ng-class="{'sidenav-admin--collapsed': collapsed.value}">
        <div class="sidenav-admin--header">
          <img ng-if="collapsed.image" class="image-logo-collapsed" ng-src="{{collapsed.image}}"/>
          <img ng-if="image" class="image-logo" ng-src="{{image}}"/>
          <i ng-if="icon" class="icon {{::icon}} header-icon"></i>
          <div ng-if="headertitle && !collapsed.value" class="header-title collapse-text">{{::headertitle}}</div>
        </div>
        <ul>
          <li md-dropdown is-open="page.isSelected" ng-repeat="page in pages" class="{{page.tab}} dropup" ng-class="{active: page.isActive, selected: page.isSelected}">
            <a href ng-if="page.title" md-dropdown-toggle ng-click="selectPage($index, $event)">
              <i ng-if="collapsed.value" class="icon {{::page.icon}}" title="{{::page.title}}" ng-class="{'{{::page.iconClass}}': page.iconClass}"></i>
              <i ng-if="!collapsed.value" class="icon {{::page.icon}}" ng-class="{'{{::page.iconClass}}': page.iconClass}"></i>
              <span ng-if="!collapsed.value" class="title collapse-text">{{::page.title}}</span>
            </a>
          </li>
        </ul>
        <div class="sidenav-admin--footer">
          <ng-transclude></ng-transclude>
        </div>
      </div>
      <div class="sidenav-admin-toggle" ng-click="toggleCollapse($event);" ng-class="{'sidenav-admin-toggle--collapsed': collapsed.value}">
        <i class="toggle-icon icon icon-three-dots"></i>
      </div>
    </nav>
  `;
  public link: ng.IDirectiveLinkFn = (_scope: ISidenavAdmin, _element: ng.IAugmentedJQuery, _attrs: ng.IAttributes) => {
    _scope.collapsed = _scope.collapsed || { value: false };
    _scope.autoCollapsed = false;

    _scope.isSmallScreen = () => {
      let width = window.innerWidth > 0 ? window.innerWidth : screen.width;
      return width < 960;
    };

    if (_scope.isSmallScreen()) {
      _scope.collapsed.value = true;
      _scope.autoCollapsed = true;
    }

    angular.element(this.$window).bind('resize', () => {
      if (_scope.isSmallScreen()) {
        if (!_scope.collapsed.value && !_scope.autoCollapsed) {
          if (_element[0]) {
            // collapse any open dropdowns
            _element[0].click();
          }
          _scope.collapsed.value = true;
          _scope.autoCollapsed = true;
          _scope.$apply();
        }
      } else {
        if (_scope.collapsed.value && _scope.autoCollapsed) {
          _scope.collapsed.value = false;
          _scope.autoCollapsed = false;
          _scope.$apply();
        }
      }
    });

    _scope.toggleCollapse = $event => {
      this.$timeout(() => {
        _scope.collapsed.value = !_scope.collapsed.value;
        _scope.autoCollapsed = false;
        _scope.$apply();
        if (_scope.onResizeFn) {
          _scope.onResizeFn();
        }
      }, 100);
    };

    _scope.selectPage = (index, $event) => {
      _scope.selectedPage = _scope.pages[index];
      if (_scope.onClickItemFn) {
        _scope.onClickItemFn(_scope.selectedPage);
      }
      if (_scope.selectedPage.link) {
        this.$location.path(_scope.selectedPage.link);
      }
    };

    let header = angular.element(_element[0].getElementsByClassName('sidenav-admin--header'));
    if (header) {
      if (_attrs.image !== undefined && _attrs.icon !== undefined && _attrs.headertitle !== undefined) {
        header.addClass('image-icon-title-adjustment');
      } else if (_attrs.image !== undefined && _attrs.icon !== undefined) {
        header.addClass('image-icon-adjustment');
      }
    }
  };
}

sidenavAdminFactory.$inject = ['$location', '$window', '$timeout'];
export function sidenavAdminFactory($location, $window, $timeout) {
  return new SidenavAdmin($location, $window, $timeout);
}

class SidenavAdminFooter implements ng.IDirective {
  constructor(private $location: ng.ILocationService) {}

  public restrict = 'E';
  public transclude = true;
  public scope = {
    collapsed: '<?',
    adminpages: '<',
    partner: '@?',
  };
  public template = `
    <div class="footer-divider-top"></div>
    <div ng-if="partner" class="partner-title" title="{{::partner}}">
      <span ng-if="!collapsed.value" class="title collapse-text">{{::partner}}</span>
    </div>
    <ul class="admin-pages" ng-if="adminpages">
      <li md-dropdown is-open="adminpage.isSelected" ng-repeat="adminpage in adminpages" class="{{adminpage.tab}} dropup" ng-class="{active: adminpage.isActive, selected: adminpage.isSelected}">
        <a href md-dropdown-toggle ng-click="selectAdminPage($index, $event); " ng-if="adminpage.title.length">
          <i ng-if="collapsed.value" class="icon {{::adminpage.icon}}" ng-class="{'{{::adminpage.iconClass}}': adminpage.iconClass}" title="{{::adminpage.title}}"></i>
          <i ng-if="!collapsed.value" class="icon {{::adminpage.icon}}" ng-class="{'{{::adminpage.iconClass}}': adminpage.iconClass}"></i>
          <span ng-if="!collapsed.value" class="title collapse-text">{{::adminpage.title}}</span>
        </a>
      </li>
    </ul>
    <ng-transclude></ng-transclude>
  `;
  public link: ng.IDirectiveLinkFn = (
    _scope: ISidenavAdminFooter,
    _element: ng.IAugmentedJQuery,
    _attrs: ng.IAttributes
  ) => {
    _scope.collapsed = _scope.collapsed || { value: false };
    _scope.selectAdminPage = (index, $event) => {
      _scope.selectedPage = _scope.adminpages[index];
      if (_scope.selectedPage.link) {
        this.$location.path(_scope.selectedPage.link);
      }
    };
  };
}

sidenavAdminFooterFactory.$inject = ['$location'];
export function sidenavAdminFooterFactory($location) {
  return new SidenavAdminFooter($location);
}
