/**
* @category controls
* @component select
*/
import * as _ from 'lodash';
import { KeyCodes } from '../../directives/dropdown/keyCodes';

/* @ngInject */
export function csSelectSearchable($filter) {
  return function (values, option, comparator) {
    if (option && comparator && comparator.length !== 0) {
      return $filter('filter')(values, comparator);
    }
    return values;
  };
}

export class CSSelectService {
  private id = 1;
  public getId() {
    this.id++;
    return this.id;
  }
}

/* @ngInject */
export function csSelectCtrl($element, $filter, $timeout) {
  /*jshint validthis: true */
  let vm = this;
  vm.filterOptions = '';
  vm.addNewOption = addNewOption;
  vm.changefunction = changefunction;
  vm.getLabel = getLabel;
  vm.refreshData = refreshData;
  vm.toggleOpen = toggleOpen;
  vm.onCloseFn = onCloseFn;
  vm.change = change;
  vm.style = style;
  vm.menuOpen = false;
  vm.cloneOptions = undefined;

  init();

  vm.getStyle = getStyle;
  vm.getMsg = getMsg;
  vm.getAriaText = getAriaText;
  vm.showFullMsg = false;
  vm.toggleFullMsg = toggleFullMsg;
  vm.mouseover = mouseover;
  vm.nestedMenuSelection = nestedMenuSelection;
  vm.toggleNestedMenu = toggleNestedMenu;

  function getStyle() {
    if (vm.isError === 'true') {
      return 'alert';
    } else if (vm.isWarn === 'true') {
      return 'warn';
    }
    return '';
  }

  function getMsg() {
    if (vm.isError === 'true') {
      return vm.errorMsg;
    } else if (vm.isWarn === 'true') {
      return vm.warnMsg;
    }
    vm.showFullMsg = false;
    return '';
  }

  function getAriaText() {
    const selected = vm.getLabel(vm.selected);
    if (selected) {
      return selected;
    } else if (vm.ariaText && vm.placeholder) {
      return vm.ariaText + ' ' + vm.placeholder;
    } else if (vm.ariaText) {
      return vm.ariaText;
    } else if (vm.secondaryLabel && vm.placeholder) {
      return vm.secondaryLabel + ' ' + vm.placeholder;
    } else if (vm.secondaryLabel) {
      return vm.secondaryLabel;
    } else {
      return vm.placeholder;
    }
  }

  function mouseover(index) {
    $element.find('#nestedParent' + index).focus();
    vm.toggleNestedMenu();
  }

  function nestedMenuSelection($event, option) {
    if (option.childOptions) {
      $event.stopPropagation();
      vm.toggleNestedMenu(option);
    } else {
      vm.selectOption(option);
    }
  }

  function toggleNestedMenu(option?) {
    if (option && option.menu) {
      option.menu = !option.menu;
    } else if (option) {
      option.menu = true;
    }

    _.forEach(vm.options, function (optionItem) {
      if (_.isUndefined(option) || option.value !== optionItem.value) {
        optionItem.menu = false;
      }
    });
  }

  function toggleFullMsg() {
    vm.showFullMsg = !vm.showFullMsg;
  }

  function style(option, parentOption) {
    let styles = [];
    if (vm.selected) {
      if (parentOption && parentOption.selectedChild && vm.selected.selectedChild) {
        if (vm.selected.selectedChild[vm.valuefield] === option[vm.valuefield]) {
          styles.push('select-selected');
        }
      } else if (_.isObjectLike(vm.selected) && vm.selected[vm.valuefield]) {
        if (vm.selected[vm.valuefield] === option[vm.valuefield]) {
          styles.push('select-selected');
        }
      } else {
        if (vm.selected === option) {
          styles.push('select-selected');
        }
      }
      if (option.css) {
        styles.push(option.css);
      }
    }
    if (option.childOptions) {
      styles.push('parent');
    }
    return !!styles && styles.join(' ') || false;
  }

  function change() {
    vm.menuOpen = true;
  }

  function onCloseFn() {
    vm.options = $filter('orderBy')(vm.options, '-isSelected', false);
    vm.toggleNestedMenu();
  }

  function addNewOption(value) {
    //before sending value out make sure it isn't in options already
    let i;
    for (i = 0; i < vm.options.length; i++) {
      if (vm.options[i] === value) {
        return;
      }
    }

    vm.options.push(value);
    vm.selectOption(value);
  }

  function changefunction(value) {
    if (vm.searchableCombo && !vm.refreshDataFn) {
      if (!vm.cloneOptions) {
        vm.cloneOptions = _.cloneDeep(vm.options);
      }
      vm.manualChange = true;
      vm.options = $filter('cssearchable')(vm.cloneOptions, vm.searchableCombo, value);
    }

    if (_.isFunction(vm.onChangeFn)) {
      vm.onChangeFn({
        value: value,
      });
    }

    if (_.isFunction(vm.refreshDataFn) && vm.searchableCombo && (vm.waitTime >= 0)) {
      if (vm.timeoutPromise) {
        $timeout.cancel(vm.timeoutPromise); //cancel previous timeout
      }
      vm.timeoutPromise = $timeout(function () {
        vm.refreshDataFn({
          filter: value,
        });
      }, vm.waitTime);
    }
  }

  function toggleOpen($event) {
    $event.preventDefault();
    $event.stopPropagation();
    if (!vm.isDisabled) {
      vm.menuOpen = !vm.menuOpen;
      // Make sure the search string is reset
      vm.filterOptions = '';
      // Refresh data because ng-change is not fired programmatically
      refreshData();
    }
  }

  function init() {
    if (_.isUndefined(vm.labelfield)) {
      vm.labelfield = 'label';
    }
    if (_.isUndefined(vm.valuefield)) {
      vm.valuefield = 'value';
    }
    vm.iconNested = vm.iconNested || 'icon-chevron-right';
    vm.icon = vm.icon || 'icon-chevron-down';
    vm.default = vm.default || (!vm.multi && !vm.nested);
    if (_.isUndefined(vm.waitTime)) {
      vm.waitTime = 1000;
    }
  }

  function refreshData() {
    if (_.isFunction(vm.refreshDataFn) && (vm.waitTime >= 0)) {
      if (vm.timeoutPromise) {
        $timeout.cancel(vm.timeoutPromise); //cancel previous timeout
      }
      vm.timeoutPromise = $timeout(function () {
        vm.refreshDataFn({
          filter: vm.filterOptions,
        });
      }, vm.waitTime);
    }
  }

  function getLabel(option) {
    let optlabel = '';
    if (_.isObjectLike(option)) {
      optlabel = option[vm.labelfield];
    } else {
      optlabel = option;
    }
    return optlabel;
  }
}


