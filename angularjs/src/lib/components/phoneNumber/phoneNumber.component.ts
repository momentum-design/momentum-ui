import { PhoneNumberFormat, PhoneNumberUtil } from 'google-libphonenumber';
import * as _ from 'lodash';
import { DropdownService } from '../../services/dropdown';
import { CountryList, ICountryCode } from './countrycodes';

export class PhoneNumberCtrl implements ng.IComponentController {
  private phoneUtil: PhoneNumberUtil = PhoneNumberUtil.getInstance();
  private _allowedRegions: Array<string>;
  private _menuOpen: boolean = false;
  private _countryCode: string;

  public e164PhoneNumber: string;
  public onChangeFn: Function;
  public labelfield: string = 'code';
  public dropUp: boolean = false;
  public options: Array<ICountryCode>;
  public phoneNumber: string;
  public countryModel: ICountryCode;
  public phoneNumberForm: ng.IFormController;
  public isValid: boolean = true;

  public static $inject = ['$dropdown', '$element', '$timeout'];
  constructor(
    private $dropdown: DropdownService,
    private $element: ng.IRootElementService,
    private $timeout: ng.ITimeoutService,
  ) {}

  public $onInit() {
    this.options = this.getAllowedRegions();
    if (_.isUndefined(this._countryCode) || this._countryCode === '') {
      this.countryCode = 'us';
    }
  }

  public $onChanges(changes: { [bindings: string]: ng.IChangesObject<any> }): void {
    const { e164PhoneNumber } = changes;
    if (!_.isUndefined(e164PhoneNumber)) {
      try {
        const parsedNumber = this.phoneUtil.parseAndKeepRawInput(e164PhoneNumber.currentValue, '');
        this.countryCode = this.phoneUtil.getRegionCodeForNumber(parsedNumber).toLowerCase();
        this.phoneNumber = this.phoneUtil.format(parsedNumber, PhoneNumberFormat.NATIONAL);
      } catch (e) { }
    }
  }

  public get allowedRegions(): Array<string> {
    return this._allowedRegions;
  }

  public set allowedRegions(regionList: Array<string>) {
    this._allowedRegions = _.map(regionList, region => {
      return _.isUndefined(region) ? region : region.toLowerCase();
    });
    this.options = this.getAllowedRegions();
  }

  public get countryCode(): string {
    return this._countryCode;
  }

  public set countryCode(code) {
    if (!_.isUndefined(code)) {
      this._countryCode = code.toLowerCase();
      this.countryModel = this.getCountryCode(this._countryCode);
      this.onChange();
    }
  }

  public get menuOpen(): boolean {
    return this._menuOpen;
  }

  public set menuOpen(menuOpen) {
    this._menuOpen = menuOpen;

    if (menuOpen) {
      this.$timeout(() => {
        this.dropUp = false;
        if (this.menuOpen) {
          this.dropUp = !this.$dropdown.isVisible(this.$element.find('.md-event-overlay__children')[0]);
          this.$dropdown.scrollIntoView(this.$element.find('.md-input-phonenumber__dropdown-container'), this.getSelectedListElement());
        }
      }, 10);
    } else {
      this.dropUp = false;
    }
  }

  public isSelected(code): boolean {
    return this.countryModel.code === code;
  }

  public toggleOpen($event: Event): void {
    if (this.hasDropdown()) {
      this.$dropdown.stopEventPropogation($event);
      this.menuOpen = !this.menuOpen;
    }
  }

  public toggleKeypress($event: KeyboardEvent) {
    this.$dropdown.toggleKeypress({
      $event,
      menuOpen: this.menuOpen,
      selectedElement: this.getSelectedListElement(),
      toggleOpen: ($event: KeyboardEvent) => {
        if (this.hasDropdown()) {
          this.menuOpen = !this.menuOpen;
        }
      },
    });
  }

  public listItemKeypress($event: KeyboardEvent, option: ICountryCode) {
    this.$dropdown.listItemKeypress({
      $event,
      selectedOption: option,
      optionList: this.$element.find('.md-list-item'),
      selectedLocation: this.options.indexOf(option),
      toggleButton: this.$element.find('.md-input-phonenumber__dropdown-trigger'),
      closeMenu: (_$event, option) => {
        this.selectOption(option);
      },
      taboutFn: () => {
        this.$element.find('.md-input-phonenumber__number input').focus();
        this.menuOpen = !this.menuOpen;
      },
    });
  }

