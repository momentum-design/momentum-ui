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
  public mdType: CardType;
  public mdMemberType: string;
  public mdId: string;
  public mdIndex: number;
  public mdTitle: string;
  public mdSubtitle: string;
  public mdImage: string;
  public mdComplexCardType: ComplexCardType;
  public mdCheckboxes: Array<ICardMemberCheckbox>;
  public mdRadios: Array<ICardMemberItem>;
  public mdItems: Array<ICardMemberItem>;
  public mdRadioValue: string;
  public mdRemoveLabel: string;
  public mdReordering: boolean;
  public mdReorderKeypress: Function;
  public onUpdate: Function;
  public onRemove: Function;
  public onToggled: Function;

  public toggled: boolean = false;
  public isSimple: boolean = false;

  public deleteAriaLabel: string;
  public toggleAriaLabel: string;
  public isSelected: boolean;

  public $onInit(): void {
    if (this.mdType === CardType.SIMPLE) {
      this.isSimple = true;
    } else if (this.mdType === CardType.COMPLEX) {
      this.isSimple = false;
      if (this.mdRadios && this.mdRadioValue && this.mdComplexCardType === ComplexCardType.RADIO) {
        this.mdSubtitle = _.get(_.find(this.mdRadios, { value: this.mdRadioValue }), 'label');
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
      id: this.mdId,
    });
  }

  public onChangeRadio(radio: ICardMemberItem): void {
    this.mdSubtitle = radio.label;
    this.onUpdate({
      id: this.mdId,
      data: radio,
    });
  }

  public onChange(): void {
    this.onUpdate({
      id: this.mdId,
      data: this.mdCheckboxes,
    });
  }

  public reorderKeypress($event): void {
    if (!_.isUndefined(this.mdReorderKeypress)) {
      this.mdReorderKeypress({ $event: event, id: this.mdId});
    }
  }
}

export class CardMemberComponent implements ng.IComponentOptions {
  public controller = CardMemberCtrl;
  public template = `
    <div class="md-ng1-card card-member">
      <div id="cardReorder{{$ctrl.mdIndex}}" class="upper-panel" tabindex="{{$ctrl.mdReordering ? 0 : -1}}" ng-keydown="$ctrl.reorderKeypress($event)">
        <div class="left-panel">
          <img ng-if="$ctrl.mdImage" class="user-img" ng-src="{{$ctrl.mdImage}}"/>
          <i ng-if="!$ctrl.mdImage && $ctrl.mdMemberType === 'user'" class="icon icon-user"></i>
          <i ng-if="!$ctrl.mdImage && $ctrl.mdMemberType === 'place'" class="icon icon-location"></i>
          <i ng-if="!$ctrl.mdImage && $ctrl.mdMemberType === 'group'" class="icon icon-conference"></i>
        </div>
        <div class="middle-panel">
          <p class="title" title="{{$ctrl.mdTitle}}">{{$ctrl.mdTitle}}</p>
          <p title="{{$ctrl.mdSubtitle}}">{{$ctrl.mdSubtitle}}</p>
        </div>
        <div class="right-panel">
          <i ng-if="$ctrl.isSimple && !$ctrl.mdReordering"
             ng-click="$ctrl.onRemoveClick()"
             class="icon icon-exit"
             aria-label="{{::$ctrl.deleteAriaLabel}}">
          </i>
          <i ng-if="!$ctrl.isSimple && !$ctrl.mdReordering"
             ng-click="$ctrl.toggle()"
             class="icon"
             ng-class="{'icon-chevron-down': !$ctrl.toggled, 'icon-chevron-up': $ctrl.toggled}"
             aria-label="{{::$ctrl.toggleAriaLabel}}">
          </i>
          <i ng-if="$ctrl.mdReordering"
             class="icon icon-tables"
             ng-class="{'selected': $ctrl.isSelected}">
          </i>
        </div>
      </div>
      <div ng-if="!$ctrl.isSimple && $ctrl.toggled" class="lower-panel">
        <div ng-if="$ctrl.mdCheckboxes && $ctrl.mdComplexCardType === 'checkbox'" ng-repeat="checkbox in $ctrl.mdCheckboxes" class="sub-panel">
          <div class="md-checkbox-group">
            <input
              md-input
              type="checkbox"
              id="checkbox-{{$ctrl.mdId}}-{{$index}}"
              md-input-label="{{checkbox.label}}"
              md-input-help-text="{{checkbox.sublabel}}"
              name="checkbox-{{$index}}"
              ng-model="checkbox.value"
              ng-change="$ctrl.onChange()"
              ng-disabled="checkbox.disabled">
          </div>
        </div>
        <div ng-if="$ctrl.mdRadios && $ctrl.mdComplexCardType === 'radio'" class="sub-panel">
          <div class="md-radio-group">
            <input ng-repeat="radio in $ctrl.mdRadios"
              md-input
              type="radio"
              ng-model="$ctrl.mdRadioValue"
              id="radio-{{$ctrl.mdId}}-{{$index}}"
              name="{{::$ctrl.mdId}}RadioButtonGroup"
              ng-value="'{{radio.value}}'"
              md-input-label="{{radio.label}}"
              md-input-help-text="{{radio.sublabel}}"
              ng-change="$ctrl.onChangeRadio(radio)">
          </div>
        </div>
        <div ng-if="$ctrl.mdItems && $ctrl.mdComplexCardType === 'static'" ng-repeat="item in $ctrl.mdItems" class="sub-panel">
          <div class="description">
            <p>{{item.label}}</p>
          </div>
        </div>
        <div>
          <a href ng-click="$ctrl.onRemoveClick()" class="remove">{{$ctrl.mdRemoveLabel}}</a>
        </div>
      </div>
    </div>
  `;
  public bindings = {
    mdId: '<',
    mdIndex: '<?',
    mdType: '@',
    mdComplexCardType: '@',
    mdMemberType: '@',
    mdTitle: '<',
    mdSubtitle: '<',
    mdImage: '<',
    mdCheckboxes: '<',
    mdRadios: '<',
    mdRadioValue: '<',
    mdItems: '<',
    mdReordering: '<',
    mdReorderKeypress: '&?',
    mdRemoveLabel: '<',
    onUpdate: '&',
    onRemove: '&',
    onToggled: '&',
    deleteAriaLabel: '@?',
    toggleAriaLabel: '@?',
    isSelected: '<?',
  };
}
