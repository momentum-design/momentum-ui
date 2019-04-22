/**
* @category layout
* @component search-filter
*/
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

  /* @ngInject */
  constructor (
    private $element: ng.IRootElementService,
    private $rootScope: IBreakpointRootScopeService,
  ) {
    this.activeFilter = 'all';
    this.inputFocus = false;
    this.searchStr = '';
  }

  public findall(): void {
    //reset the search]
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
    // Defaults to large screen view when breakpoint is not set
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

  // if tableCount is changed in the controller, update the value to the ngModelCtrl using ngModelCtrl.$setViewValue

  public $onChanges(changes: { [bindings: string]: ng.IChangesObject<any> }): void {
    if (!_.isUndefined(this.clear)) {
      if (changes.clear.currentValue != null) {
        if (this.searchStr !== '') {
          let elm = angular.element('#searchFilter');
          this.searchStr = '';
          this.searchItem(this.searchStr);
          // first run focus, because blur event on the input won't run if the input does not have focus
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

// filters need a name (for display), value (to search the data), count
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
/*
* @name Search Filter
* @description Built in filters and a search box.
* @category layout
* @component search-filter
* @section search-filter
*
* @param filters : Define filters to use for the built in. They should have attributes:
*     @param name the display name
*     @param filterValue The value to search on
*     @param count the number of records of that type
* @param set-filter-fn: The function to run when a built in filter is pressed. send the filter object.
* @param search-item-fn: The function to run when the search box is used send the string to search on
* @param placeholder-text: The text to show when search is defaulted.
* @param ng-model: The count for next to the search box.
* @param hide-count: Hide the count in the Search Filter.
* @param clear: boolean value to clear the input.
* @param on-cleared: The function to run when after the input is cleared.
*
* @html
<div ng-controller="SearchFilterPageExampleController as searchexample" >
        <div class="row page-header">
            <div class="page-title">
                <span class="title-heading">PageTitle</span>
                <md-searchfilter filters="searchexample.filters" set-filter-fn="searchexample.setFilter(filter)" search-item-fn="searchexample.searchData(searchStr)" placeholder-text="{{searchexample.placeholder.name}}" ng-model="searchexample.filterOptions.count"></md-searchfilter>
            </div>
        </div>
        <div gridscrollbar class="gridStyle col-md-12" ng-grid="searchexample.gridOptions"></div>
  </div>
*/