/* @ngInject */
export function csSelect($document, $timeout, $window, CSSelectService: CSSelectService) {
  let directive = {
    restrict: 'EA',
    template: selectTemplate,
    require: 'ngModel',
    scope: {
      ariaText: '@?',
      name: '@',
      options: '=',
      secondaryLabel: '@',
      labelfield: '@',
      valuefield: '@',
      selected: '=ngModel',
      placeholder: '=',
      inputPlaceholder: '=',
      required: '=csRequired',
      isDisabled: '=',
      hasError: '=',
      filter: '@',
      isCustomSearch: '<?',
      refreshDataFn: '&?',
      onChangeFn: '&',
      waitTime: '@',
      combo: '@',
      searchableCombo: '@?',
      multi: '@',
      singular: '@',
      plural: '@',
      max: '=',
      isError: '@',
      errorMsg: '@',
      isWarn: '@',
      warnMsg: '@',
      nested: '@',
      icon: '@',
      iconnested: '@',
    },
    link: function (scope, element, attrs, ngModel) {
      scope.csSelect.selectId = CSSelectService.getId();
      element.mouseenter(function () {
        if (element.find('.ellipsis')[0] !== undefined && element.find('.text-wrap')[0] !== undefined && (element.find('.ellipsis')[0].getBoundingClientRect().bottom >= element.find('.text-wrap')[0].getBoundingClientRect().bottom)) {
          scope.$apply(function () {
            scope.csSelect.isWrap = false;
          });
        } else {
          scope.$apply(function () {
            scope.csSelect.isWrap = true;
          });
        }
      });

      const keyBinding = function (event) {
        if (event.which === KeyCodes.ESCAPE) {
          element.find('#selectMain').focus();
        } else if (event.which === KeyCodes.LEFT) {
          scope.$apply(function () {
            scope.csSelect.toggleNestedMenu();
          });
        } else if (event.which === KeyCodes.RIGHT) {
          const index = _.toNumber(event.currentTarget.activeElement.getAttribute('option-number'));
          if (_.isFinite(index) && !_.get(scope.csSelect.options[index], 'menu', false)) {
            scope.$apply(function () {
              scope.csSelect.toggleNestedMenu(scope.csSelect.options[index]);
            });
          }
        }
      };

      scope.$watch(function () {
        return element.find('.dropdown-menu').is(':visible');
      }, function (newValue, oldValue) {
        if (newValue && newValue !== oldValue) {
          $window.document.addEventListener('keydown', keyBinding);
        } else if (!newValue && newValue !== oldValue) {
          $window.document.removeEventListener('keydown', keyBinding);
        }
      });

      let fullMsgOnClick = function (event) {
        let isChild = $(element).has(event.target).length > 0,
          isSelf = element[0] === event.target, isInside = isChild || isSelf;
        if (!isInside) {
          scope.$apply(function () {
            scope.csSelect.showFullMsg = false;
          });
        }
      };

      scope.$watch('csSelect.showFullMsg && csSelect.isWrap', function (newValue, oldValue) {
        if (newValue !== oldValue && newValue === true) {
          $document.bind('click', fullMsgOnClick);
        } else if (newValue !== oldValue && newValue === false) {
          $document.unbind('click', fullMsgOnClick);
        }
      });

      if (scope.csSelect.multi) {
        scope.csSelect.defaultPlaceholder = scope.csSelect.placeholder;

        let setPlaceholder = function () {
          if (scope.csSelect.selected.length === 0) {
            scope.csSelect.placeholder = scope.csSelect.defaultPlaceholder;
          } else if (scope.csSelect.selected.length === 1) {
            scope.csSelect.placeholder = scope.csSelect.selected.length + ' ' + scope.csSelect.singular + ' Selected';
          } else {
            scope.csSelect.placeholder = scope.csSelect.selected.length + ' ' + scope.csSelect.plural + ' Selected';
          }
        };
        setPlaceholder();

        let onClick = function (event) {
          let isChild = $(element).has(event.target).length > 0,
            isSpan = $(element).text().indexOf(event.target.innerText) !== -1,
            isSelf = element[0] === event.target,
            isInside = isChild || isSelf || isSpan;
          if (!isInside) {
            scope.$apply(function () {
              scope.csSelect.menuOpen = false;
              $(element).find('.dropdown-menu').scrollTop(0);
            });
          }
        };

        scope.$watch('csSelect.menuOpen', function (newValue, oldValue) {
          element.find('.dropdown-menu').addClass('visible');
          if (newValue !== oldValue && newValue === true) {
            $document.bind('click', onClick);
            scope.csSelect.onCloseFn();
          } else if (newValue !== oldValue && newValue === false) {
            $document.unbind('click', onClick);
          }
        });

        scope.$watch('csSelect.options', function (newValue, oldValue) {
          if (_.isArray(newValue) && _.isArray(oldValue) && (newValue.length !== oldValue.length)) {
            setPlaceholder();
          }
        });

        scope.$watch('csSelect.selected', function (newValue, oldValue) {
          if (_.isArray(newValue) && _.isArray(oldValue) && (newValue.length !== oldValue.length)) {
            setPlaceholder();
          }
        });

        scope.csSelect.selectOption = function (option) {
          if (_.isUndefined(scope.csSelect.selected) || !_.includes(_.map(scope.csSelect.selected, scope.csSelect.valuefield), option[scope.csSelect.valuefield])) {
            if (!_.isUndefined(scope.csSelect.max)) {
              if (scope.csSelect.selected.length === scope.csSelect.max) {
                return;
              } else if (scope.csSelect.selected.length === (scope.csSelect.max - 1)) {
                scope.csSelect.isDisable = true;
              } else {
                scope.csSelect.isDisable = false;
              }
            }
            scope.csSelect.selected.push(option);
            option.isSelected = true;
            ngModel.$setViewValue(scope.csSelect.selected);
            setPlaceholder();
            scope.csSelect.changefunction(option);
          } else {
            _.forEach(scope.csSelect.selected, function (value, key) {
              if (!_.isUndefined(value) && value[scope.csSelect.valuefield] === option[scope.csSelect.valuefield]) {
                scope.csSelect.selected.splice(key, 1);
                ngModel.$setViewValue(scope.csSelect.selected);
                setPlaceholder();
                option.isSelected = false;
                scope.csSelect.isDisable = false;
                scope.csSelect.changefunction(option);
              }
            });
          }
        };
      } else {
        scope.csSelect.selectOption = function (option, parentOption) {
          if (_.isUndefined(scope.csSelect.selected) || option !== scope.csSelect.selected) {
            // return parent with injected child if found
            if (parentOption) {
              parentOption.selectedChild = option;
              option = parentOption;
            }
            scope.csSelect.clickedComboSelection = true;
            ngModel.$setViewValue(option);
            scope.csSelect.changefunction(option);
          }
        };
        if (scope.csSelect.combo && !scope.csSelect.isDisabled) {
          element.on('click', function () {
            $timeout(function () {
              if (!scope.csSelect.clickedComboSelection) {
                scope.csSelect.menuOpen = true;
              }
              scope.csSelect.clickedComboSelection = false;
            }, 0);
          });
          scope.$watch('csSelect.menuOpen', function (newValue, oldValue) {
              if (newValue !== oldValue && newValue === true && scope.csSelect.cloneOptions) {
                  scope.csSelect.options = _.cloneDeep(scope.csSelect.cloneOptions);
              }
          });

          scope.$watch('csSelect.options', function (newValue, oldValue) {
              if (_.isArray(newValue) && _.isArray(oldValue) && (newValue !== oldValue) && !scope.csSelect.manualChange) {
                  scope.csSelect.cloneOptions = _.cloneDeep(newValue);
              } else {
                scope.csSelect.manualChange = false;
              }
          });
        }
      }
    },
    controller: csSelectCtrl,
    controllerAs: 'csSelect',
    bindToController: true,
    replace: true,
  };
  return directive;
}

