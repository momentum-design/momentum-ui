/*
* @category navigation
* @component top-bar
*/


export class TopbarComponent implements ng.IComponentOptions {
  // public template = require('./topbar.component.html');
  public template = `
      <header class="new-top-bar top-bar--fixed top-bar--{{$ctrl.topBarColor}}" ng-class="{'top-bar--fixed': $ctrl.topBarFixed}">
      <div class="top-bar__container row">
        <i class="icon icon-hamburger-menu hide-for-large-up" ng-click="$ctrl.openNav()"></i>
        <div class="top-bar__brand">
          <a ui-sref="{{$ctrl.appLink}}">
            <div class="top-bar__logo">
              <i ng-If="!$ctrl.appImage" class="icon top-bar__icon {{$ctrl.appIcon}}"></i>
              <img class="top-bar__image" ng-If="$ctrl.appImage" ng-src="{{$ctrl.appImage}}" alt="{{$ctrl.appTitle}}">
            </div>
            <div class="top-bar__title">{{$ctrl.appTitle}}</div>
          </a>
        </div>
        <div class="top-bar__nav show-for-large-up" ng-transclude="topnav">
        </div>
        <div class="top-bar__right" ng-transclude="topbarright">
        </div>
      </div>
      <div class="top-bar__mobile" ng-class="{'open': $ctrl.navOpen}" ng-click="$ctrl.closeNav()" ng-transclude="topnav">
      </div>
      <div class="top-bar__mobile-nav-mask" ng-class="{'open': navOpen}" ng-click="$ctrl.closeNav()"></div>
    </header>
  `;
  public bindings: { [binding: string]: string } = {
    appTitle: '@',
    appIcon: '@?',
    appImage: '@?',
    appLink: '@?',
    topBarColor: '@?',
    topBarFixed: '@?',
  };
  public controller = Topbar;
  public transclude = {
    topnav: '?mdTopNav',
    topbarright: '?mdTopBarRight',
  };
}

export class Topbar {
  public appTitle: string;
  public appIcon: string;
  public appImage: string;
  public appLink?: string;
  public topBarColor = 'default';
  public topBarFixed?: string;

  constructor() {
    if (!this.appIcon && !this.appImage) {
      this.appIcon = 'icon-cisco-logo';
    }
  }
}
/**
// @name Topbar
// @description Application or site header for user based applications. for
// Admin base applications, see top-bar--admin.
//
// @category navigation
// @component topbar
* @section user-topbar
*
* @html
*   <md-topbar
*     app-title="$ctrl.appTitle"
*     app-image="$ctrl.appImage"
*     app-icon="$ctrl.appIcon">
*   </md-topbar>
*
* @param app-title - title text (string or template)
* @param app-image - image sourc url (string or template)
* @param app-icon - icon class (string or template)
*
*/
