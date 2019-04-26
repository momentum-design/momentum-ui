/** @component search-filter */

import * as angular from 'angular';
import * as _ from 'lodash';
import { IBreakpointRootScopeService } from '../../directives/breakpoint';

export class SearchFilterCtrl implements ng.IComponentController {
  private activeFilter: string;
  private inputFocus: boolean;
  private searchStr: string;
  private clear: any;
  public tableCount: any;
  public ngModelCtrl: ng.INgModelController;
  public setFilterFn: (filterObject: any) => void;
  public searchItemFn: (searchObject: any) => void;
  public onCleared: () => void;

  public static $inject = ['$element', '$rootScope'];
  constructor (
    private $element: ng.IRootElementService,
    private $rootScope: IBreakpointRootScopeService,
  ) {
    this.activeFilter = 'all';
    this.inputFocus = false;
    this.searchStr = '';
  }

  public findall(): void {
    this.searchStr = '';
    let tmpFilter = {
      filterValue: 'all',
    };
    this.setFilter(tmpFilter);
    this.activeFilter = 'all';
  }

  public setFilter(filter: any): void {
    this.activeFilter = filter.filterValue;
    if (angular.isFunction(this.setFilterFn)) {
      this.setFilterFn({
        filter: filter,
      });
    }
  }

  public isLargeScreen(): boolean {
    return _.isUndefined(this.$rootScope.breakpoint) || this.$rootScope.breakpoint === 'screen-lg';
  }

  public searchItem(searchStr: string): void {
    if (searchStr === '') {
      this.findall();
    }
    if (angular.isFunction(this.searchItemFn)) {
      this.searchItemFn({
        searchStr: searchStr,
      });
    }
  }

  public clearSearch(): void {
    this.searchStr = '';
  }

  public focusInput(): void {
    this.$element.find('#searchFilter').focus();
  }

  public $onInit(): void {
    if (this.ngModelCtrl) {
      this.ngModelCtrl.$render = () => {
        this.tableCount = this.ngModelCtrl.$viewValue;
      };
    }
  }

  public $onChanges(changes: { [bindings: string]: ng.IChangesObject<any> }): void {
    if (!_.isUndefined(this.clear)) {
      if (changes.clear.currentValue != null) {
        if (this.searchStr !== '') {
          let elm = angular.element('#searchFilter');
          this.searchStr = '';
          this.searchItem(this.searchStr);
          elm.focus();
          elm.blur();
        }
        if (angular.isFunction(this.onCleared)) {
          this.onCleared();
        }
      }
    }
  }
}

export class SearchFilter implements ng.IComponentOptions {
  public controller = SearchFilterCtrl;
  public controllerAs = 'searchFilter';
  public require = {
    ngModelCtrl: '?ngModel',
  };
  public bindings = {
    clearAriaText: '@',
    filters: '<',
    setFilterFn: '&',
    placeholderText: '@',
    searchItemFn: '&',
    hideCount: '@',
    clear: '<',
    onCleared: '&',
    searchPlaceholderText: '@',
  };
  public template = `
    <div class="searchfilter">
      <div class="searchbox" ng-click="searchFilter.focusInput()" tabindex="-1">
        <div class="searchinput">
          <i class="icon icon-search"></i>
          <input id="searchFilter" md-expandinginput ng-model="searchFilter.searchStr" ng-change="searchFilter.searchItem(searchFilter.searchStr)" type="text" placeholder="{{::searchFilter.searchPlaceholderText ? searchFilter.searchPlaceholderText : searchFilter.placeholderText}}" ng-focus="searchFilter.searchItem(searchFilter.searchStr); searchFilter.inputFocus = true;"
            ng-blur="searchFilter.inputFocus = false" focus-width="150" style="width:1px;" md-expandinginput-minwidth="1px"/>
          <i class="icon icon-exit-outline clear" ng-click="searchFilter.clearSearch();" aria-label="{{::searchFilter.clearAriaText}}"></i>
        </div>
      </div>
      <div md-dropdown class="table-filter" ng-if="searchFilter.filters">
        <div md-dropdown-toggle class="dropdown-toggle filter" ng-if="!searchFilter.isLargeScreen()">
          <button class="md-button md-button--link">
            <i class="icon icon-filter"></i>
            <span class="name" ng-if="searchFilter.placeholderText && searchFilter.activeFilter === 'all'">{{::searchFilter.placeholderText}}</span>
            <span class="name" ng-if="searchFilter.activeFilter === f.filterValue" ng-repeat="f in searchFilter.filters">{{::f.name}}</span>
          </button>
        </div>
        <ul md-dropdown-menu ng-if="!searchFilter.isLargeScreen()">
          <li ng-hide="searchFilter.hideCount === 'true'" class="filter" ng-class="{'active': searchFilter.activeFilter === 'all'}" ng-click="searchFilter.setFilter({filterValue: 'all', count: searchFilter.tableCount})" ng-if="searchFilter.placeholderText && !filter.hide">
            <a>
              <i class="icon icon-check" ng-class="{'showMe': !searchFilter.isLargeScreen() && searchFilter.activeFilter === 'all'}" ng-if="!searchFilter.isLargeScreen()"></i>
              <span class="name">{{::searchFilter.placeholderText}}</span>
              <span ng-hide="searchFilter.hideCount === 'true'" class="count">{{searchFilter.tableCount}}</span>
            </a>
          </li>
          <li class="filter" ng-class="{'active': searchFilter.activeFilter === filter.filterValue}" ng-repeat="filter in searchFilter.filters" ng-click="searchFilter.setFilter(filter)" ng-if="!filter.hide">
            <a>
              <i class="icon icon-check" ng-class="{'showMe': !searchFilter.isLargeScreen() && searchFilter.activeFilter === filter.filterValue}"></i>
              <span class="name">{{::filter.name}}</span>
              <span ng-hide="searchFilter.hideCount === 'true'" class="count">{{filter.count}}</span>
            </a>
          </li>
        </ul>
        <!-- TODO: Better solution than repeating the ul -->
        <ul ng-if="searchFilter.isLargeScreen()">
          <li ng-hide="searchFilter.hideCount === 'true'" class="filter" ng-class="{'active': searchFilter.activeFilter === 'all'}" ng-click="searchFilter.setFilter({filterValue: 'all', count: searchFilter.tableCount})" ng-if="searchFilter.placeholderText && !filter.hide">
            <a>
              <span class="name">{{::searchFilter.placeholderText}}</span>
              <span ng-hide="searchFilter.hideCount === 'true'" class="count">{{searchFilter.tableCount}}</span>
            </a>
          </li>
          <li class="filter" ng-class="{'active': searchFilter.activeFilter === filter.filterValue}" ng-repeat="filter in searchFilter.filters" ng-click="searchFilter.setFilter(filter)" ng-if="!filter.hide">
            <a>
              <span class="name">{{::filter.name}}</span>
              <span ng-hide="searchFilter.hideCount === 'true'" class="count">{{filter.count}}</span>
            </a>
          </li>
        </ul>
      </div>
    </div>
  `;
}