const selectTemplate = `
  <div class="csSelect-container">
    <div class="select-list {{ csSelect.getStyle() }}">
      <select
        class="hidden-select"
        ng-model="csSelect.selected"
        name="{{::csSelect.name}}"
        ng-required="csSelect.required"
        tabindex="-1"
        ng-options="option[csSelect.labelfield] for option in [csSelect.selected] track by option[csSelect.valuefield]"
      >
      </select>

      <div ng-if="csSelect.nested" cs-dropdown cs-is-disabled="{{ csSelect.isDisabled }}" is-open="csSelect.menuOpen">
        <span
          ng-if="!csSelect.combo"
          id="selectMain"
          class="select-toggle form-control"
          tabindex="0"
          role="combobox"
          aria-label="{{ csSelect.getAriaText() }}"
          aria-expanded="{{ csSelect.menuOpen }}"
          ng-click="csSelect.toggleOpen($event);"
          ng-class="{disabled: csSelect.isDisabled, 'hasError': csSelect.hasError}"
        >
          {{ csSelect.getLabel(csSelect.selected) }}{{ csSelect.selected.selectedChild && ' : ' }}{{ csSelect.getLabel(csSelect.selected.selectedChild) }}
          <span class="placeholder" ng-show="!csSelect.getLabel(csSelect.selected)">{{::csSelect.placeholder}}</span>
          <i class="icon" ng-class="csSelect.icon"></i>
        </span>
        <div class="msg-container">
          <div class="ellipsis" ng-click="csSelect.toggleFullMsg()" ng-if="csSelect.getMsg() !== ''" ng-class="{'pointer': csSelect.isWrap}">
            <span class="icon"></span> <span class="text-wrap">{{ csSelect.getMsg() }}</span>
          </div>
          <div class="message" ng-if="csSelect.showFullMsg && csSelect.isWrap">{{ csSelect.getMsg() }}</div>
        </div>
        <div class="dropdown-menu" ng-class="{'combo-dropdown': csSelect.combo, 'nested': csSelect.nested}" cs-dropdown-menu role="menu">
          <input
            ng-if="csSelect.filter === 'true'"
            class="select-filter"
            ng-class="{'filterfocus' : csSelect.menuOpen}"
            type="text"
            ng-model="csSelect.filterOptions"
            ng-click="$event.stopPropagation()"
            placeholder="{{::csSelect.inputPlaceholder}}"
            ng-change="csSelect.refreshData()"
          />
          <ul class="select-options" role="listbox">
            <li
              ng-if="csSelect.isCustomSearch"
              ng-repeat="option in csSelect.options | cssearchable:csSelect.searchableCombo:csSelect.selected track by $index"
              class="{{::csSelect.style(option)}}"
              ng-class="{'hover': option.menu}"
              ng-click="csSelect.nestedMenuSelection($event, option)"
              ng-mouseover="csSelect.mouseover($index)"
              option-number="{{ $index }}"
              id="nestedParent{{ $index }}"
            >
              <a ng-if="!option.childOptions" role="option" id="{{ csSelect.selectId }}-{{ $index }}" title="{{ csSelect.getLabel(option) }}">{{ csSelect.getLabel(option) }}</a>
              <a ng-if="option.childOptions" class="parent" title="{{ csSelect.getLabel(option) }}">
                <span>{{ csSelect.getLabel(option.label) }}</span>
                <i class="icon" ng-class="csSelect.iconnested"></i>
              </a>
              <ul ng-if="option.childOptions" class="sub-menu">
                <li class="nested-option" ng-repeat="childOption in option.childOptions" ng-class="csSelect.style(childOption, option)" ng-click="csSelect.selectOption(childOption, option)">
                  <a role="option" id="{{ csSelect.selectId }}-{{ $index }}" title="{{ csSelect.getLabel(childOption) }}">{{ csSelect.getLabel(childOption) }}</a>
                </li>
              </ul>
            </li>
            <li
              ng-if="!csSelect.isCustomSearch"
              ng-repeat="option in csSelect.options | filter:csSelect.filterOptions | cssearchable:csSelect.searchableCombo:csSelect.selected track by $index"
              class="{{::csSelect.style(option)}}"
              ng-class="{'hover': option.menu}"
              ng-click="csSelect.nestedMenuSelection($event, option)"
              ng-mouseover="csSelect.mouseover($index)"
              option-number="{{ $index }}"
              id="nestedParent{{ $index }}"
            >
              <a ng-if="!option.childOptions" role="option" id="{{ csSelect.selectId }}-{{ $index }}" title="{{ csSelect.getLabel(option) }}">{{ csSelect.getLabel(option) }}</a>
              <a ng-if="option.childOptions" class="parent" title="{{ csSelect.getLabel(option) }}">
                <span>{{ csSelect.getLabel(option.label) }}</span>
                <i class="icon" ng-class="csSelect.iconnested"></i>
              </a>
              <ul ng-if="option.childOptions" class="sub-menu">
                <li class="nested-option" ng-repeat="childOption in option.childOptions" ng-class="csSelect.style(childOption, option)" ng-click="csSelect.selectOption(childOption, option)">
                  <a role="option" id="{{ csSelect.selectId }}-{{ $index }}" title="{{ csSelect.getLabel(childOption) }}">{{ csSelect.getLabel(childOption) }}</a>
                </li>
              </ul>
            </li>
          </ul>
        </div>
      </div>

      <div ng-if="csSelect.multi" cs-dropdown cs-is-disabled="{{ csSelect.isDisabled }}" class="cs-select-multi" ng-class="{'open': csSelect.menuOpen}" is-open="csSelect.menuOpen">
        <span
          id="selectMain"
          class="select-toggle form-control"
          tabindex="0"
          role="combobox"
          aria-label="{{ csSelect.getAriaText() }}"
          aria-expanded="{{ csSelect.menuOpen }}"
          ng-click="csSelect.toggleOpen($event)"
          ng-class="{disabled: csSelect.isDisabled, 'hasError': csSelect.hasError}"
        >
          {{ csSelect.placeholder }}
          <i class="icon" ng-class="csSelect.icon"></i>
        </span>
        <div class="msg-container">
          <div class="ellipsis" ng-click="csSelect.toggleFullMsg()" ng-if="csSelect.getMsg() !== ''" ng-class="{'pointer': csSelect.isWrap}">
            <span class="icon"></span> <span class="text-wrap">{{ csSelect.getMsg() }}</span>
          </div>
          <div class="message" ng-if="csSelect.showFullMsg && csSelect.isWrap">{{ csSelect.getMsg() }}</div>
        </div>
        <div class="dropdown-menu" cs-dropdown-menu role="menu">
          <input
            ng-if="csSelect.filter === 'true'"
            class="select-filter"
            ng-class="{'filterfocus' : csSelect.menuOpen}"
            type="text"
            ng-model="csSelect.filterOptions"
            ng-click="$event.stopPropagation()"
            placeholder="{{::csSelect.inputPlaceholder}}"
            ng-change="csSelect.refreshData()"
          />
          <ul class="select-options">
            <li ng-if="csSelect.isCustomSearch" ng-repeat="option in csSelect.options" ng-click="csSelect.selectOption(option)">
              <a title="{{ csSelect.getLabel(option) }}">
                <input cs-input type="checkbox" ng-disabled="csSelect.isDisable" ng-model="option.isSelected" cs-input-label="{{ csSelect.getLabel(option) }}" />
              </a>
            </li>
            <li ng-if="!csSelect.isCustomSearch" ng-repeat="option in csSelect.options | filter:csSelect.filterOptions" ng-click="csSelect.selectOption(option)">
              <a title="{{ csSelect.getLabel(option) }}">
                <input cs-input type="checkbox" ng-disabled="csSelect.isDisable" ng-model="option.isSelected" cs-input-label="{{ csSelect.getLabel(option) }}" />
              </a>
            </li>
          </ul>
        </div>
      </div>

      <div ng-if="csSelect.default" cs-dropdown cs-keyboard-nav="true" cs-typeable="{{ csSelect.combo ? 'true' : 'false' }}" cs-is-disabled="{{ csSelect.isDisabled }}" is-open="csSelect.menuOpen">
        <span
          ng-if="!csSelect.combo"
          id="selectMain"
          class="select-toggle form-control"
          tabindex="0"
          role="combobox"
          aria-label="{{ csSelect.getAriaText() }}"
          aria-expanded="{{ csSelect.menuOpen }}"
          ng-click="csSelect.toggleOpen($event);"
          ng-class="{disabled: csSelect.isDisabled, 'hasError': csSelect.hasError}"
        >
          {{ csSelect.getLabel(csSelect.selected) }}
          <span class="placeholder" ng-show="!csSelect.getLabel(csSelect.selected)">{{::csSelect.placeholder}}</span>
          <i class="icon" ng-class="csSelect.icon"></i>
        </span>
        <div ng-if="csSelect.combo" class="combo-box" ng-model="csSelect.selected" ng-disabled="csSelect.isDisabled" ng-class="{'hasError': csSelect.hasError}">
          <input
            type="text"
            class="combo-input select-toggle"
            placeholder="{{::csSelect.placeholder}}"
            ng-model="csSelect.selected"
            ng-focus="csSelect.openMenu()"
            ng-disabled="csSelect.isDisabled"
            ng-change="csSelect.changefunction(csSelect.selected)"
          />
          <div class="combo-box-button">
            <button class="combo-btn" id="selectMain" ng-click="csSelect.toggleOpen($event);" aria-label="{{ csSelect.getAriaText() }}">
              <i class="icon" ng-class="csSelect.icon"></i>
            </button>
          </div>
        </div>
        <div class="msg-container">
          <div class="ellipsis" ng-click="csSelect.toggleFullMsg()" ng-if="csSelect.getMsg() !== ''" ng-class="{'pointer': csSelect.isWrap}">
            <span class="icon"></span> <span class="text-wrap">{{ csSelect.getMsg() }}</span>
          </div>
          <div class="message" ng-if="csSelect.showFullMsg && csSelect.isWrap">{{ csSelect.getMsg() }}</div>
        </div>
        <div class="dropdown-menu" ng-class="{'combo-dropdown': csSelect.combo}" cs-dropdown-menu role="menu">
          <input
            ng-if="csSelect.filter === 'true'"
            class="select-filter"
            ng-class="{'filterfocus' : csSelect.menuOpen}"
            type="text"
            ng-model="csSelect.filterOptions"
            ng-click="$event.stopPropagation()"
            placeholder="{{::csSelect.inputPlaceholder}}"
            ng-change="csSelect.refreshData()"
          />
          <ul class="select-options">
            <li ng-if="csSelect.isCustomSearch" ng-repeat="option in csSelect.options track by $index" ng-class="csSelect.style(option)" ng-click="csSelect.selectOption(option)">
              <a title="{{ csSelect.getLabel(option) }}">{{ csSelect.getLabel(option) }}</a>
            </li>
            <li
              ng-if="!csSelect.isCustomSearch"
              ng-repeat="option in csSelect.options | filter:csSelect.filterOptions track by $index"
              ng-class="csSelect.style(option)"
              ng-click="csSelect.selectOption(option)"
            >
              <a title="{{ csSelect.getLabel(option) }}">{{ csSelect.getLabel(option) }}</a>
            </li>
          </ul>
        </div>
      </div>
    </div>

    <div class="secondary-label" ng-if="csSelect.secondaryLabel">{{ csSelect.secondaryLabel }}</div>
  </div>
`;
/*
* @name Simple Select
* @description
* @category controls
* @component selects
* @section simple
*
* @param name the name of the select
* @param options the array of choices
* @param labelfield the field of the array to use as a labelfield (defaults to label)
* @param valuefield the field of the array to use for the value
* @param ng-model the selected value
* @param placeholder the text to show when nothing is selected
* @param required true or false depending on if the select is a required field
* @param is-disabled true or false depending on if the select is disabled or not
* @param has-error true or false depending on if there is an error or not
* @param filter true to use the filtering select (shown below)
* @param refresh-data-fn the function to call when refreshing the data (ie. after the filter is applied)
* @param on-change-fn you can specifiy a funciton to call when the value of the select changes
* @param wait-time the time to wait in milliseconds before refreshing data (defaults to 1000)
* @param is-error flag which controls the error state
* @param error-msg the field which sets the error message.
* @param is-warn flag which controls the warning state
* @param warn-msg the field which sets the warning message.
* @param secondary-label the secondary label to show for the values.
* @param icon - icon for the open
*
*@html
<div ng-controller="SelectAddExampleController as sel">
  <p>Selected  <span class="badge">{{sel.selected}}</span></p>
  <form id="myForm">
  <div class="row">
    <div class="large-3">
      <cs-select
        ng-model="sel.selected"
        options="sel.options"
        placeholder="sel.selectPlaceholder"
        >
      </cs-select>
    </div>
  </div>
  </form>
</div>
*
* @js
(function () {
  'use strict';

  angular
    .module('app.forms')
    .controller('SelectAddExampleController', SelectAddExampleController);

  function SelectAddExampleController($http) {

    var vm = this;
    vm.options = [];
    vm.selectPlaceholder = 'Select One';
    vm.selected = '';

    activate();

    function activate() {}

    vm.options = [
      'Voicemail',
      'Office',
      '214-555-1212',
      '214-555-2323',
      '214-555-3434',
      '214-555-4545'
    ];

  }
})();
*/



