import * as angular from 'angular';
import 'angular-ui-router';
import * as _ from 'lodash';

/**  @component page-header */
export class PageHeaderCtrl implements ng.IComponentController {
  private jsBack: string;
  private backUrl: string;
  private backParams: Object;
  private backFxn: Function;

  /* @ngInject */
  constructor(
    private $state,
  ) {}
  public goTo(): void {
    if (!_.isUndefined(this.backFxn)) {
      this.backFxn();
    } else if (angular.isDefined(this.jsBack)) {
      window.history.back();
    } else {
      if (!_.isUndefined(this.backParams)) {
        this.$state.go(this.backUrl, this.backParams);
      } else {
        this.$state.go(this.backUrl);
      }
    }
  }
}

export class PageHeader implements ng.IComponentOptions {
  public controller = PageHeaderCtrl;
  public template = `
    <div class="row full page-header">
      <div class="page-header__left">
        <i ng-if="$ctrl.back" class="icon icon-arrow-left_16" role="link" ng-click="$ctrl.goTo()" aria-label="{{::$ctrl.backAriaLabel}}"></i>
        <h2 class="page-header__title">{{$ctrl.titleName}}</h2>
      </div>
      <div class="page-header__right">
        <div class="md-tab md-tab--tabs md-tab--nav">
          <ul class="md-tab__list right" role="tablist">
            <li class="md-tab__item" role="presentation" ng-repeat="tab in $ctrl.tabs" ui-sref-active="current active">
              <a href class="h4" ui-sref="{{::tab.state}}" ng-class="{{::tab.class}}" id="{{::tab.id}}" role="tab">{{tab.title}}</a>
            </li>
          </ul>
        </div>
      </div>
    </div>
  `;
  public bindings = {
    titleName: '@',
    backAriaLabel: '@?',
    back: '<',
    tabs: '<',
    jsBack: '@',
    backUrl: '<',
    backFxn: '&?',
    backParams: '<?',
  };
}
/**
* @component page-header
* @section default
* @param title Parameter for the text of the title
* @param back Parameter to show the back arrow
* @param js-back Parameter for browser back functionality
* @param tabs Parameter for the tabs to be shown on right hand side
* @param back-url Parameter for the state for back button
*
* @html
* <md-page-header title="" back="page.back" tabs="page.tabs"></md-page-header>
*
* @js
* (function () {
*   'use strict';
*   angular
*     .module('app.layout')
*     .controller('PageHeaderExampleController', PageHeaderExampleController);
*   function PageHeaderExampleController() {
*     var vm = this;
*     vm.title = 'Users';
*     vm.back = true;
*     vm.tabs = [{
*       title: 'Numbers',
*       state: 'live-examples.overlay-panel'
*     }, {
*       title: 'Settings',
*       state: 'huronsettings'
*     }, {
*       title: 'Features',
*       state: 'huronfeatures'
*     }];
*   }
* })();
*
*/
