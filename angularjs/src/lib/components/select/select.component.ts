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
  vm.getPlaceholder = getPlaceholder;
  vm.refreshData = refreshData;
  vm.toggleOpen = toggleOpen;
  vm.onCloseFn = onCloseFn;
  vm.change = change;
  vm.style = style;
  vm.menuOpen = false;
  vm.cloneOptions = undefined;
  vm.labelfield = 'label';

  init();

  vm.getMsg = getMsg;
  vm.getAriaText = getAriaText;
  vm.mouseover = mouseover;
  vm.nestedMenuSelection = nestedMenuSelection;
  vm.toggleNestedMenu = toggleNestedMenu;

  function getMsg() {
    if (vm.isError === 'true' || vm.isError && vm.isError.toString() === 'true') {
      return vm.errorMsg;
    } else if (vm.isWarn === 'true' || vm.isWarn && vm.isWarn.toString() === 'true') {
      return vm.warnMsg;
    }
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
    if (_.isUndefined(vm.waitTime)) vm.waitTime = 1000;
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
    vm.iconnested = vm.iconnested || 'icon-chevron-right';
    vm.icon = vm.icon || 'icon-chevron-down';
    vm.default = vm.default || (!vm.multi && !vm.nested);
    if (_.isUndefined(vm.waitTime)) {
      vm.waitTime = 1000;
    }
  }

  function refreshData() {
    if (_.isUndefined(vm.waitTime)) vm.waitTime = 1000;
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
      if ((_.isArray(option)) && (option.length != 0)) {
        optlabel = option[0][vm.labelfield];
      } else {
        optlabel = option[vm.labelfield];
      }
    } else if ( Number.isInteger(option) ){
      optlabel = option.toString();
    } else {
      optlabel = option;
    }
    return optlabel;
  }

  function getPlaceholder(option) {
    let optlabel = vm.getLabel(option);
    return optlabel || vm.placeholder;
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
      labelfield: '@?',
      valuefield: '@?',
      selected: '=ngModel',
      placeholder: '=?',
      inputPlaceholder: '=',
      required: '=mdRequired',
      isDisabled: '=',
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
      icon: '@?',
      iconnested: '@?',
    },
    link: function (scope, element, attrs, ngModel) {
      scope.mdSelect.selectId = MdSelectService.getId();
      scope.mdSelect.errorFlag;
      scope.mdSelect.warnFlag;

      const keyBinding = function (event) {
        if (event.which === KeyCodes.ESCAPE) {
          element.find('.md-select__input').focus();
        } else if (event.which === KeyCodes.LEFT) {
          scope.$apply(function () {
            scope.mdSelect.toggleNestedMenu();
          });
        } else if (event.which === KeyCodes.RIGHT) {
          const index = _.toNumber(event.currentTarget.activeElement.getAttribute('option-number'));
          if (_.isFinite(index) && !_.get(scope.mdSelect.options[index], 'childOption', false)) {
            scope.$apply(function () {
              scope.mdSelect.toggleNestedMenu(scope.mdSelect.options[index]);
            });
          }
        } else if (event.which === KeyCodes.DOWN) {
          scope.$apply(function () {
            if (event.currentTarget.activeElement.getAttribute('child-number') === null ) {
              scope.mdSelect.toggleNestedMenu();
            }
          });
        }
      };

      scope.$watch('mdSelect.isError', function (newValue, oldValue) {
        if (newValue && _.isUndefined(scope.mdSelect.errorFlag)) {
          if (newValue === 'true' || newValue.toString() === 'true') {
            scope.mdSelect.errorFlag = newValue;
            attrs.$addClass('md-error')
          }
        } else if (newValue && (newValue === 'true' || newValue.toString() === 'true') && (newValue !== scope.mdSelect.errorFlag)) {
          scope.mdSelect.errorFlag = newValue;
          attrs.$addClass('md-error')
        } else if ((newValue === false || newValue === 'false') && (newValue !== scope.mdSelect.errorFlag)) {
          scope.mdSelect.errorFlag = newValue;
          attrs.$removeClass('md-error')
        }
      })

      scope.$watch('mdSelect.isWarn', function (newValue, oldValue) {
        if (newValue && _.isUndefined(scope.mdSelect.warnFlag)) {
          if (newValue === 'true' || newValue.toString() === 'true') {
            scope.mdSelect.warnFlag = newValue;
            attrs.$addClass('md-warning')
          }
        } else if (newValue && (newValue === 'true' || newValue.toString() === 'true') && (newValue !== scope.mdSelect.warnFlag)) {
          scope.mdSelect.warnFlag = newValue;
          attrs.$addClass('md-warning')
        } else if ((newValue === false || newValue === 'false') && (newValue !== scope.mdSelect.warnFlag)) {
          scope.mdSelect.warnFlag = newValue;
          attrs.$removeClass('md-warning')
        }
      })

      scope.$watch(function () {
        return element.find('.dropdown-menu').is(':visible');
      }, function (newValue, oldValue) {
        if (newValue && newValue !== oldValue) {
          $window.document.addEventListener('keydown', keyBinding);
        } else if (!newValue && newValue !== oldValue) {
          $window.document.removeEventListener('keydown', keyBinding);
        }
      });

      if (scope.mdSelect.multi === 'true') {
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
  <div
    class="md-input-container md-select"
  >
    <div class="md-input__wrapper">
      <select
          class="hidden-select"
          name="{{::mdSelect.name}}"
          ng-model="mdSelect.selected"
          ng-options="option[mdSelect.labelfield] for option in [mdSelect.selected] track by option[mdSelect.valuefield]"
          ng-required="mdSelect.required"
          tabindex="-1"
        >
      </select>

      <div
        is-open="mdSelect.menuOpen"
        md-dropdown
        md-keyboard-nav="{{ !(mdSelect.multi === 'true' || mdSelect.nested === 'true') }}"
        md-is-disabled="{{ mdSelect.isDisabled }}"
        md-typeable="{{ mdSelect.combo ? 'true' : 'false' }}"
        ng-class="{'open': mdSelect.menuOpen, 'md-select-multi': mdSelect.multi}"
        style="width: 100%"
      >
        <input
          aria-expanded="{{ mdSelect.menuOpen }}"
          aria-label="{{ mdSelect.combo ? null : mdSelect.getAriaText() }}"
          class="md-input md-select__input"
          ng-change="mdSelect.combo && mdSelect.changefunction(mdSelect.selected)"
          ng-class="{'md-disabled' : mdSelect.isDisabled}"
          ng-click="!mdSelect.combo && mdSelect.toggleOpen($event)"
          ng-focus="mdSelect.combo && mdSelect.openMenu()"
          ng-model="mdSelect.selected"
          placeholder="{{::mdSelect.placeholder}}"
          role="combobox"
          type="{{ mdSelect.combo ? 'text' : 'button' }}"
          value="{{
            !mdSelect.combo && !mdSelect.multi && mdSelect.getPlaceholder(mdSelect.selected) || mdSelect.placeholder
          }}"
        />
        <span class="md-input__after">
          <i class="md-icon icon md-rotate" ng-class="mdSelect.icon"></i>
        </span>

        <div
          class="dropdown-menu"
          is-open="mdSelect.menuOpen"
          md-dropdown-menu
          ng-class="{'nested': mdSelect.nested}"
          ng-if="mdSelect.multi || mdSelect.default || mdSelect.menuOpen"
          role="menu"
          style="width: 100%"
        >
          <div ng-if="mdSelect.filter === 'true'" class='md-select__filter'>
            <div class="md-input-container md-text">
              <div class="md-input__wrapper">
                <span class="md-input__before">
                  <i class="md-icon icon icon-search_20"></i>
                </span>
                <input
                  class="md-input md-input--pill md-input--before md-select__filter--input"
                  ng-change="mdSelect.refreshData()"
                  ng-class="{'filterfocus' : mdSelect.menuOpen}"
                  ng-click="$event.stopPropagation()"
                  ng-model="mdSelect.filterOptions"
                  placeholder="{{::mdSelect.inputPlaceholder}}"
                  type="text"
                />
              </div>
            </div>
          </div>

          <div class="md-list md-list--vertical md-select__options" role="listbox">
            <div
              class="md-list-item"
              ng-class="[{'hover': option.menu}, mdSelect.style(option)]"
              ng-click="mdSelect.selectOption(option)"
              ng-if="mdSelect.nested"
              ng-repeat="option in mdSelect.options track by $index"
              role="option"
              title="{{ mdSelect.getLabel(option) }}"
              option-number="{{ $index }}"
            >
              <a
                id="{{ mdSelect.selectId }}-{{ $index }}"
                ng-if="!option.childOptions"
                role="option"
                title="{{ mdSelect.getLabel(option) }}"
              >
                {{ mdSelect.getLabel(option) }}
              </a>
              <a
                ng-if="option.childOptions"
                class="md-select__option--parent"
                title="{{ mdSelect.getLabel(option) }}"
              >
                <span>{{ mdSelect.getLabel(option.label) }}</span>
                <i class="icon" ng-class="mdSelect.iconnested"></i>
              </a>
              <div class="md-list md-list--vertical sub-menu" role="listbox" ng-if="option.childOptions">
                <li
                  class="md-select__nested-option md-list-item"
                  ng-class="mdSelect.style(childOption, option)"
                  ng-click="mdSelect.selectOption(childOption, option)"
                  ng-repeat="childOption in option.childOptions  track by $index"
                  child-number="{{ $index }}"
                >
                  <a
                    id="{{ mdSelect.selectId }}-{{ $index }}"
                    role="option"
                    title="{{ mdSelect.getLabel(childOption) }}"
                  >
                    {{ mdSelect.getLabel(childOption) }}
                  </a>
                </li>
              </div>
            </div>

            <div
              class="md-list-item"
              ng-if="mdSelect.isCustomSearch && !mdSelect.nested && mdSelect.multi"
              ng-repeat="option in mdSelect.options"
              ng-click="mdSelect.selectOption(option)"
              title="{{ mdSelect.getLabel(option) }}"
            >
              <input
                md-input
                md-input-label="{{ mdSelect.getLabel(option) }}"
                ng-disabled="mdSelect.isDisable"
                ng-model="option.isSelected"
                type="checkbox"
              />
            </div>
            <div
              class="md-list-item"
              ng-if="!mdSelect.isCustomSearch && !mdSelect.nested && mdSelect.multi"
              ng-repeat="option in mdSelect.options | filter:mdSelect.filterOptions"
              ng-click="mdSelect.selectOption(option)"
              title="{{ mdSelect.getLabel(option) }}"
            >
              <input
                md-input
                md-input-label="{{ mdSelect.getLabel(option) }}"
                ng-disabled="mdSelect.isDisable"
                ng-model="option.isSelected"
                type="checkbox"
              />
            </div>

            <div
              class="md-list-item"
              ng-class="mdSelect.style(option)"
              ng-click="mdSelect.selectOption(option)"
              ng-if="mdSelect.isCustomSearch && !mdSelect.nested && !mdSelect.multi"
              ng-repeat="option in mdSelect.options track by $index"
              role='option'
              title="{{ mdSelect.getLabel(option) }}"
            >
              {{ !_.isUndefined(mdSelect.getLabel(option)) ? mdSelect.getLabel(option) : null  }}
            </div>
            <div
              class="md-list-item"
              ng-class="mdSelect.style(option)"
              ng-click="mdSelect.selectOption(option)"
              ng-if="!mdSelect.isCustomSearch && !mdSelect.nested && !mdSelect.multi"
              ng-repeat="option in mdSelect.options | filter:mdSelect.filterOptions track by $index"
              role='option'
              title="{{ mdSelect.getLabel(option) }}"
            >
              {{ !_.isUndefined(mdSelect.getLabel(option)) ? mdSelect.getLabel(option) : null }}
            </div>

          </div>
        </div>
      </div>
    </div>
    <label class="md-input__secondary-label" ng-if="mdSelect.secondaryLabel">
      {{ mdSelect.secondaryLabel }}
    </label>
    <div class="md-input__messages" ng-if="mdSelect.getMsg() !== ''">
      <div class="md-input__message">
        {{ mdSelect.getMsg() }}
      </div>
    </div>
  </div>
`;