/*
* @name Nested Array
* @description
* @category controls
* @component selects
* @section nested-array
*
* @param name the name of the select
* @param options the array of choices
* @param labelfield the field of the array to use as a labelfield (defaults to label)
* @param valuefield the field of the array to use for the value
* @param ng-model the selected value
* @param placeholder the text to show when nothing is selected
* @param required true or false depending on if the select is a required field
* @param is-disabled true or false depending on if the select is disabled or not
* @param has-error true or false depending on if there is an error or not
* @param filter true to use the filtering select (shown below)
* @param refresh-data-fn the function to call when refreshing the data (ie. after the filter is applied)
* @param on-change-fn you can specifiy a funciton to call when the value of the select changes
* @param wait-time the time to wait in milliseconds before refreshing data (defaults to 1000)
* @param is-error flag which controls the error state
* @param error-msg the field which sets the error message.
* @param is-warn flag which controls the warning state
* @param warn-msg the field which sets the warning message.
* @param secondary-label the secondary label to show for the values.
* @param icon - icon for the open
* @param iconnested - the nested open icon
*
*@html
<div ng-controller="NestedSelectExampleController as sel">
  <p>Selected  <span class="badge">{{sel.selected.label}}{{(sel.selected.selectedChild && ' : ')}}{{sel.selected.selectedChild.label}}</span></p>
  <form id="myForm">
  <div class="row">
    <div class="large-4">
      <cs-select
        ng-model="sel.selected"
        options="sel.options"
        placeholder="sel.selectPlaceholder"
        nested="true"
        icon="icon-chevron-down"
        iconnested="icon-chevron-right"
        >
      </cs-select>
    </div>
  </div>
  </form>
</div>
*@js
(function () {
  'use strict';

  angular
    .module('app.forms')
    .controller('NestedSelectExampleController', NestedSelectExampleController);


  function NestedSelectExampleController($http) {

    var vm = this;
    vm.options = [];
    vm.repeatOptions = [];
    vm.selectPlaceholder = 'Select One';
    vm.selected = '';
    vm.nested = true;

    activate();

    function activate() {}
    vm.repeatOptions = [{
      label: 'Once',
      name: 'phoneMenuRepeatOnce',
      value: 2
    }, {
      label: 'Twice',
      name: 'phoneMenuRepeatTwice',
      value: 3
    }, {
      label: 'Three Times',
      name: 'phoneMenuRepeatThree',
      value: 4
    }, {
      label: 'Four Times',
      name: 'phoneMenuRepeatFour',
      value: 5
    }, {
      label: 'Five Times',
      name: 'phoneMenuRepeatFive',
      value: 6
    }];
    vm.options = [{
      label: 'Continue To Next Step',
      name: 'repeatMenu',
      action: 'repeatActionsOnInput',
      value: '1'
    }, {
      label: 'Repeat Menu',
      name: 'repeatMenu',
      action: 'repeatActionsOnInput',
      value: '2',
      childOptions: vm.repeatOptions
    }, {
      label: 'Repeat and Continue To Next Step',
      name: 'repeatMenuContinue',
      action: 'repeatActionsOnInputContinue',
      value: '3',
      childOptions: vm.repeatOptions
    }, {
      label: 'Return To Previous Menu',
      name: 'returnPreviousMenu',
      action: 'returnPreviousActionsOnInput',
      value: '4'
    }, ];
  }
})();
*/

