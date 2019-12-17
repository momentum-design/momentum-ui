/** @component select */

import * as _ from 'lodash';
import { KeyCodes } from '../../directives/dropdown/keyCodes';

mdSelectSearchable.$inject = ["$filter"];
export function mdSelectSearchable($filter) {
  return function (values, option, comparator) {
    if (option && comparator && comparator.length !== 0) {
      return $filter('filter')(values, comparator);
    }
    return values;
  };
}

export class MdSelectService {
  private id = 1;
  public getId() {
    this.id++;
    return this.id;
  }
}

mdSelectCtrl.$inject = ["$element", "$filter", "$timeout"];
export function mdSelectCtrl($element, $filter, $timeout) {
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
      vm.options = $filter('mdsearchable')(vm.cloneOptions, vm.searchableCombo, value);
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
      vm.filterOptions = '';
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

mdSelect.$inject = ["$document", "$timeout", "$window", "MdSelectService"];
export function mdSelect($document, $timeout, $window, MdSelectService: MdSelectService) {
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
      required: '=mdRequired',
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
      scope.mdSelect.selectId = MdSelectService.getId();
      element.mouseenter(function () {
        if (element.find('.ellipsis')[0] !== undefined && element.find('.text-wrap')[0] !== undefined && (element.find('.ellipsis')[0].getBoundingClientRect().bottom >= element.find('.text-wrap')[0].getBoundingClientRect().bottom)) {
          scope.$apply(function () {
            scope.mdSelect.isWrap = false;
          });
        } else {
          scope.$apply(function () {
            scope.mdSelect.isWrap = true;
          });
        }
      });

      const keyBinding = function (event) {
        if (event.which === KeyCodes.ESCAPE) {
          element.find('#selectMain').focus();
        } else if (event.which === KeyCodes.LEFT) {
          scope.$apply(function () {
            scope.mdSelect.toggleNestedMenu();
          });
        } else if (event.which === KeyCodes.RIGHT) {
          const index = _.toNumber(event.currentTarget.activeElement.getAttribute('option-number'));
          if (_.isFinite(index) && !_.get(scope.mdSelect.options[index], 'menu', false)) {
            scope.$apply(function () {
              scope.mdSelect.toggleNestedMenu(scope.mdSelect.options[index]);
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
            scope.mdSelect.showFullMsg = false;
          });
        }
      };

      scope.$watch('mdSelect.showFullMsg && mdSelect.isWrap', function (newValue, oldValue) {
        if (newValue !== oldValue && newValue === true) {
          $document.bind('click', fullMsgOnClick);
        } else if (newValue !== oldValue && newValue === false) {
          $document.unbind('click', fullMsgOnClick);
        }
      });

      if (scope.mdSelect.multi) {
        scope.mdSelect.defaultPlaceholder = scope.mdSelect.placeholder;

        let setPlaceholder = function () {
          if (scope.mdSelect.selected.length === 0) {
            scope.mdSelect.placeholder = scope.mdSelect.defaultPlaceholder;
          } else if (scope.mdSelect.selected.length === 1) {
            scope.mdSelect.placeholder = scope.mdSelect.selected.length + ' ' + scope.mdSelect.singular + ' Selected';
          } else {
            scope.mdSelect.placeholder = scope.mdSelect.selected.length + ' ' + scope.mdSelect.plural + ' Selected';
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
              scope.mdSelect.menuOpen = false;
              $(element).find('.dropdown-menu').scrollTop(0);
            });
          }
        };

        scope.$watch('mdSelect.menuOpen', function (newValue, oldValue) {
          element.find('.dropdown-menu').addClass('visible');
          if (newValue !== oldValue && newValue === true) {
            $document.bind('click', onClick);
            scope.mdSelect.onCloseFn();
          } else if (newValue !== oldValue && newValue === false) {
            $document.unbind('click', onClick);
          }
        });

        scope.$watch('mdSelect.options', function (newValue, oldValue) {
          if (_.isArray(newValue) && _.isArray(oldValue) && (newValue.length !== oldValue.length)) {
            setPlaceholder();
          }
        });

        scope.$watch('mdSelect.selected', function (newValue, oldValue) {
          if (_.isArray(newValue) && _.isArray(oldValue) && (newValue.length !== oldValue.length)) {
            setPlaceholder();
          }
        });

        scope.mdSelect.selectOption = function (option) {
          if (_.isUndefined(scope.mdSelect.selected) || !_.includes(_.map(scope.mdSelect.selected, scope.mdSelect.valuefield), option[scope.mdSelect.valuefield])) {
            if (!_.isUndefined(scope.mdSelect.max)) {
              if (scope.mdSelect.selected.length === scope.mdSelect.max) {
                return;
              } else if (scope.mdSelect.selected.length === (scope.mdSelect.max - 1)) {
                scope.mdSelect.isDisable = true;
              } else {
                scope.mdSelect.isDisable = false;
              }
            }
            scope.mdSelect.selected.push(option);
            option.isSelected = true;
            ngModel.$setViewValue(scope.mdSelect.selected);
            setPlaceholder();
            scope.mdSelect.changefunction(option);
          } else {
            _.forEach(scope.mdSelect.selected, function (value, key) {
              if (!_.isUndefined(value) && value[scope.mdSelect.valuefield] === option[scope.mdSelect.valuefield]) {
                scope.mdSelect.selected.splice(key, 1);
                ngModel.$setViewValue(scope.mdSelect.selected);
                setPlaceholder();
                option.isSelected = false;
                scope.mdSelect.isDisable = false;
                scope.mdSelect.changefunction(option);
              }
            });
          }
        };
      } else {
        scope.mdSelect.selectOption = function (option, parentOption) {
          if (_.isUndefined(scope.mdSelect.selected) || option !== scope.mdSelect.selected) {
            // return parent with injected child if found
            if (parentOption) {
              parentOption.selectedChild = option;
              option = parentOption;
            }
            scope.mdSelect.clickedComboSelection = true;
            ngModel.$setViewValue(option);
            scope.mdSelect.changefunction(option);
          }
        };
        if (scope.mdSelect.combo && !scope.mdSelect.isDisabled) {
          element.on('click', function () {
            $timeout(function () {
              if (!scope.mdSelect.clickedComboSelection) {
                scope.mdSelect.menuOpen = true;
              }
              scope.mdSelect.clickedComboSelection = false;
            }, 0);
          });
          scope.$watch('mdSelect.menuOpen', function (newValue, oldValue) {
              if (newValue !== oldValue && newValue === true && scope.mdSelect.cloneOptions) {
                  scope.mdSelect.options = _.cloneDeep(scope.mdSelect.cloneOptions);
              }
          });

          scope.$watch('mdSelect.options', function (newValue, oldValue) {
              if (_.isArray(newValue) && _.isArray(oldValue) && (newValue !== oldValue) && !scope.mdSelect.manualChange) {
                  scope.mdSelect.cloneOptions = _.cloneDeep(newValue);
              } else {
                scope.mdSelect.manualChange = false;
              }
          });
        }
      }
    },
    controller: mdSelectCtrl,
    controllerAs: 'mdSelect',
    bindToController: true,
    replace: true,
  };
  return directive;
}

