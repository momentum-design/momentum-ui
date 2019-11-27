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

export interface ISelect extends ng.IScope {
  mdSelect: any
}

export class MdSelectService {
  private id = 1;
  public getId() {
    this.id++;
    return this.id;
  }
}

export class mdSelectCtrl implements ng.IComponentController {
  public static $inject = ['$element', '$filter', '$timeout'];
  public ariaText: string;
  public cloneOptions: Array<any> = undefined;
  public icon: string;
  public iconNested: string;
  public isDisabled: boolean = false;
  public default: boolean;
  public errorMsg: string;
  public filterOptions: string = '';
  public isError: string;
  public isWarn: string;
  public labelfield: string;
  public manualChange: boolean;
  public menuOpen: boolean = false;
  public multi: boolean = false;
  public nested: boolean = false;
  public onChangeFn: Function = null;
  public options: Array<any>;
  public placeholder: string;
  public refreshDataFn: Function;
  public searchableCombo: boolean = false;
  public secondaryLabel: string;
  public selected: any = [];
  public selectOption: Function;
  public showFullMsg: boolean = false;
  public valuefield: string;
  public waitTime: number;
  public warnMsg: string;

  constructor(
    private $element: ng.IRootElementService,
    private $filter: ng.IFilterService,
    private $timeout: ng.ITimeoutService,
    private timeoutPromise: ng.IPromise<any>,
  ) {}

  public $onInit(): void {
    if (_.isUndefined(this.labelfield)) {
      this.labelfield = 'label';
    }
    if (_.isUndefined(this.valuefield)) {
      this.valuefield = 'value';
    }
    this.iconNested = this.iconNested || 'icon-chevron-right';
    this.icon = this.icon || 'icon-arrow-down_16';
    this.placeholder = this.placeholder;
    this.default = this.default || (!this.multi && !this.nested);
    if (_.isUndefined(this.waitTime)) {
      this.waitTime = 1000;
    }
  }

  public getStyle() {
    if (this.isError === 'true') {
      return 'md-error';
    } else if (this.isWarn === 'true') {
      return 'md-warning';
    }
    return '';
  }

  public getMsg() {
    if (this.isError === 'true') {
      return this.errorMsg;
    } else if (this.isWarn === 'true') {
      return this.warnMsg;
    }
    this.showFullMsg = false;
    return '';
  }

  public getAriaText() {
    const selected = this.getLabel(this.selected);
    if (selected) {
      return selected;
    } else if (this.ariaText && this.placeholder) {
      return this.ariaText + ' ' + this.placeholder;
    } else if (this.ariaText) {
      return this.ariaText;
    } else if (this.secondaryLabel && this.placeholder) {
      return this.secondaryLabel + ' ' + this.placeholder;
    } else if (this.secondaryLabel) {
      return this.secondaryLabel;
    } else {
      return this.placeholder;
    }
  }

  public mouseover(index) {
    this.$element.find('#nestedParent' + index).focus();
    this.toggleNestedMenu();
  }

  public nestedMenuSelection($event, option) {
    if (option.childOptions) {
      $event.stopPropagation();
      this.toggleNestedMenu(option);
    } else {
      this.selectOption(option);
    }
  }

  public toggleNestedMenu(option?) {
    if (option && option.menu) {
      option.menu = !option.menu;
    } else if (option) {
      option.menu = true;
    }

    _.forEach(this.options, function (optionItem: any) {
      if (_.isUndefined(option) || option.value !== optionItem.value) {
        optionItem.menu = false;
      }
    });
  }

  public toggleFullMsg() {
    this.showFullMsg = !this.showFullMsg;
  }