/*
* @name Array of Objects
* @description
* @category controls
* @component selects
* @section array-of-objects
*
* @param name the name of the select
* @param options the array of choices
* @param labelfield the field of the array to use as a labelfield (defaults to label)
* @param valuefield the field of the array to use for the value
* @param ng-model the selected value
* @param placeholder the text to show when nothing is selected
* @param required true or false depending on if the select is a required field
* @param is-disabled true or false depending on if the select is disabled or not
* @param has-error true or false depending on if there is an error or not
* @param filter true to use the filtering select (shown below)
* @param refresh-data-fn the function to call when refreshing the data (ie. after the filter is applied)
* @param on-change-fn you can specifiy a funciton to call when the value of the select changes
* @param wait-time the time to wait in milliseconds before refreshing data (defaults to 1000)
* @param is-error flag which controls the error state
* @param error-msg the field which sets the error message.
* @param is-warn flag which controls the warning state
* @param warn-msg the field which sets the warning message.
* @param secondary-label the secondary label to show for the values.
* @param icon - icon for the open
* @param iconnested - the nested open icon
*
*@html
<div ng-controller="SelectBasicExampleController as sel">
  <p>Selected label is <span class="badge">{{sel.selected.label}}</span>&nbsp;&nbsp;&nbsp; Selected value is <span class="badge">{{sel.selected.value}}</span></p>
  <form id="myForm">
  <div class="row">
    <div class="col-sm-6">
      <cs-select
        name="myselect"
        ng-model="sel.selected"
        options="sel.options"
        labelfield="label"
        valuefield="value"
        placeholder="sel.selectPlaceholder"
        on-change-fn="sel.commitMe()"
        filter="false"
    >
      </cs-select>
    </div>
  </div>
  </form>
</div>
*
*@js
*(function () {
*  'use strict';
*
*  angular
*    .module('app.forms')
*    .controller('SelectBasicExampleController', SelectBasicExampleController);
*
*  function SelectBasicExampleController($http) {
*
*    var vm = this;
*    vm.getoptions = getoptions;
*    vm.options = [];
*    vm.filterPlaceholder = 'Select';
*    vm.selectPlaceholder = 'Select a State';
*    vm.inputPlaceholder = 'start typing here';
*    vm.commitMe = commitMe;
*    vm.selected = {};
*
*   activate();
*
*    function activate() {}
*
*    function commitMe() {
*      console.log('I am commited');
*    }
*
*    vm.selected = {
*      label: '',
*      value: ''
*    };
*
*    function getoptions(filter) {
*
*      $http.get('selectoptions.json').then(function onSuccess(response) {
*        vm.options = response.data;
*      }, function onError(response) {
*        console.log('ERROR');
*      });
*    }
*
*    vm.getoptions();
*  }
*})();
*/

