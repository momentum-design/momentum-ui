import * as _ from 'lodash';

export class CheckboxCtrl implements ng.IComponentController {
  private disabledBool: boolean;
  private isDisabled: string;
  public chkboxModel: any;
  public ngModelCtrl: ng.INgModelController;
  public onChangeFn?: Function;

  constructor () {
    this.disabledBool = this.convertStringBoolToBoolean(this.isDisabled);
  }
  public $onInit(): void {
    this.ngModelCtrl.$render = () => {
      this.chkboxModel = this.ngModelCtrl.$viewValue;
    };
  }

  public $onChanges(changes: { [bindings: string]: ng.IChangesObject<any> }): void {
    if (!_.isUndefined(this.isDisabled)) {
      if (changes.isDisabled.currentValue != null) {
        this.disabledBool = this.convertStringBoolToBoolean(changes.isDisabled.currentValue);
      }
    }
  }

  public changeChkboxModel(): void {
    this.ngModelCtrl.$setViewValue(this.chkboxModel);
    if (this.onChangeFn) {
      this.onChangeFn({
        checkboxValue: this.chkboxModel,
      });
    }
  }

  private convertStringBoolToBoolean(str: string): boolean {
    let bool = false;
    if (String(str).toLowerCase() === 'true') {
      bool = true;
    }
    return bool;
  }
}

export class CheckboxComponent implements ng.IComponentOptions {
  public controller = CheckboxCtrl;
  public template = `
    <div class="md-input-group md-checkbox" ng-class="{horizontal: horizontal}">
      <input type="checkbox" class="md-input md-checkbox__input" ng-model="$ctrl.chkboxModel" name="{{$ctrl.name}}" id="{{$ctrl.id}}" ng-disabled="$ctrl.disabledBool" tabindex="{{::mdTabindex ? mdTabindex : 0}}" ng-change="$ctrl.changeChkboxModel()">
      <label class="md-checkbox__label" for="{{$ctrl.id}}">
        <span>{{$ctrl.label}}</span>
      </label>
    </div>
  `;
  public bindings = {
    name: '@',
    label: '@',
    id: '@ckid',
    isDisabled: '<isdisabled',
    mdTabindex: '<?',
    onChangeFn: '&?',
  };
  public require = {
    ngModelCtrl: 'ngModel',
  };
}
