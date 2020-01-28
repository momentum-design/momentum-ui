import * as _ from 'lodash';

class SelectKitchenSinkController  {
  public selectedDisabled = [];
  public selectedPlaceholder = [];
  public selectedComboPlaceholder = [];
  public selectedArray = [{ value: 'test1', label: 'Test 1' }];
  public selectedObject = {value: 'test1', label: 'Test 1'};
  public selectedNumber;
  public selectedCombo = ['test1', 'test2'];
  public selectedFilter = [];
  public selectedFilterError = [];
  public selectedComboSearch = [];
  public selectedComboFilter = [];
  public selectedCustomLabel = [];
  public selectedSecondaryLabel = [];
  public selectedWarn = [];
  public selectedError = [];
  public selectedErrorWarn = [];
  public nestedSelect;
  public selectedDynamicWarn;
  public selectedDynamicWarnBool;
  public selectedDynamicError;
  public selectedDynamicErrorBool;
  public selectedMulti = [];
  public selectedMultiFilter = [];
  public selectedMultiPlaceholder = [];
  public selectedOnChange;
  public selectedRefresh;
  public availableNums = [];
  public isWarn = 'false';
  public isWarnBool = false;
  public isError = 'false';
  public isErrorBool = false;
  public classPresent = false;

  public comboOptions = ['test 1', 'test 2', 'test 3', 'test 4'];

  public placeholder = 'Placeholder';
  public placeholderCombo = 'Placeholder';
  public placeholderMulti = 'Placeholder';
  public placeholderFilter = 'Placeholder';
  public placeholderOnChange = 'Placeholder';
  public placeholderRefresh = 'Placeholder';
  public inputPlaceholderFilter = 'Placeholder';
  public inputPlaceholderError = 'Placeholder';
  public inputPlaceholderOnChange = 'Placeholder';
  public inputPlaceholderRefresh = 'Placeholder';

  public checkWarn(): void {
    this.isWarn = (this.selectedDynamicWarn && this.selectedDynamicWarn['value'] === 'test1') ? 'true' : 'false';
    this.isWarnBool = (this.selectedDynamicWarnBool && this.selectedDynamicWarnBool['value'] === 'test1') ? true : false;
    this.isError = (this.selectedDynamicError && this.selectedDynamicError['value'] === 'test1') ? 'true' : 'false';
    this.isErrorBool = (this.selectedDynamicErrorBool && this.selectedDynamicErrorBool['value'] === 'test1') ? true : false;
  }

  public loadNums(pattern) {
    console.log(pattern);
  }

  public addNumber(phoneNum) {
    var number = phoneNum.value;
    console.log(number);

    if (_.isUndefined(number) || number === '') {
      return;
    }

    // clear selection
    this.selectedOnChange = {
      label: '',
      value: '',
    };
    _.pull(this.selectNumOptions, phoneNum);
  }

  public selectNumberOptions = [
    0,1,2,3
  ]

  public selectNumOptions = [
    { value: '123', label: '123' },
    { value: '456', label: '456' },
    { value: '789', label: '789' },
  ];

  public selectOptions = [
    { value: 'test1', label: 'Test 1' },
    { value: 'test2', label: 'Test 2' },
    { value: 'test3', label: 'Test 3' },
    { value: 'test4', label: 'Test 4' },
  ];

  public selectMultiOptions = [
    { value: 'test1', label: 'Test 1', isSelected: false },
    { value: 'test2', label: 'Test 2', isSelected: false },
    { value: 'test3', label: 'Test 3', isSelected: false },
    { value: 'test4', label: 'Test 4', isSelected: false },
  ];

  public selectMultiOptions2 = [
    { value: 'test1', label: 'Test 1', isSelected: false },
    { value: 'test2', label: 'Test 2', isSelected: false },
    { value: 'test3', label: 'Test 3', isSelected: false },
    { value: 'test4', label: 'Test 4', isSelected: false },
  ];

  public selectOptionsCustom = [
    { code: 'test1', name: 'Test 1' },
    { code: 'test2', name: 'Test 2' },
    { code: 'test3', name: 'Test 3' },
    { code: 'test4', name: 'Test 4' },
  ];