/*
* @name Filtered Select
* @description
* @category controls
* @component selects
* @section filtered-select
*
* @param name the name of the select
* @param options the array of choices
* @param labelfield the field of the array to use as a labelfield (defaults to label)
* @param valuefield the field of the array to use for the value
* @param ng-model the selected value
* @param placeholder the text to show when nothing is selected
* @param required true or false depending on if the select is a required field
* @param is-disabled true or false depending on if the select is disabled or not
* @param has-error true or false depending on if there is an error or not
* @param filter true to use the filtering select (shown below)
* @param refresh-data-fn the function to call when refreshing the data (ie. after the filter is applied)
* @param on-change-fn you can specifiy a funciton to call when the value of the select changes
* @param wait-time the time to wait in milliseconds before refreshing data (defaults to 1000)
* @param is-error flag which controls the error state
* @param error-msg the field which sets the error message.
* @param is-warn flag which controls the warning state
* @param warn-msg the field which sets the warning message.
* @param secondary-label the secondary label to show for the values.
* @param icon - icon for the open
*
*@html
<div ng-controller="SelectFilterExampleController as sel">
  <p>Selected label is <span class="badge">{{sel.selected.label}}</span>&nbsp;&nbsp;&nbsp; Selected value is <span class="badge">{{sel.selected.value}}</span></p>
  <div class="row">
    <div class="col-sm-6">
      <cs-select
        ng-model="sel.selected"
        options="sel.options"
        labelfield="label"
        valuefield="value"
        placeholder="sel.selectPlaceholder"
        input-placeholder="sel.inputPlaceholder"
        required="sel.required"
        filter="true"
        refresh-data-fn="sel.getoptions(filter)">
      </cs-select>
    </div>
  </div>
</div>
*
* @js
*(function () {
  'use strict';

  angular
    .module('app.forms')
    .controller('SelectFilterExampleController', SelectFilterExampleController);

  function SelectFilterExampleController($http) {
    var vm = this;
    vm.getoptions = getoptions;
    vm.options = [];
    vm.filterPlaceholder = 'Select';
    vm.selectPlaceholder = 'Select a State';
    vm.inputPlaceholder = 'start typing here';
    vm.selected = {};

    activate();

    function activate() {}

    vm.selected = {
      label: '',
      value: ''
    };

    function getoptions(filter) {

      $http.get('selectoptions.json').then(function onSuccess(response) {
        vm.options = response.data;
      }, function onError(response) {
        console.log('ERROR');
      });
    }

    vm.getoptions();
  }
})();
*/

/*
* @name Disabled Select
* @description
* @category controls
* @component selects
* @section disabled-select
*
* @param name the name of the select
* @param options the array of choices
* @param labelfield the field of the array to use as a labelfield (defaults to label)
* @param valuefield the field of the array to use for the value
* @param ng-model the selected value
* @param placeholder the text to show when nothing is selected
* @param required true or false depending on if the select is a required field
* @param is-disabled true or false depending on if the select is disabled or not
* @param has-error true or false depending on if there is an error or not
* @param filter true to use the filtering select (shown below)
* @param refresh-data-fn the function to call when refreshing the data (ie. after the filter is applied)
* @param on-change-fn you can specifiy a funciton to call when the value of the select changes
* @param wait-time the time to wait in milliseconds before refreshing data (defaults to 1000)
* @param is-error flag which controls the error state
* @param error-msg the field which sets the error message.
* @param is-warn flag which controls the warning state
* @param warn-msg the field which sets the warning message.
* @param secondary-label the secondary label to show for the values.
* @param icon - icon for the open
*
*@html
<div ng-controller="SelectDisabledExampleController as select">
  <div class="row">
    <div class="col-sm-6">
      <cs-select
        ng-model="select.selected"
        options="select.options"
        labelfield="label"
        placeholder="select.selectPlaceholder"
        required="select.required"
        filter="true"
        is-disabled="true">
      </cs-select>
    </div>
  </div>
</div>
*
* @js
(function () {
  'use strict';

  angular
    .module('app.forms')
    .controller('SelectDisabledExampleController', SelectDisabledExampleController);

  function SelectDisabledExampleController() {
    var vm = this;
    vm.options = [];
    vm.filterPlaceholder = 'Select';
    vm.selectPlaceholder = 'Select a State';
    vm.selected = {};

    activate();

    function activate() {}

    vm.selected = {
      label: '',
      value: ''
    };

    vm.options = [{
      value: 'AL',
      label: 'Alabama'
    }, {
      value: 'AK',
      label: 'Alaska'
    }, {
      value: 'AZ',
      label: 'Arizona'
    }, {
      value: 'AR',
      label: 'Arkansas'
    }, {
      value: 'CA',
      label: 'California'
    }, {
      value: 'CO',
      label: 'Colorado'
    }, {
      value: 'CT',
      label: 'Connecticut'
    }, {
      value: 'DE',
      label: 'Delaware'
    }, {
      value: 'DC',
      label: 'District Of Columbia'
    }, {
      value: 'FL',
      label: 'Florida'
    }, {
      value: 'GA',
      label: 'Georgia'
    }, {
      value: 'HI',
      label: 'Hawaii'
    }, {
      value: 'ID',
      label: 'Idaho'
    }, {
      value: 'IL',
      label: 'Illinois'
    }, {
      value: 'IN',
      label: 'Indiana'
    }, {
      value: 'IA',
      label: 'Iowa'
    }, {
      value: 'KS',
      label: 'Kansas'
    }, {
      value: 'KY',
      label: 'Kentucky'
    }, {
      value: 'LA',
      label: 'Louisiana'
    }, {
      value: 'ME',
      label: 'Maine'
    }, {
      value: 'MD',
      label: 'Maryland'
    }, {
      value: 'MA',
      label: 'Massachusetts'
    }, {
      value: 'MI',
      label: 'Michigan'
    }, {
      value: 'MN',
      label: 'Minnesota'
    }, {
      value: 'MS',
      label: 'Mississippi'
    }, {
      value: 'MO',
      label: 'Missouri'
    }, {
      value: 'MT',
      label: 'Montana'
    }, {
      value: 'NE',
      label: 'Nebraska'
    }, {
      value: 'NV',
      label: 'Nevada'
    }, {
      value: 'NH',
      label: 'New Hampshire'
    }, {
      value: 'NJ',
      label: 'New Jersey'
    }, {
      value: 'NM',
      label: 'New Mexico'
    }, {
      value: 'NY',
      label: 'New York'
    }, {
      value: 'NC',
      label: 'North Carolina'
    }, {
      value: 'ND',
      label: 'North Dakota'
    }, {
      value: 'OH',
      label: 'Ohio'
    }, {
      value: 'OK',
      label: 'Oklahoma'
    }, {
      value: 'OR',
      label: 'Oregon'
    }, {
      value: 'PA',
      label: 'Pennsylvania'
    }, {
      value: 'RI',
      label: 'Rhode Island'
    }, {
      value: 'SC',
      label: 'South Carolina'
    }, {
      value: 'SD',
      label: 'South Dakota'
    }, {
      value: 'TN',
      label: 'Tennessee'
    }, {
      value: 'TX',
      label: 'Texas'
    }, {
      value: 'UT',
      label: 'Utah'
    }, {
      value: 'VT',
      label: 'Vermont'
    }, {
      value: 'VA',
      label: 'Virginia'
    }, {
      value: 'WA',
      label: 'Washington'
    }, {
      value: 'WV',
      label: 'West Virginia'
    }, {
      value: 'WI',
      label: 'Wisconsin'
    }, {
      value: 'WY',
      label: 'Wyoming'
    }];
  }
})();
*/

