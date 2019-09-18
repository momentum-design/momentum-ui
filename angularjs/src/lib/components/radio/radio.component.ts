/** @component radio */

export function mdRadio() {
  let directive = {
    scope: {
      name: '@',
      value: '=',
      label: '=',
      radioModel: '=ngModel',
      id: '=',
      isDisabled: '=isdisabled',
      horizontal: '=',
    },
    restrict: 'E', // E = Element, A = Attribute, C = Class, M = Comment
    template: `
      <div class="md-input-container md-radio" ng-class="{horizontal: horizontal}">
        <input class="md-input md-radio__input" type="radio" ng-model="radioModel" ng-value="value" name="{{name}}" id="{{id}}" ng-disabled="{{isDisabled}}">
        <label class="md-radio__label" ng-class="{horizontal: horizontal}" for="{{id}}">
          <span>{{label}}</span>
        </label>
      </div>
    `,
  };

  return directive;
}