  public repeatOptions = [
    {
      label: 'Once',
      name: 'phoneMenuRepeatOnce',
      value: 2,
    },
    {
      label: 'Twice',
      name: 'phoneMenuRepeatTwice',
      value: 3,
    },
    {
      label: 'Three Times',
      name: 'phoneMenuRepeatThree',
      value: 4,
    },
    {
      label: 'Four Times',
      name: 'phoneMenuRepeatFour',
      value: 5,
    },
    {
      label: 'Five Times',
      name: 'phoneMenuRepeatFive',
      value: 6,
    },
  ];

  public nestedOptions = [
    {
      label: 'Continue To Next Step',
      name: 'repeatMenu',
      action: 'repeatActionsOnInput',
      value: '1',
    },
    {
      label: 'Repeat Menu',
      name: 'repeatMenu',
      action: 'repeatActionsOnInput',
      value: '2',
      childOptions: this.repeatOptions,
    },
    {
      label: 'Repeat and Continue To Next Step',
      name: 'repeatMenuContinue',
      action: 'repeatActionsOnInputContinue',
      value: '3',
      childOptions: this.repeatOptions,
    },
    {
      label: 'Return To Previous Menu',
      name: 'returnPreviousMenu',
      action: 'returnPreviousActionsOnInput',
      value: '4',
    },
  ];
}