/*
* @name Combo Box
* @description
* @category controls
* @component selects
* @section combo-box
*
* @param name the name of the select
* @param options the array of choices
* @param labelfield the field of the array to use as a labelfield (defaults to label)
* @param valuefield the field of the array to use for the value
* @param ng-model the selected value
* @param placeholder the text to show when nothing is selected
* @param required true or false depending on if the select is a required field
* @param is-disabled true or false depending on if the select is disabled or not
* @param has-error true or false depending on if there is an error or not
* @param filter true to use the filtering select (shown below)
* @param refresh-data-fn the function to call when refreshing the data (ie. after the filter is applied)
* @param on-change-fn you can specifiy a funciton to call when the value of the select changes
* @param wait-time the time to wait in milliseconds before refreshing data (defaults to 1000)
* @param is-error flag which controls the error state
* @param error-msg the field which sets the error message.
* @param is-warn flag which controls the warning state
* @param warn-msg the field which sets the warning message.
* @param secondary-label the secondary label to show for the values.
* @param icon - icon for the open
*
*@html
<div ng-controller="SelectComboController as sel">
  <p>Selected  <span class="badge">{{sel.selected}}</span></p>
  <form id="myForm">
  <div class="row">
    <div class="large-3">
      <cs-select
        ng-model="sel.selected"
        options="sel.options"
        placeholder="sel.selectPlaceholder"
        combo="true"
        >
      </cs-select>
    </div>
  </div>
  </form>
</div>
*
* @js
(function () {
  'use strict';

  angular
    .module('app.forms')
    .controller('SelectComboController', SelectAddExampleController);

  function SelectAddExampleController($http) {

    var vm = this;
    vm.options = [];
    vm.selectPlaceholder = 'Select One';
    vm.combo = true;
    vm.searchable = true;
    vm.selected = '';
    vm.maximum = 5;

    activate();

    function activate() {}

    vm.options = [
      'Voicemail',
      'Office',
      '214-555-1212',
      '214-555-2323',
      '214-555-3434',
      '214-555-4545'
    ];

  }
})();
*/

/*
* @name Searchable Combo Box
* @description
* @category controls
* @component selects
* @section searchable-combo-box
*
* @param name the name of the select
* @param options the array of choices
* @param labelfield the field of the array to use as a labelfield (defaults to label)
* @param valuefield the field of the array to use for the value
* @param ng-model the selected value
* @param placeholder the text to show when nothing is selected
* @param required true or false depending on if the select is a required field
* @param is-disabled true or false depending on if the select is disabled or not
* @param has-error true or false depending on if there is an error or not
* @param filter true to use the filtering select (shown below)
* @param refresh-data-fn the function to call when refreshing the data (ie. after the filter is applied)
* @param on-change-fn you can specifiy a funciton to call when the value of the select changes
* @param wait-time the time to wait in milliseconds before refreshing data (defaults to 1000)
* @param is-error flag which controls the error state
* @param error-msg the field which sets the error message.
* @param is-warn flag which controls the warning state
* @param warn-msg the field which sets the warning message.
* @param secondary-label the secondary label to show for the values.
* @param icon - icon for the open
*
*@html
<div ng-controller="SelectSearchableComboController as sel">
  <p>Selected  <span class="badge">{{sel.selected}}</span></p>
  <form id="myForm">
  <div class="row">
    <div class="large-3">
      <cs-select
        ng-model="sel.selected"
        options="sel.options"
        placeholder="sel.selectPlaceholder"
        combo="true"
        searchable-combo="true"
        >
      </cs-select>
    </div>
  </div>
  </form>
</div>
*
* @js
(function () {
  'use strict';

  angular
    .module('app.forms')
    .controller('SelectSearchableComboController', SelectAddExampleController);

  function SelectAddExampleController($http) {

    var vm = this;
    vm.options = [];
    vm.selectPlaceholder = 'Select One';
    vm.combo = true;
    vm.searchable = true;
    vm.selected = '';
    vm.maximum = 5;
    vm.model = {};
    vm.list = [{
      key: 'example',
      type: 'select',
      templateOptions: {
        label: 'Example Field',
        placeholder: 'Example',
        combo: true,
        searchableCombo: true
      }
    }];

    activate();

    function activate() {}

    vm.options = [
      'Voicemail',
      'Office',
      '214-555-1212',
      '214-555-2323',
      '214-555-3434',
      '214-555-4545'
    ];

  }
})();
*/

/*
* @name Disabled Searchable Combo Box
* @description
* @category controls
* @component selects
* @section disabled-searchable-combo-box
*
* @param name the name of the select
* @param options the array of choices
* @param labelfield the field of the array to use as a labelfield (defaults to label)
* @param valuefield the field of the array to use for the value
* @param ng-model the selected value
* @param placeholder the text to show when nothing is selected
* @param required true or false depending on if the select is a required field
* @param is-disabled true or false depending on if the select is disabled or not
* @param has-error true or false depending on if there is an error or not
* @param filter true to use the filtering select (shown below)
* @param refresh-data-fn the function to call when refreshing the data (ie. after the filter is applied)
* @param on-change-fn you can specifiy a funciton to call when the value of the select changes
* @param wait-time the time to wait in milliseconds before refreshing data (defaults to 1000)
* @param is-error flag which controls the error state
* @param error-msg the field which sets the error message.
* @param is-warn flag which controls the warning state
* @param warn-msg the field which sets the warning message.
* @param secondary-label the secondary label to show for the values.
* @param icon - icon for the open
*
*@html
<div ng-controller="SelectSearchableComboController as sel">
  <form id="myForm">
  <div class="row">
    <div class="large-3">
      <cs-select
        ng-model="sel.selected"
        options="sel.options"
        placeholder="sel.selectPlaceholder"
        is-disabled="true"
        combo="true"
        searchable-combo="true"
        >
      </cs-select>
    </div>
  </div>
  </form>
</div>
*
* @js
(function () {
  'use strict';

  angular
    .module('app.forms')
    .controller('SelectSearchableComboController', SelectAddExampleController);

  function SelectAddExampleController($http) {

    var vm = this;
    vm.options = [];
    vm.selectPlaceholder = 'Select One';
    vm.combo = true;
    vm.searchable = true;
    vm.selected = '';
    vm.maximum = 5;
    vm.model = {};
    vm.list = [{
      key: 'example',
      type: 'select',
      templateOptions: {
        label: 'Example Field',
        placeholder: 'Example',
        combo: true,
        searchableCombo: true
      }
    }];

    activate();

    function activate() {}

    vm.options = [
      'Voicemail',
      'Office',
      '214-555-1212',
      '214-555-2323',
      '214-555-3434',
      '214-555-4545'
    ];
  }
})();
*/