  public style(option, parentOption: any) {
    let styles = [];
    if (this.selected) {
      if (parentOption && parentOption["selectedChild"] && this.selected["selectedChild"]) {
        if (this.selected["selectedChild"][this.valuefield] === option[this.valuefield]) {
          styles.push('select-selected');
        }
      } else if (_.isObjectLike(this.selected) && this.selected[this.valuefield]) {
        if (this.selected[this.valuefield] === option[this.valuefield]) {
          styles.push('select-selected');
        }
      } else {
        if (this.selected === option) {
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

  public change() {
    this.menuOpen = true;
  }

  public onCloseFn() {
    this.options = this.$filter('orderBy')(this.options, '-isSelected', false);
    this.toggleNestedMenu();
  }

  public addNewOption(value) {
    let i;
    for (i = 0; i < this.options.length; i++) {
      if (this.options[i] === value) {
        return;
      }
    }

    this.options.push(value);
    this.selectOption(value);
  }

  public changefunction(value) {
    if (this.searchableCombo && !this.refreshDataFn) {
      if (!this.cloneOptions) {
        this.cloneOptions = _.cloneDeep(this.options);
      }
      this.manualChange = true;
      this.options = this.$filter('filter')(this.cloneOptions, value);
    }

    if (_.isFunction(this.onChangeFn)) {
      this.onChangeFn({
        value: value,
      });
    }

    if (_.isFunction(this.refreshDataFn) && this.searchableCombo && (this.waitTime >= 0)) {
      if (this.timeoutPromise) {
        this.$timeout.cancel(this.timeoutPromise); //cancel previous timeout
      }
      this.timeoutPromise = this.$timeout(() => {
        this.refreshDataFn({
          filter: value,
        });
      }, this.waitTime);
    }
  }

  public toggleOpen($event) {
    $event.preventDefault();
    $event.stopPropagation();
    if (!this.isDisabled) {
      this.menuOpen = !this.menuOpen;
      this.filterOptions = '';
      this.refreshData();
    }
  }

  public refreshData() {
    if (_.isFunction(this.refreshDataFn) && (this.waitTime >= 0)) {
      if (this.timeoutPromise) {
        this.$timeout.cancel(this.timeoutPromise); //cancel previous timeout
      }
      this.timeoutPromise = this.$timeout(() => {
        this.refreshDataFn({
          filter: this.filterOptions,
        });
      }, this.waitTime);
    }
  }

  public getLabel(option) {
    let optlabel = '';
    if (_.isObjectLike(option)) {
      if ((_.isArray(option)) && (option.length != 0)) {
        optlabel = option[0][this.labelfield];
      } else {
        optlabel = option[this.labelfield];
      }
    } else {
      optlabel = option;
    }
    return optlabel;
  }
}

export class mdSelect implements ng.IDirective {
  public static $inject = ['$document', 'MdSelectService', '$timeout', '$window'];
  constructor(
    private $document: ng.IDocumentService,
    private $select: MdSelectService,
    private $timeout: ng.ITimeoutService,
    private $window: ng.IWindowService,
  ) {}
  public restrict = 'EA';
  public require = 'ngModel';
  public template = selectTemplate;
  public scope = {
    ariaText: '@?',
    combo: '@',
    errorMsg: '@',
    hasError: '=',
    icon: '@',
    iconnested: '@',
    inputPlaceholder: '=',
    isCustomSearch: '<?',
    isDisabled: '=?',
    isError: '@',
    isWarn: '@',
    filter: '@',
    labelfield: '@',
    max: '=',
    multi: '@',
    name: '@',
    nested: '@',
    onChangeFn: '&',
    options: '=',
    placeholder: '=',
    plural: '@',
    refreshDataFn: '&?',
    required: '=mdRequired',
    searchableCombo: '@?',
    secondaryLabel: '@',
    selected: '=ngModel',
    singular: '@',
    valuefield: '@',
    waitTime: '@',
    warnMsg: '@',
  };
  public controller = mdSelectCtrl;
  public controllerAs = 'mdSelect';
  public bindToController = true;
  public replace = true;

  public link: ng.IDirectiveLinkFn = (
    _scope: ISelect,
    _element: ng.IAugmentedJQuery,
    _attrs: ng.IAttributes,
    _controller: any
  ) => {
    _scope.mdSelect.selectId = this.$select.getId();
    _element.mouseenter(() => {
      if (_element.find('.ellipsis')[0] !== undefined && _element.find('.text-wrap')[0] !== undefined && (_element.find('.ellipsis')[0].getBoundingClientRect().bottom >= _element.find('.text-wrap')[0].getBoundingClientRect().bottom)) {
        _scope.$apply(() => {
          _scope.mdSelect.isWrap = false;
        });
      } else {
        _scope.$apply(() => {
          _scope.mdSelect.isWrap = true;
        });
      }
    });

    const keyBinding = (event) => {
      if (event.which === KeyCodes.ESCAPE) {
        _element.find('#selectMain').focus();
      } else if (event.which === KeyCodes.LEFT) {
        _scope.$apply(() => {
          _scope.mdSelect.toggleNestedMenu();
        });
      } else if (event.which === KeyCodes.RIGHT) {
        const index = _.toNumber(event.currentTarget.activeElement.getAttribute('option-number'));
        if (_.isFinite(index) && !_.get(_scope.mdSelect.options[index], 'menu', false)) {
          _scope.$apply(() => {
            _scope.mdSelect.toggleNestedMenu(_scope.mdSelect.options[index]);
          });
        }
      }
    };

    _scope.$watch(() => {
      return _element.find('md-dropdown-menu').is(':visible');
    }, (newValue, oldValue) => {
      if (newValue && newValue !== oldValue) {
        this.$window.document.addEventListener('keydown', keyBinding);
      } else if (!newValue && newValue !== oldValue) {
        this.$window.document.removeEventListener('keydown', keyBinding);
      }
    });

    let fullMsgOnClick = (event) => {
      let isChild = $(_element).has(event.target).length > 0,
        isSelf = _element[0] === event.target, isInside = isChild || isSelf;
      if (!isInside) {
        _scope.$apply(() => {
          _scope.mdSelect.showFullMsg = false;
        });
      }
    };

    _scope.$watch('mdSelect.showFullMsg && mdSelect.isWrap', (newValue, oldValue) => {
      if (newValue !== oldValue && newValue === true) {
        this.$document.bind('click', fullMsgOnClick);
      } else if (newValue !== oldValue && newValue === false) {
        this.$document.unbind('click', fullMsgOnClick);
      }
    });

    if (_scope.mdSelect.multi) {

      _scope.mdSelect.defaultPlaceholder = _scope.mdSelect.placeholder;

      let setPlaceholder = () => {
        if (_scope.mdSelect.selected.length === 0) {
          _scope.mdSelect.placeholder = _scope.mdSelect.defaultPlaceholder;
        } else if (_scope.mdSelect.selected.length === 1) {
          _scope.mdSelect.placeholder = _scope.mdSelect.selected.length + ' ' + _scope.mdSelect.singular + ' Selected';
        } else {
          _scope.mdSelect.placeholder = _scope.mdSelect.selected.length + ' ' + _scope.mdSelect.plural + ' Selected';
        }
      };
      setPlaceholder();

      let onClick = (event) => {
        let isChild = $(_element).has(event.target).length > 0,
          isSpan = $(_element).text().indexOf(event.target.innerText) !== -1,
          isSelf = _element[0] === event.target,
          isInside = isChild || isSelf || isSpan;
        if (!isInside) {
          _scope.$apply(() => {
            _scope.mdSelect.menuOpen = false;
            $(_element).find('md-dropdown-menu').scrollTop(0);
          });
        }
      };

      _scope.$watch('mdSelect.menuOpen', (newValue, oldValue) => {
        _element.find('md-dropdown-menu').addClass('visible');
        if (newValue !== oldValue && newValue === true) {
          this.$document.bind('click', onClick);
          _scope.mdSelect.onCloseFn();
        } else if (newValue !== oldValue && newValue === false) {
          this.$document.unbind('click', onClick);
        }
      });

      _scope.$watch('mdSelect.options', (newValue, oldValue) => {
        if (_.isArray(newValue) && _.isArray(oldValue) && (newValue.length !== oldValue.length)) {
          setPlaceholder();
        }
      });

      _scope.$watch('mdSelect.selected', (newValue, oldValue) => {
        if (_.isArray(newValue) && _.isArray(oldValue) && (newValue.length !== oldValue.length)) {
          setPlaceholder();
        }
      });

      _scope.mdSelect.selectOption = (option) => {
        if (_.isUndefined(_scope.mdSelect.selected) || !_.includes(_.map(_scope.mdSelect.selected, _scope.mdSelect.valuefield), option[_scope.mdSelect.valuefield])) {
          if (!_.isUndefined(_scope.mdSelect.max)) {
            if (_scope.mdSelect.selected.length === _scope.mdSelect.max) {
              return;
            } else if (_scope.mdSelect.selected.length === (_scope.mdSelect.max - 1)) {
              _scope.mdSelect.isDisable = true;
            } else {
              _scope.mdSelect.isDisable = false;
            }
          }
          _scope.mdSelect.selected.push(option);
          option.isSelected = true;
          _controller.$setViewValue(_scope.mdSelect.selected);
          setPlaceholder();
          _scope.mdSelect.changefunction(option);
        } else {
          _.forEach(_scope.mdSelect.selected, (value, key) => {
            if (!_.isUndefined(value) && value[_scope.mdSelect.valuefield] === option[_scope.mdSelect.valuefield]) {
              _scope.mdSelect.selected.splice(key, 1);
              _controller.$setViewValue(_scope.mdSelect.selected);
              setPlaceholder();
              option.isSelected = false;
              _scope.mdSelect.isDisable = false;
              _scope.mdSelect.changefunction(option);
            }
          });
        }
      };
    } else {
      _scope.mdSelect.selectOption = (option, parentOption) => {
        if (_.isUndefined(_scope.mdSelect.selected) || option !== _scope.mdSelect.selected) {
          // return parent with injected child if found
          if (parentOption) {
            parentOption["selectedChild"] = option;
            option = parentOption;
          }
          _scope.mdSelect.clickedComboSelection = true;
          _controller.$setViewValue(option);
          _scope.mdSelect.changefunction(option);
        }
      };
      if (_scope.mdSelect.combo && !_scope.mdSelect.isDisabled) {
        _element.on('click', () => {
          this.$timeout(() => {
            if (!_scope.mdSelect.clickedComboSelection) {
              _scope.mdSelect.menuOpen = true;
            }
            _scope.mdSelect.clickedComboSelection = false;
          }, 0);
        });
        _scope.$watch('mdSelect.menuOpen', (newValue, oldValue) => {
          if (newValue !== oldValue && newValue === true && _scope.mdSelect.cloneOptions) {
              _scope.mdSelect.options = _.cloneDeep(_scope.mdSelect.cloneOptions);
          }
        });

        _scope.$watch('mdSelect.options', (newValue, oldValue) => {
          if (_.isArray(newValue) && _.isArray(oldValue) && (newValue !== oldValue) && !_scope.mdSelect.manualChange) {
              _scope.mdSelect.cloneOptions = _.cloneDeep(newValue);
          } else {
            _scope.mdSelect.manualChange = false;
          }
        });
      }
    }
  };

  static factory(): ng.IDirectiveFactory {
    const directive = (
      $document,
      MdSelectService,
      $timeout,
      $window
    ) => new mdSelect($document, MdSelectService, $timeout, $window);
    directive.$inject = mdSelect.$inject;
    return directive;
  }
}

const selectTemplate = `
  <div class="md-input-container md-select" ng-class="{'md-error': mdSelect.isError, 'md-warning': mdSelect.isWarn && !mdSelect.isError}">
    <div class="md-input__wrapper">
      <select
          class="hidden-select"
          ng-model="mdSelect.selected"
          name="{{::mdSelect.name}}"
          ng-required="mdSelect.required"
          tabindex="-1"
          ng-options="option[mdSelect.labelfield] for option in [mdSelect.selected] track by option[mdSelect.valuefield]"
        >
      </select>


      <div
        is-open="mdSelect.menuOpen"
        md-dropdown
        md-is-disabled="{{ mdSelect.isDisabled }}"
        style="width: 100%"
        ng-class="{'open': mdSelect.menuOpen, 'md-select-multi': mdSelect.multi}"
      >
        <input
          class="md-input md-select__input"
          role="combobox"
          aria-expanded="{{ mdSelect.menuOpen }}"
          aria-label="{{ mdSelect.combo ? null : mdSelect.getAriaText() }}"
          ng-model="mdSelect.selected"
          id="{{ mdSelect.combo ? null : 'selectMain' }}"
          ng-change="mdSelect.combo && mdSelect.changefunction(mdSelect.selected)"
          ng-click="!mdSelect.combo && mdSelect.toggleOpen($event)"
          ng-focus="mdSelect.combo && mdSelect.openMenu()"
          type="{{ mdSelect.combo ? 'text' : 'button' }}"
          placeholder="{{::mdSelect.placeholder}}"
          value="{{ (!mdSelect.combo && mdSelect.getLabel(mdSelect.selected)) ? mdSelect.getLabel(mdSelect.selected) : mdSelect.placeholder }}"
        />
        <span class="md-input__after">
          <i class="md-icon icon md-rotate" ng-class="mdSelect.icon"></i>
        </span>

        <div md-dropdown-menu ng-if="mdSelect.multi || mdSelect.menuOpen" ng-class="{'nested': mdSelect.nested}" role="menu" style="width: 100%">
          <div ng-if="mdSelect.filter === 'true'" class='md-select__filter'>
            <div class='md-input-container'>
              <div class="md-input__wrapper">
                <span class="md-input__before">
                  <i class="md-icon icon icon-search_20"></i>
                </span>
                <input
                  class="md-input md-input--pill md-input--before"
                  ng-class="{'filterfocus' : mdSelect.menuOpen}"
                  type="text"
                  ng-model="mdSelect.filterOptions"
                  ng-click="$event.stopPropagation()"
                  placeholder="{{::mdSelect.inputPlaceholder}}"
                  ng-change="mdSelect.refreshData()"
                />
              </div>
            </div>
          </div>

          <div class="md-list md-list--vertical md-select__options" role="listbox">
            <div
              class="md-list-item"
              ng-if="mdSelect.nested"
              ng-repeat="option in mdSelect.options"
              ng-class="{'hover': option.menu}"
              class="mdSelect.style(option)"
              ng-click="mdSelect.selectOption(option)"
              title="{{ mdSelect.getLabel(option) }}"
            >
              <a ng-if="!option.childOptions" role="option" id="{{ mdSelect.selectId }}-{{ $index }}" title="{{ mdSelect.getLabel(option) }}">{{ mdSelect.getLabel(option) }}</a>
              <a ng-if="option.childOptions" class="md-select__option--parent" title="{{ mdSelect.getLabel(option) }}">
                <span>{{ mdSelect.getLabel(option.label) }}</span>
                <i class="icon" ng-class="mdSelect.iconnested"></i>
              </a>
              <div class="md-list md-list--vertical sub-menu" role="listbox" ng-if="option.childOptions">
                <li class="md-select__nested-option md-list-item" ng-repeat="childOption in option.childOptions" ng-class="mdSelect.style(childOption, option)" ng-click="mdSelect.selectOption(childOption, option)">
                  <a role="option" id="{{ mdSelect.selectId }}-{{ $index }}" title="{{ mdSelect.getLabel(childOption) }}">{{ mdSelect.getLabel(childOption) }}</a>
                </li>
              </div>
            </div>

            <div
              class="md-list-item"
              ng-if="mdSelect.isCustomSearch && !mdSelect.nested"
              ng-repeat="option in mdSelect.options"
              ng-class="mdSelect.style(option)"
              ng-click="mdSelect.selectOption(option)"
              title="{{ mdSelect.getLabel(option) }}"
            >
              {{ mdSelect.getLabel(option) }}
            </div>
            <div
              class="md-list-item"
              role='option'
              ng-if="!mdSelect.isCustomSearch && !mdSelect.nested"
              ng-repeat="option in mdSelect.options | filter:mdSelect.filterOptions"
              ng-class="mdSelect.style(option)"
              ng-click="mdSelect.selectOption(option)"
              title="{{ mdSelect.getLabel(option) }}"
            >
              <input ng-if="mdSelect.multi" md-input type="checkbox" ng-disabled="mdSelect.isDisable" ng-model="option.isSelected" md-input-label="{{ mdSelect.getLabel(option) }}" />
              {{ !mdSelect.multi && mdSelect.getLabel(option) || '' }}
            </div>
          </div>
        </div>
      </div>
    </div>
    <label class="md-input__secondary-label" ng-if="mdSelect.secondaryLabel">{{ mdSelect.secondaryLabel }}</label>
    <div class="md-input__messages" ng-if="mdSelect.getMsg() !== ''">
      <div class="md-input__message">
        {{ mdSelect.getMsg() }}
      </div>
      <div class="md-input__message" ng-if="mdSelect.showFullMsg && mdSelect.isWrap">{{ mdSelect.getMsg() }}</div>
    </div>
  </div>
`;
