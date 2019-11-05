class SelectKitchenSinkController {
  public selectedPlaceholder = [];
  public selectedComboPlaceholder = [];
  public selected0 = [];
  public selected1 = [];
  public selected2 = [];
  public selected3 = [];
  public selected4 = [];
  public selected5 = [];
  public selected6 = [];
  public selected8 = [];
  public selected9 = [];
  public selected10 = [];
  public selected11 = [];
  public nestedSelect;

  public comboOptions = [
    'test 1',
    'test 2',
    'test 3',
    'test 4'
  ]

  public selectOptions = [
    {value: 'test1', label: 'Test 1'},
    {value: 'test2', label: 'Test 2'},
    {value: 'test3', label: 'Test 3'},
    {value: 'test4', label: 'Test 4'}
  ]

  public repeatOptions = [{
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

  public nestedOptions = [{
    label: 'Continue To Next Step',
    name: 'repeatMenu',
    action: 'repeatActionsOnInput',
    value: '1'
  }, {
    label: 'Repeat Menu',
    name: 'repeatMenu',
    action: 'repeatActionsOnInput',
    value: '2',
    childOptions: this.repeatOptions
  }, {
    label: 'Repeat and Continue To Next Step',
    name: 'repeatMenuContinue',
    action: 'repeatActionsOnInputContinue',
    value: '3',
    childOptions: this.repeatOptions
  }, {
    label: 'Return To Previous Menu',
    name: 'returnPreviousMenu',
    action: 'returnPreviousActionsOnInput',
    value: '4'
  }, ];
}

export class SelectKitchenSink implements angular.IComponentOptions {
  public static selector = 'exampleSelectKitchenSink';
  public static bindings = {};
  public static controller = SelectKitchenSinkController;
  public static template = `
    <form name="myInputsForm" novalidate>
      <div class="row" style="padding: 16px;">
        <div class="col-sm-6">
          <h5>Select</h5>
          <md-select
            name='steeringDigit'
            ng-model="$ctrl.selected0"
            options="::$ctrl.selectOptions"
          ></md-select>
        </div>
        <div class="col-sm-6">
          <h5>Select with Placeholder</h5>
          <md-select
            name='steeringDigitPlaceholder'
            ng-model="$ctrl.selectedPlaceholder"
            options="::$ctrl.selectOptions"
            placeholder="Placeholder"
          ></md-select>
        </div>
        <div class="col-sm-6">
          <h5>Select Combo</h5>
          <md-select
            name='steeringDigit1'
            ng-model="$ctrl.selected1"
            options="$ctrl.comboOptions"
            combo="true"
          ></md-select>
        </div>
        <div class="col-sm-6">
          <h5>Select Combo Placeholder</h5>
          <md-select
            name='steeringDigitComboPlaceholder'
            ng-model="$ctrl.selectedComboPlaceholder"
            options="$ctrl.comboOptions"
            combo="true"
            placeholder="Placeholder"
          ></md-select>
        </div>
        <div class="col-sm-6">
          <h5>Select Search Combo</h5>
          <md-select
            name='steeringDigit2'
            ng-model="$ctrl.selected2"
            options="$ctrl.comboOptions"
            filter="false"
            required="true"
            combo="true"
            searchable-combo="true"
          ></md-select>
        </div>
        <div class="col-sm-6">
          <h5>Select Filter</h5>
          <md-select
            name='steeringDigit3'
            ng-model="$ctrl.selected3"
            options="$ctrl.selectOptions"
            filter="true"
            input-placeholder="Placeholder"
          ></md-select>
        </div>
        <div class="col-sm-6">
          <h5>Select Combo Filter</h5>
          <md-select
            name='steeringDigit4'
            ng-model="$ctrl.selected4"
            options="$ctrl.comboOptions"
            filter="true"
            combo="true"
            required="true"
          ></md-select>
        </div>
        <div class="col-sm-6">
          <h5>Select Multi</h5>
          <md-select
            name='steeringDigit5'
            ng-model="$ctrl.selected5"
            options="::$ctrl.selectOptions"
            multi="true"
            singular="Value"
            plural="Values"
          ></md-select>
        </div>
        <div class="col-sm-6">
          <h5>Select Multi Filter</h5>
          <md-select
            name='steeringDigit6'
            ng-model="$ctrl.selected6"
            options="::$ctrl.selectOptions"
            filter="true"
            multi="true"
            singular="Value"
            plural="Values"
            required="true"
          ></md-select>
        </div>
        <div class="col-sm-6">
          <h5>Select Secondary Label</h5>
          <md-select
            name='steeringDigit8'
            ng-model="$ctrl.selected8"
            options="$ctrl.selectOptions"
            required="true"
            secondary-label="Secondary Label"
          ></md-select>
        </div>
        <div class="col-sm-6">
          <h5>Select Nested</h5>
          <md-select
            name='steeringDigitnested'
            ng-model="$ctrl.nestedSelect"
            options="$ctrl.nestedOptions"
            nested="true"
            required="true"
            icon="icon-chevron-down"
            iconnested="icon-chevron-right"
          ></md-select>
        </div>
        <div class="col-sm-6">
          <h5>Select Warn</h5>
          <md-select
            name='selectWarn'
            ng-model="$ctrl.selected9"
            options="$ctrl.selectOptions"
            is-warn="true"
            warn-msg="Test Warning Message"
            required="true"
          ></md-select>
        </div>
        <div class="col-sm-6">
          <h5>Select Error</h5>
          <md-select
            name='selectError'
            ng-model="$ctrl.selected10"
            options="$ctrl.selectOptions"
            is-error="true"
            error-msg="Test Error Message"
            required="true"
          ></md-select>
        </div>
        <div class="col-sm-6">
          <h5>Select Error/Warn</h5>
          <md-select
            name='selectErrorWarn'
            ng-model="$ctrl.selected11"
            options="$ctrl.selectOptions"
            is-warn="true"
            is-error="true"
            error-msg="Test Error Message"
            warn-msg="Test Warn Message"
            required="true"
          ></md-select>
        </div>
      </div>
    </form>
  `;
}