const selectTemplate = `
  <div class="md-select-container md-input__wrapper">
    <div class="select-list {{ mdSelect.getStyle() }}">
      <select
        class="hidden-select"
        ng-model="mdSelect.selected"
        name="{{::mdSelect.name}}"
        ng-required="mdSelect.required"
        tabindex="-1"
        ng-options="option[mdSelect.labelfield] for option in [mdSelect.selected] track by option[mdSelect.valuefield]"
      >
      </select>

      <div ng-if="mdSelect.nested" md-dropdown md-is-disabled="{{ mdSelect.isDisabled }}" is-open="mdSelect.menuOpen">
        <span
          ng-if="!mdSelect.combo"
          id="selectMain"
          class="select-toggle form-control"
          tabindex="0"
          role="combobox"
          aria-label="{{ mdSelect.getAriaText() }}"
          aria-expanded="{{ mdSelect.menuOpen }}"
          ng-click="mdSelect.toggleOpen($event);"
          ng-class="{disabled: mdSelect.isDisabled, 'hasError': mdSelect.hasError}"
        >
          {{ mdSelect.getLabel(mdSelect.selected) }}{{ mdSelect.selected.selectedChild && ' : ' }}{{ mdSelect.getLabel(mdSelect.selected.selectedChild) }}
          <span class="placeholder" ng-show="!mdSelect.getLabel(mdSelect.selected)">{{::mdSelect.placeholder}}</span>
          <i class="icon" ng-class="mdSelect.icon"></i>
        </span>
        <div class="md-input__messages">
          <div class="ellipsis" ng-click="mdSelect.toggleFullMsg()" ng-if="mdSelect.getMsg() !== ''" ng-class="{'pointer': mdSelect.isWrap}">
            <span class="icon"></span> <span class="text-wrap">{{ mdSelect.getMsg() }}</span>
          </div>
          <div class="md-input__message" ng-if="mdSelect.showFullMsg && mdSelect.isWrap">{{ mdSelect.getMsg() }}</div>
        </div>
        <div class="dropdown-menu" ng-class="{'combo-dropdown': mdSelect.combo, 'nested': mdSelect.nested}" md-dropdown-menu role="menu">
          <input
            ng-if="mdSelect.filter === 'true'"
            class="select-filter"
            ng-class="{'filterfocus' : mdSelect.menuOpen}"
            type="text"
            ng-model="mdSelect.filterOptions"
            ng-click="$event.stopPropagation()"
            placeholder="{{::mdSelect.inputPlaceholder}}"
            ng-change="mdSelect.refreshData()"
          />
          <ul class="select-options" role="listbox">
            <li
              ng-if="mdSelect.isCustomSearch"
              ng-repeat="option in mdSelect.options | mdsearchable:mdSelect.searchableCombo:mdSelect.selected track by $index"
              class="{{::mdSelect.style(option)}}"
              ng-class="{'hover': option.menu}"
              ng-click="mdSelect.nestedMenuSelection($event, option)"
              ng-mouseover="mdSelect.mouseover($index)"
              option-number="{{ $index }}"
              id="nestedParent{{ $index }}"
            >
              <a ng-if="!option.childOptions" role="option" id="{{ mdSelect.selectId }}-{{ $index }}" title="{{ mdSelect.getLabel(option) }}">{{ mdSelect.getLabel(option) }}</a>
              <a ng-if="option.childOptions" class="parent" title="{{ mdSelect.getLabel(option) }}">
                <span>{{ mdSelect.getLabel(option.label) }}</span>
                <i class="icon" ng-class="mdSelect.iconnested"></i>
              </a>
              <ul ng-if="option.childOptions" class="sub-menu">
                <li class="nested-option" ng-repeat="childOption in option.childOptions" ng-class="mdSelect.style(childOption, option)" ng-click="mdSelect.selectOption(childOption, option)">
                  <a role="option" id="{{ mdSelect.selectId }}-{{ $index }}" title="{{ mdSelect.getLabel(childOption) }}">{{ mdSelect.getLabel(childOption) }}</a>
                </li>
              </ul>
            </li>
            <li
              ng-if="!mdSelect.isCustomSearch"
              ng-repeat="option in mdSelect.options | filter:mdSelect.filterOptions | mdsearchable:mdSelect.searchableCombo:mdSelect.selected track by $index"
              class="{{::mdSelect.style(option)}}"
              ng-class="{'hover': option.menu}"
              ng-click="mdSelect.nestedMenuSelection($event, option)"
              ng-mouseover="mdSelect.mouseover($index)"
              option-number="{{ $index }}"
              id="nestedParent{{ $index }}"
            >
              <a ng-if="!option.childOptions" role="option" id="{{ mdSelect.selectId }}-{{ $index }}" title="{{ mdSelect.getLabel(option) }}">{{ mdSelect.getLabel(option) }}</a>
              <a ng-if="option.childOptions" class="parent" title="{{ mdSelect.getLabel(option) }}">
                <span>{{ mdSelect.getLabel(option.label) }}</span>
                <i class="icon" ng-class="mdSelect.iconnested"></i>
              </a>
              <ul ng-if="option.childOptions" class="sub-menu">
                <li class="nested-option" ng-repeat="childOption in option.childOptions" ng-class="mdSelect.style(childOption, option)" ng-click="mdSelect.selectOption(childOption, option)">
                  <a role="option" id="{{ mdSelect.selectId }}-{{ $index }}" title="{{ mdSelect.getLabel(childOption) }}">{{ mdSelect.getLabel(childOption) }}</a>
                </li>
              </ul>
            </li>
          </ul>
        </div>
      </div>

      <div ng-if="mdSelect.multi" md-dropdown md-is-disabled="{{ mdSelect.isDisabled }}" class="md-select-multi" ng-class="{'open': mdSelect.menuOpen}" is-open="mdSelect.menuOpen">
        <span
          id="selectMain"
          class="select-toggle form-control"
          tabindex="0"
          role="combobox"
          aria-label="{{ mdSelect.getAriaText() }}"
          aria-expanded="{{ mdSelect.menuOpen }}"
          ng-click="mdSelect.toggleOpen($event)"
          ng-class="{disabled: mdSelect.isDisabled, 'hasError': mdSelect.hasError}"
        >
          {{ mdSelect.placeholder }}
          <i class="icon" ng-class="mdSelect.icon"></i>
        </span>
        <div class="md-input__messages">
          <div class="ellipsis md-input__message" ng-click="mdSelect.toggleFullMsg()" ng-if="mdSelect.getMsg() !== ''" ng-class="{'pointer': mdSelect.isWrap}">
            <span class="text-wrap">{{ mdSelect.getMsg() }}</span>
          </div>
          <div class="md-input__message" ng-if="mdSelect.showFullMsg && mdSelect.isWrap">{{ mdSelect.getMsg() }}</div>
        </div>
        <div class="dropdown-menu" md-dropdown-menu role="menu">
          <input
            ng-if="mdSelect.filter === 'true'"
            class="select-filter"
            ng-class="{'filterfocus' : mdSelect.menuOpen}"
            type="text"
            ng-model="mdSelect.filterOptions"
            ng-click="$event.stopPropagation()"
            placeholder="{{::mdSelect.inputPlaceholder}}"
            ng-change="mdSelect.refreshData()"
          />
          <ul class="select-options">
            <li ng-if="mdSelect.isCustomSearch" ng-repeat="option in mdSelect.options" ng-click="mdSelect.selectOption(option)">
              <a title="{{ mdSelect.getLabel(option) }}">
                <input md-input type="checkbox" ng-disabled="mdSelect.isDisable" ng-model="option.isSelected" md-input-label="{{ mdSelect.getLabel(option) }}" />
              </a>
            </li>
            <li ng-if="!mdSelect.isCustomSearch" ng-repeat="option in mdSelect.options | filter:mdSelect.filterOptions" ng-click="mdSelect.selectOption(option)">
              <a title="{{ mdSelect.getLabel(option) }}">
                <input md-input type="checkbox" ng-disabled="mdSelect.isDisable" ng-model="option.isSelected" md-input-label="{{ mdSelect.getLabel(option) }}" />
              </a>
            </li>
          </ul>
        </div>
      </div>

      <div ng-if="mdSelect.default" md-dropdown md-keyboard-nav="true" md-typeable="{{ mdSelect.combo ? 'true' : 'false' }}" md-is-disabled="{{ mdSelect.isDisabled }}" is-open="mdSelect.menuOpen">
        <span
          ng-if="!mdSelect.combo"
          id="selectMain"
          class="select-toggle form-control"
          tabindex="0"
          role="combobox"
          aria-label="{{ mdSelect.getAriaText() }}"
          aria-expanded="{{ mdSelect.menuOpen }}"
          ng-click="mdSelect.toggleOpen($event);"
          ng-class="{disabled: mdSelect.isDisabled, 'hasError': mdSelect.hasError}"
        >
          {{ mdSelect.getLabel(mdSelect.selected) }}
          <span class="placeholder" ng-show="!mdSelect.getLabel(mdSelect.selected)">{{::mdSelect.placeholder}}</span>
          <i class="icon" ng-class="mdSelect.icon"></i>
        </span>
        <div ng-if="mdSelect.combo" class="combo-box" ng-model="mdSelect.selected" ng-disabled="mdSelect.isDisabled" ng-class="{'hasError': mdSelect.hasError}">
          <input
            type="text"
            class="combo-input select-toggle"
            placeholder="{{::mdSelect.placeholder}}"
            ng-model="mdSelect.selected"
            ng-focus="mdSelect.openMenu()"
            ng-disabled="mdSelect.isDisabled"
            ng-change="mdSelect.changefunction(mdSelect.selected)"
          />
          <div class="combo-box-button">
            <button class="combo-btn" id="selectMain" ng-click="mdSelect.toggleOpen($event);" aria-label="{{ mdSelect.getAriaText() }}">
              <i class="icon" ng-class="mdSelect.icon"></i>
            </button>
          </div>
        </div>
        <div class="md-input__messages">
          <div class="ellipsis md-input__message" ng-click="mdSelect.toggleFullMsg()" ng-if="mdSelect.getMsg() !== ''" ng-class="{'pointer': mdSelect.isWrap}">
            <span class="text-wrap">{{ mdSelect.getMsg() }}</span>
          </div>
          <div class="md-input__message" ng-if="mdSelect.showFullMsg && mdSelect.isWrap">{{ mdSelect.getMsg() }}</div>
        </div>
        <div class="dropdown-menu" ng-class="{'combo-dropdown': mdSelect.combo}" md-dropdown-menu role="menu">
          <input
            ng-if="mdSelect.filter === 'true'"
            class="select-filter"
            ng-class="{'filterfocus' : mdSelect.menuOpen}"
            type="text"
            ng-model="mdSelect.filterOptions"
            ng-click="$event.stopPropagation()"
            placeholder="{{::mdSelect.inputPlaceholder}}"
            ng-change="mdSelect.refreshData()"
          />
          <ul class="select-options">
            <li ng-if="mdSelect.isCustomSearch" ng-repeat="option in mdSelect.options track by $index" ng-class="mdSelect.style(option)" ng-click="mdSelect.selectOption(option)">
              <a title="{{ mdSelect.getLabel(option) }}">{{ mdSelect.getLabel(option) }}</a>
            </li>
            <li
              ng-if="!mdSelect.isCustomSearch"
              ng-repeat="option in mdSelect.options | filter:mdSelect.filterOptions track by $index"
              ng-class="mdSelect.style(option)"
              ng-click="mdSelect.selectOption(option)"
            >
              <a title="{{ mdSelect.getLabel(option) }}">{{ mdSelect.getLabel(option) }}</a>
            </li>
          </ul>
        </div>
      </div>
    </div>

    <div class="secondary-label" ng-if="mdSelect.secondaryLabel">{{ mdSelect.secondaryLabel }}</div>
  </div>
`;