  public getErrors() {
    return _.get(this.phoneNumberForm, 'phoneinput.$error');
  }

  public hasDropdown(): boolean {
    return this.options.length > 1;
  }

  public hasErrors() {
    return _.get(this.phoneNumberForm, 'phoneinput.$invalid', false) && _.get(this.phoneNumberForm, '$dirty', false);
  }

  public selectOption(option: ICountryCode) {
    this.countryModel = option;
    this._countryCode = option.code;

    this.formatNumberNational();
    this.formatNumberE164();
    this.onChange();
    this.menuOpen = !this.menuOpen;
  }

  public onPhoneNumberChange(): void {
    this.formatNumberNational();
    this.formatNumberE164();
    this.onChange();
  }

  public formatNumberNational(): void {
    try {
      const parsedNumber = this.phoneUtil.parseAndKeepRawInput(this.phoneNumber, this.countryModel.code);
      this.phoneNumber = this.phoneUtil.format(parsedNumber, PhoneNumberFormat.NATIONAL);
    } catch (e) { }
  }

  public formatNumberE164(): void {
    try {
      const parsedNumber = this.phoneUtil.parseAndKeepRawInput(this.phoneNumber, this.countryModel.code);
      this.e164PhoneNumber = this.phoneUtil.format(parsedNumber, PhoneNumberFormat.E164);
    } catch (e) { }
  }

  private onChange(): void {
    // if phoneNumber is undefined, then the input is empty and
    // should only flag an error if phone number input is required
    if (_.isUndefined(this.phoneNumber) || this.phoneNumber === '') {
      this.setFormValidity(true);
      if (_.isFunction(this.onChangeFn)) {
        this.onChangeFn({
          model: '',
        });
      }
    } else {
      this.isValid = this.validateNumber();
      this.setFormValidity(this.isValid);
      if (this.isValid && _.isFunction(this.onChangeFn)) {
        this.onChangeFn({
          model: this.e164PhoneNumber,
        });
      }
    }
  }

  private getAllowedRegions(): Array<ICountryCode> {
    if (this.allowedRegions) {
      return _.filter(CountryList, country => {
        return this.allowedRegions.indexOf(country.code) > -1;
      });
    } else {
      return CountryList;
    }
  }

  private getCountryCode(code: string): ICountryCode {
    return _.find(CountryList, { code: code });
  }

  private validateNumber(): boolean {
    if (this.phoneNumberForm) {
      try {
        const parsedNumber = this.phoneUtil.parseAndKeepRawInput(this.e164PhoneNumber, this.countryModel.code);
        return this.phoneUtil.isValidNumberForRegion(parsedNumber, this.countryModel.code);
      } catch (e) {
        return false;
      }
    }
  }

  private setFormValidity(valid: boolean): void {
    if (_.get(this.phoneNumberForm, 'phoneinput')) {
      this.phoneNumberForm.phoneinput.$setValidity('phonenumber', valid);
    }
  }

  private getSelectedListElement(): HTMLElement {
    const optionElements = this.$element.find('.md-list-item');
    let selected = 0;
    for (selected; selected < this.options.length; selected++) {
      if (this.isSelected(this.options[selected].code)) {
        break;
      }
    }
    return optionElements[selected];
  }
}