export class SelectKitchenSink implements angular.IComponentOptions {
  public static selector = 'exampleSelectKitchenSink';
  public static bindings = {};
  public static controller = SelectKitchenSinkController;
  public static template = `
    <form name="myInputsForm" novalidate>
      <div class="row" style="padding: 16px;">
        <div class="col-sm-6">
          <h5>Disabled Select</h5>
          <p>{{ $ctrl.selectedDisabled }}</p>
          <md-select
            name='selectDisabled'
            ng-model="$ctrl.selectedDisabled"
            ng-class='test-me'
            options="::$ctrl.selectOptions"
            is-disabled="true"
          ></md-select>
        </div>
        <div class="col-sm-6">
          <h5>Select (value array)</h5>
          <p>{{ $ctrl.selectedArray }}</p>
          <md-select
            name='steeringDigit'
            ng-class="$ctrl.selectedArray ? 'ct-attribute-field-textbox' : 'ct-attribute-field-textbox_error'"
            ng-model="$ctrl.selectedArray"
            options="::$ctrl.selectOptions"
          ></md-select>
        </div>
        <div class="col-sm-6">
          <h5>Select (number array)</h5>
          <p>{{ $ctrl.selectedNumber }}</p>
          <md-select
            name='selectedNumber'
            ng-model="$ctrl.selectedNumber"
            options="::$ctrl.selectNumberOptions"
          ></md-select>
        </div>
        <div class="col-sm-6">
          <h5>Select (value object)</h5>
          <p>{{ $ctrl.selectedObject }}</p>
          <md-select
            name='steeringDigit'
            ng-model="$ctrl.selectedObject"
            options="::$ctrl.selectOptions"
          ></md-select>
        </div>
        <div class="col-sm-6">
          <h5>Select with Placeholder</h5>
          <p>{{ $ctrl.selectedPlaceholder }}</p>
          <md-select
            name='steeringDigitPlaceholder'
            ng-model="$ctrl.selectedPlaceholder"
            options="::$ctrl.selectOptions"
            placeholder="$ctrl.placeholder"
          ></md-select>
        </div>
        <div class="col-sm-6">
          <h5>Select Combo</h5>
          <p>{{ $ctrl.selectedCombo }}</p>
          <md-select
            name='steeringDigit1'
            ng-model="$ctrl.selectedCombo"
            options="$ctrl.comboOptions"
            combo="true"
          ></md-select>
        </div>
        <div class="col-sm-6">
          <h5>Select Combo Placeholder</h5>
          <p>{{ $ctrl.selectedComboPlaceholder }}</p>
          <md-select
            name='steeringDigitComboPlaceholder'
            ng-model="$ctrl.selectedComboPlaceholder"
            options="$ctrl.comboOptions"
            combo="true"
            placeholder="$ctrl.placeholderCombo"
          ></md-select>
        </div>
        <div class="col-sm-6">
          <h5>Select Search Combo</h5>
          <p>{{ $ctrl.selectedComboSearch }}</p>
          <md-select
            name='steeringDigit2'
            ng-model="$ctrl.selectedComboSearch"
            options="$ctrl.comboOptions"
            required="true"
            combo="true"
            searchable-combo="true"
          ></md-select>
        </div>
        <div class="col-sm-6">
          <h5>Select Filter</h5>
          <p>{{ $ctrl.selectedFilter }}</p>
          <md-select
            name='steeringDigit3'
            ng-model="$ctrl.selectedFilter"
            options="$ctrl.selectOptions"
            filter="true"
            input-placeholder="$ctrl.inputPlaceholderFilter"
          ></md-select>
        </div>
        <div class="col-sm-6">
          <h5>Select Filter with Error</h5>
          <p>{{ $ctrl.selectedFilterError }}</p>
          <md-select
            name='steeringDigit3'
            ng-model="$ctrl.selectedFilterError"
            options="$ctrl.selectOptions"
            filter="true"
            input-placeholder="$ctrl.inputPlaceholderError"
            is-error="true"
            error-msg="Test Erroring Message asdfawefa fasdfasdawgasoijasim iasfjoasidjdfioasj ioasjf"
          ></md-select>
        </div>
        <div class="col-sm-6">
          <h5>Select Combo Filter</h5>
          <p>{{ $ctrl.selectedComboFilter }}</p>
          <md-select
            name='steeringDigit4'
            ng-model="$ctrl.selectedComboFilter"
            options="$ctrl.comboOptions"
            filter="true"
            combo="true"
            required="true"
          ></md-select>
        </div>
        <div class="col-sm-6">
          <h5>Select Multi</h5>
          <p>{{ $ctrl.selectedMulti }}</p>
          <md-select
            ng-model="$ctrl.selectedMulti"
            options="::$ctrl.selectMultiOptions"
            multi="true"
            singular="Value"
            plural="Values"
          ></md-select>
        </div>
        <div class="col-sm-6">
          <h5>Select Multi with Placeholder</h5>
          <p>{{ $ctrl.selectedMultiPlaceholder }}</p>
          <md-select
            ng-model="$ctrl.selectedMultiPlaceholder"
            options="::$ctrl.selectMultiOptions"
            placeholder="$ctrl.placeholderMulti"
            multi="true"
            singular="Value"
            plural="Values"
          ></md-select>
        </div>
        <div class="col-sm-6">
          <h5>Select Multi Filter</h5>
          <p>{{ $ctrl.selectedMultiFilter }}</p>
          <md-select
            ng-model="$ctrl.selectedMultiFilter"
            options="::$ctrl.selectMultiOptions"
            filter="true"
            multi="true"
            singular="Value"
            plural="Values"
          ></md-select>
        </div>
        <div class="col-sm-6">
          <h5>Select Filter With Custom Label/Value Test</h5>
          <p>{{ $ctrl.selectedCustomLabel }}</p>
          <md-select
            ng-model="$ctrl.selectedCustomLabel"
            options="$ctrl.selectOptionsCustom"
            name='steeringDigitLanguage'
            labelfield="name"
            valuefield="code"
            required="true"
            filter="true"
            placeholder="$ctrl.placeholderFilter"
          ></md-select>
        </div>
        <div class="col-sm-6">
          <h5>Select Secondary Label</h5>
          <p>{{ $ctrl.selectedSecondaryLabel }}</p>
          <md-select
            name='steeringDigit8'
            ng-model="$ctrl.selectedSecondaryLabel"
            options="$ctrl.selectOptions"
            required="true"
            secondary-label="Secondary Label"
          ></md-select>
        </div>
        <div class="col-sm-6">
          <h5>Select Nested</h5>
          <p>{{ $ctrl.nestedSelect }}</p>
          <md-select
            name='steeringDigitnested'
            ng-model="$ctrl.nestedSelect"
            options="$ctrl.nestedOptions"
            nested="true"
            required="true"
            icon='icon-chevron-down'
            iconnested="icon-chevron-right"
          ></md-select>
        </div>
        <div class="col-sm-6">
          <h5>Select Warn</h5>
          <p>{{ $ctrl.selectedWarn }}</p>
          <md-select
            name='selectWarn'
            ng-model="$ctrl.selectedWarn"
            options="$ctrl.selectOptions"
            is-warn="true"
            warn-msg="Test Warning Message asdfawefa fasdfasdawgasoijasim iasfjoasidjdfioasj ioasjf"
            required="true"
          ></md-select>
        </div>
        <div class="col-sm-6">
          <h5>Select Dynamic Warn(String)</h5>
          <p>{{ $ctrl.selectedDynamicWarn }}</p>
          <md-select
            name='selectWarn'
            ng-model="$ctrl.selectedDynamicWarn"
            options="$ctrl.selectOptions"
            on-change-fn="$ctrl.checkWarn()"
            is-warn="{{$ctrl.isWarn}}"
            warn-msg="Test Warning Message asdfawefa fasdfasdawgasoijasim iasfjoasidjdfioasj ioasjf"
            required="true"
          ></md-select>
        </div>
        <div class="col-sm-6">
          <h5>Select On Change Function</h5>
          <p>{{ $ctrl.selectedOnChange }}</p>
          <md-select
            class="aa-selected-phones"
            ng-model="$ctrl.selectedOnChange"
            options="$ctrl.selectNumOptions"
            labelfield="label"
            valuefield="value"
            placeholder="$ctrl.placeholderOnChange"
            input-placeholder="$ctrl.inputPlaceholderOnChange"
            filter="true"
            on-change-fn="$ctrl.addNumber(value)"
            icon="icon-chevron-down"
          >
        </div>
        <div class="col-sm-6">
          <h5>Select Refresh Data Function</h5>
          <p>{{ $ctrl.selectedRefresh }}</p>
          <md-select
            class="aa-selected-phones"
            ng-model="$ctrl.selectedRefresh"
            refresh-data-fn="$ctrl.loadNums(filter)"
            on-change-fn="$ctrl.addNumber(value)"
            options="$ctrl.selectNumOptions"
            labelfield="label"
            valuefield="value"
            placeholder="$ctrl.placeholderRefresh"
            input-placeholder="$ctrl.inputPlaceholderRefresh"
            filter="true"
            icon="icon-chevron-down"
          >
        </div>
        <div class="col-sm-6">
          <h5>Select Dynamic Warn(Boolean)</h5>
          <p>{{ $ctrl.selectedDynamicWarnBool }}</p>
          <md-select
            name='selectWarnBool'
            ng-model="$ctrl.selectedDynamicWarnBool"
            options="$ctrl.selectOptions"
            on-change-fn="$ctrl.checkWarn()"
            is-warn="{{$ctrl.isWarnBool}}"
            warn-msg="Test Warning Message asdfawefa fasdfasdawgasoijasim iasfjoasidjdfioasj ioasjf"
            required="true"
          ></md-select>
        </div>
        <div class="col-sm-6">
          <h5>Select Dynamic Error(String)</h5>
          <p>{{ $ctrl.selectedDynamicError }}</p>
          <md-select
            name='selectError'
            ng-model="$ctrl.selectedDynamicError"
            options="$ctrl.selectOptions"
            on-change-fn="$ctrl.checkWarn()"
            is-error="{{$ctrl.isError}}"
            error-msg="Test Erroring Message asdfawefa fasdfasdawgasoijasim iasfjoasidjdfioasj ioasjf"
            required="true"
          ></md-select>
        </div>
        <div class="col-sm-6">
          <h5>Select Dynamic Error(Boolean)</h5>
          <p>{{ $ctrl.selectedDynamicErrorBool }}</p>
          <md-select
            name='selectErrorBool'
            ng-model="$ctrl.selectedDynamicErrorBool"
            options="$ctrl.selectOptions"
            on-change-fn="$ctrl.checkWarn()"
            is-error="{{$ctrl.isErrorBool}}"
            error-msg="Test Erroring Message asdfawefa fasdfasdawgasoijasim iasfjoasidjdfioasj ioasjf"
            required="true"
          ></md-select>
        </div>
        <div class="col-sm-6">
          <h5>Select Error</h5>
          <p>{{ $ctrl.selectedError }}</p>
          <md-select
            name='selectError'
            ng-model="$ctrl.selectedError"
            options="$ctrl.selectOptions"
            is-error="true"
            error-msg="Test Error Message"
            required="true"
          ></md-select>
        </div>
        <div class="col-sm-6">
          <h5>Select Error/Warn</h5>
          <p>{{ $ctrl.selectedErrorWarn }}</p>
          <md-select
            name='selectErrorWarn'
            ng-model="$ctrl.selectedErrorWarn"
            options="$ctrl.selectOptions"
            is-warn="true"
            is-error="true"
            ng-class="$ctrl.classPresent ? 'md-input__wrapper' : 'md-input__wrapper'"
            error-msg="Test Error Message"
            warn-msg="Test Warn Message"
            required="true"
          ></md-select>
        </div>

      </div>
    </form>
  `;
}