/*
* @name Multi Select
* @description
* @category controls
* @component selects
* @section multi-select
*
* @param name the name of the select
* @param options the array of choices
* @param labelfield the field of the array to use as a labelfield (defaults to label)
* @param valuefield the field of the array to use for the value
* @param ng-model the selected value
* @param placeholder the text to show when nothing is selected
* @param required true or false depending on if the select is a required field
* @param is-disabled true or false depending on if the select is disabled or not
* @param has-error true or false depending on if there is an error or not
* @param filter true to use the filtering select (shown below)
* @param refresh-data-fn the function to call when refreshing the data (ie. after the filter is applied)
* @param on-change-fn you can specifiy a funciton to call when the value of the select changes
* @param wait-time the time to wait in milliseconds before refreshing data (defaults to 1000)
* @param is-error flag which controls the error state
* @param error-msg the field which sets the error message.
* @param is-warn flag which controls the warning state
* @param warn-msg the field which sets the warning message.
* @param secondary-label the secondary label to show for the values.
* @param icon - icon for the open
*
*@html
<div ng-controller="SelectMultiController as sel">
  <p>Selected  <span class="badge">{{sel.selected}}</span></p>
  <form id="myForm">
  <div class="row">
    <div class="large-3">
      <cs-select
        ng-model="sel.selected"
        options="sel.options"
        placeholder="sel.selectPlaceholder"
        multi="true"
        max="sel.maximum"
        singular="State"
        plural="States"
        >
      </cs-select>
    </div>
  </div>
  </form>
</div>
*
* @js
(function () {
  'use strict';

  angular
    .module('app.forms')
    .controller('SelectMultiController', SelectAddExampleController);

  function SelectAddExampleController($http) {
    var vm = this;
    vm.options = [];
    vm.selectPlaceholder = 'Select One';
    vm.combo = true;
    vm.searchable = true;
    vm.selected = [];
    vm.maximum = 5;

    activate();

    function activate() {}

    vm.options = [{
      'value': 'AL',
      'label': 'Alabama',
      isSelected: false
    }, {
      'value': 'AZ',
      'label': 'Arizona',
      isSelected: false
    }, {
      'value': 'AR',
      'label': 'Arkansas',
      isSelected: false
    }, {
      'value': 'CA',
      'label': 'California',
      isSelected: false
    }, {
      'value': 'CO',
      'label': 'Colorado',
      isSelected: false
    }, {
      'value': 'CT',
      'label': 'Connecticut',
      isSelected: false
    }, {
      'value': 'DE',
      'label': 'Delaware',
      isSelected: false
    }, {
      'value': 'DC',
      'label': 'District Of Columbia',
      isSelected: false
    }, {
      'value': 'FL',
      'label': 'Florida',
      isSelected: false
    }, {
      'value': 'GA',
      'label': 'Georgia',
      isSelected: false
    }, {
      'value': 'HI',
      'label': 'Hawaii',
      isSelected: false
    }, {
      'value': 'ID',
      'label': 'Idaho',
      isSelected: false
    }, {
      'value': 'IL',
      'label': 'Illinois',
      isSelected: false
    }, {
      'value': 'IN',
      'label': 'Indiana',
      isSelected: false
    }];

  }
})();
*/

/*
* @name Validation on Select
* @description
* @category controls
* @component selects
* @section validation-on-select
*
* @param name the name of the select
* @param options the array of choices
* @param labelfield the field of the array to use as a labelfield (defaults to label)
* @param valuefield the field of the array to use for the value
* @param ng-model the selected value
* @param placeholder the text to show when nothing is selected
* @param required true or false depending on if the select is a required field
* @param is-disabled true or false depending on if the select is disabled or not
* @param has-error true or false depending on if there is an error or not
* @param filter true to use the filtering select (shown below)
* @param refresh-data-fn the function to call when refreshing the data (ie. after the filter is applied)
* @param on-change-fn you can specifiy a funciton to call when the value of the select changes
* @param wait-time the time to wait in milliseconds before refreshing data (defaults to 1000)
* @param is-error flag which controls the error state
* @param error-msg the field which sets the error message.
* @param is-warn flag which controls the warning state
* @param warn-msg the field which sets the warning message.
* @param secondary-label the secondary label to show for the values.
* @param icon - icon for the open
*
*@html
<div ng-controller="SelectValidationExampleController as sel">
  <p>Selected  <span class="badge">{{sel.selected}}</span></p>
  <form id="myForm">
  <div class="row">
    <div class="large-3">
      <cs-select
        ng-model="sel.selected"
        options="sel.options"
        placeholder="sel.selectPlaceholder"
        is-error="{{sel.isError}}" error-msg="This is a very long very long very long very long very long very long error msg."
        is-warn="{{sel.isWarn}}" warn-msg="This is a very long very long very long very long very long very long warn msg.">
      </cs-select>
      <br><br>
       <input cs-input type="checkbox" id="vsBox1" ng-model="sel.isError" cs-input-label="Error state">
      <br>
       <input cs-input type="checkbox" ckid="vsBox2" ng-model="sel.isWarn" cs-input-label="Warn state">
    </div>
    <br>
  </div>
  </form>
</div>
*
* @js
(function () {
  'use strict';

  angular
    .module('app.forms')
    .controller('SelectValidationExampleController', SelectAddExampleController);

  function SelectAddExampleController($scope, $http) {

    var vm = this;
    vm.options = [];
    vm.selectPlaceholder = 'Select One';
    vm.selected = '';
    vm.isError = false;
    vm.isWarn = false;

    activate();

    function activate() {}

    vm.options = [
      'Voicemail',
      'Office',
      '214-555-1212',
      '214-555-2323',
      '214-555-3434',
      '214-555-4545'
    ];

  }
})();
*/