export class PhoneNumberComponent implements ng.IComponentOptions {
  public controller = PhoneNumberCtrl;
  public bindings = {
    e164PhoneNumber: '<',
    isDisabled: '<',
    isRequired: '<',
    maxLength: '<',
    type: '<',
    countryCode: '<',
    onChangeFn: '&?',
    allowedRegions: '<?',
    id: '@?name',
    label: '@?mdInputLabel',
    messages: '<?mdInputMessages', // Object containing validation key/value pairs,
    warning: '<?mdInputWarning', // Expression or Boolean to show warning message
    warningMessage: '@?mdInputWarningMessage', // Warning message
    helpText: '@?mdInputHelpText',  // Text for help text
    groupSize: '@?mdInputContainerSize',  // Size class for outer md-input-container container
    toggleAria: '@?toggleAriaLabel',  // necessary for any use of md-phone-number where the dropdown is active
  };
  public template = `
    <div class="md-input-phonenumber" ng-class="[{ 'columns': $ctrl.groupSize }, $ctrl.groupSize]">
      <label ng-if="$ctrl.label" class="md-input-phonenumber__label" for="{{ $ctrl.id }}">
        {{::$ctrl.label}}
      </label>
      <div class="md-input-container md-input-phonenumber__group" ng-form="$ctrl.phoneNumberForm" ng-class="{ 'md-error': $ctrl.hasErrors(), 'is-active': $ctrl.menuOpen, 'md-warning': $ctrl.warning}">
        <select
          class="md-input-phonenumber__hidden-select"
          ng-model="$ctrl.countryModel"
          name="{{::$ctrl.name}}"
          ng-required="$ctrl.isRequired"
          tabindex="-1"
          ng-options="option[$ctrl.labelfield] for option in [$ctrl.countryModel] track by option[$ctrl.valuefield]"
        >
        </select>
        <div class="md-input md-input-phonenumber__wrapper" ng-class="{ 'md-input-phonenumber__active': $ctrl.inputFocus, 'disabled': $ctrl.isDisabled }">
          <div
            ng-if="$ctrl.countryModel"
            class="md-input-phonenumber__dropdown-trigger"
            tabindex="{{ $ctrl.hasDropdown() ? 0 : -1 }}"
            ng-class="{ 'md-input-phonenumber__dropdown-none': !$ctrl.hasDropdown() }"
            ng-click="$ctrl.toggleOpen($event)"
            ng-keydown="$ctrl.toggleKeypress($event)"
            ng-disabled="$ctrl.isDisabled"
            aria-label="$ctrl.toggleAria"
          >
            <div class="md-flag {{ $ctrl.countryModel.code }}"></div>
            <div class="md-input-phonenumber__country-code">&nbsp;+{{ $ctrl.countryModel.number }}</div>
            <div class="md-input-phonenumber__dropdown-arrow" ng-if="$ctrl.hasDropdown()">
              <i class="icon icon-arrow-down_18" ng-class="{ 'icon-arrow-up_18': $ctrl.menuOpen, 'icon-arrow-down_18': !$ctrl.menuOpen }"> </i>
            </div>
          </div>
          <div class="md-input-phonenumber__number">
            <input
              id="{{ $ctrl.id }}"
              type="{{ $ctrl.type || 'text' }}"
              ng-disabled="$ctrl.isDisabled"
              name="phoneinput"
              ng-init="$ctrl.onPhoneNumberChange()"
              ng-change="$ctrl.onPhoneNumberChange()"
              ng-required="$ctrl.isRequired"
              ng-blur="$ctrl.inputFocus = false"
              ng-focus="$ctrl.inputFocus = true"
              ng-model="$ctrl.phoneNumber"
              placeholder="{{::$ctrl.placeholder}}"
              maxlength="{{ $ctrl.maxLength }}"
              autocomplete="off"
            />
          </div>
        </div>
      </div>

      <div ng-if="$ctrl.menuOpen && $ctrl.hasDropdown()" class="md-input-phonenumber__dropdown md-event-overlay" role="menu">
        <div class="md-event-overlay__children" ng-class="{ 'md-input-phonenumber__top': $ctrl.dropUp }">
          <div class="md-list md-list--vertical">
            <ul class="md-input-phonenumber__dropdown-container">
              <li
                class="md-list-item row"
                ng-repeat="option in $ctrl.options track by option.code"
                ng-class="{ 'md-input-phonenumber__dropdown-selected': $ctrl.isSelected(option.code) }"
                ng-click="$ctrl.selectOption(option)"
                ng-keydown="$ctrl.listItemKeypress($event, option)"
              >
                <span class="md-flag {{ option.code }} column small-1"></span>
                <span class="column small-9">{{ option.name }}</span>
                <span class="md-input-phonenumber__country-code-right column small-2">+{{ option.number }}</span>
              </li>
            </ul>
          </div>
        </div>
      </div>

      <div class="md-input-container" ng-class="{ 'md-error': $ctrl.hasErrors() && $ctrl.messages, 'md-warning': $ctrl.warning }">
        <div class="md-input__messages" ng-messages="$ctrl.getErrors()" role="alert">
          <div class="md-input__message" ng-repeat="(key, value) in $ctrl.messages" ng-message="{{ key }}">{{ value }}</div>
          <div class="md-input__message" ng-if="$ctrl.warning">{{ $ctrl.warningMessage }}</div>
        </div>
        <p class="md-input__help-text">{{::$ctrl.helpText}}</p>
      </div>
    </div>
  `;
}
