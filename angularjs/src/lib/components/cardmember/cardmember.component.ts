import * as _ from 'lodash';

export interface ICardMemberCheckbox {
  label: string;
  sublabel?: string;
  value: boolean;
  disabled: boolean;
}

export interface ICardMemberItem {
  label: string;
  sublabel?: string;
  value: string;
}

export enum CardType {
  SIMPLE = <any>'simple',
  COMPLEX = <any>'complex',
}

export enum ComplexCardType {
  CHECKBOX = <any>'checkbox',
  RADIO = <any>'radio',
  STATIC = <any>'static',
}

export class CardMemberCtrl implements ng.IComponentController {
  public csType: CardType;
  public csMemberType: string;
  public csId: string;
  public csIndex: number;
  public csTitle: string;
  public csSubtitle: string;
  public csImage: string;
  public csComplexCardType: ComplexCardType;
  public csCheckboxes: Array<ICardMemberCheckbox>;
  public csRadios: Array<ICardMemberItem>;
  public csItems: Array<ICardMemberItem>;
  public csRadioValue: string;
  public csRemoveLabel: string;
  public csReordering: boolean;
  public csReorderKeypress: Function;
  public onUpdate: Function;
  public onRemove: Function;
  public onToggled: Function;

  public toggled: boolean = false;
  public isSimple: boolean = false;

  public deleteAriaLabel: string;
  public toggleAriaLabel: string;
  public isSelected: boolean;

  public $onInit(): void {
    if (this.csType === CardType.SIMPLE) {
      this.isSimple = true;
    } else if (this.csType === CardType.COMPLEX) {
      this.isSimple = false;
      if (this.csRadios && this.csRadioValue && this.csComplexCardType === ComplexCardType.RADIO) {
        this.csSubtitle = _.get(_.find(this.csRadios, { value: this.csRadioValue }), 'label');
      }
    }
  }

  public toggle(): void {
    this.toggled = !this.toggled;
    this.onToggled({
      toggled: this.toggled,
    });
  }

  public onRemoveClick(): void {
    this.onRemove({
      id: this.csId,
    });
  }

  public onChangeRadio(radio: ICardMemberItem): void {
    this.csSubtitle = radio.label;
    this.onUpdate({
      id: this.csId,
      data: radio,
    });
  }

  public onChange(): void {
    this.onUpdate({
      id: this.csId,
      data: this.csCheckboxes,
    });
  }

  public reorderKeypress($event): void {
    if (!_.isUndefined(this.csReorderKeypress)) {
      this.csReorderKeypress({ $event: event, id: this.csId});
    }
  }
}

export class CardMemberComponent implements ng.IComponentOptions {
  public controller = CardMemberCtrl;
  public template = `
    <div class="md-card card-member">
      <div id="cardReorder{{$ctrl.csIndex}}" class="upper-panel" tabindex="{{$ctrl.csReordering ? 0 : -1}}" ng-keydown="$ctrl.reorderKeypress($event)">
        <div class="left-panel">
          <img ng-if="$ctrl.csImage" class="user-img" ng-src="{{$ctrl.csImage}}"/>
          <i ng-if="!$ctrl.csImage && $ctrl.csMemberType === 'user'" class="icon icon-user"></i>
          <i ng-if="!$ctrl.csImage && $ctrl.csMemberType === 'place'" class="icon icon-location"></i>
          <i ng-if="!$ctrl.csImage && $ctrl.csMemberType === 'group'" class="icon icon-conference"></i>
        </div>
        <div class="middle-panel">
          <p class="title" title="{{$ctrl.csTitle}}">{{$ctrl.csTitle}}</p>
          <p title="{{$ctrl.csSubtitle}}">{{$ctrl.csSubtitle}}</p>
        </div>
        <div class="right-panel">
          <i ng-if="$ctrl.isSimple && !$ctrl.csReordering"
             ng-click="$ctrl.onRemoveClick()"
             class="icon icon-exit"
             aria-label="{{::$ctrl.deleteAriaLabel}}">
          </i>
          <i ng-if="!$ctrl.isSimple && !$ctrl.csReordering"
             ng-click="$ctrl.toggle()"
             class="icon"
             ng-class="{'icon-chevron-down': !$ctrl.toggled, 'icon-chevron-up': $ctrl.toggled}"
             aria-label="{{::$ctrl.toggleAriaLabel}}">
          </i>
          <i ng-if="$ctrl.csReordering"
             class="icon icon-tables"
             ng-class="{'selected': $ctrl.isSelected}">
          </i>
        </div>
      </div>
      <div ng-if="!$ctrl.isSimple && $ctrl.toggled" class="lower-panel">
        <div ng-if="$ctrl.csCheckboxes && $ctrl.csComplexCardType === 'checkbox'" ng-repeat="checkbox in $ctrl.csCheckboxes" class="sub-panel">
          <div class="md-checkbox-group">
            <input
              cs-input
              type="checkbox"
              id="checkbox-{{$ctrl.csId}}-{{$index}}"
              cs-input-label="{{checkbox.label}}"
              cs-input-help-text="{{checkbox.sublabel}}"
              name="checkbox-{{$index}}"
              ng-model="checkbox.value"
              ng-change="$ctrl.onChange()"
              ng-disabled="checkbox.disabled">
          </div>
        </div>
        <div ng-if="$ctrl.csRadios && $ctrl.csComplexCardType === 'radio'" class="sub-panel">
          <div class="md-radio-group">
            <input ng-repeat="radio in $ctrl.csRadios"
              cs-input
              type="radio"
              ng-model="$ctrl.csRadioValue"
              id="radio-{{$ctrl.csId}}-{{$index}}"
              name="{{::$ctrl.csId}}RadioButtonGroup"
              ng-value="'{{radio.value}}'"
              cs-input-label="{{radio.label}}"
              cs-input-help-text="{{radio.sublabel}}"
              ng-change="$ctrl.onChangeRadio(radio)">
          </div>
        </div>
        <div ng-if="$ctrl.csItems && $ctrl.csComplexCardType === 'static'" ng-repeat="item in $ctrl.csItems" class="sub-panel">
          <div class="description">
            <p>{{item.label}}</p>
          </div>
        </div>
        <div>
          <a href ng-click="$ctrl.onRemoveClick()" class="remove">{{$ctrl.csRemoveLabel}}</a>
        </div>
      </div>
    </div>
  `;
  public bindings = {
    csId: '<',
    csIndex: '<?',
    csType: '@',
    csComplexCardType: '@',
    csMemberType: '@',
    csTitle: '<',
    csSubtitle: '<',
    csImage: '<',
    csCheckboxes: '<',
    csRadios: '<',
    csRadioValue: '<',
    csItems: '<',
    csReordering: '<',
    csReorderKeypress: '&?',
    csRemoveLabel: '<',
    onUpdate: '&',
    onRemove: '&',
    onToggled: '&',
    deleteAriaLabel: '@?',
    toggleAriaLabel: '@?',
    isSelected: '<?',
  };
}
