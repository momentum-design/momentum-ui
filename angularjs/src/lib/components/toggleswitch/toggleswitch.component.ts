/*
* @category controls
* @component toggle-switch
*/
export function csToggleSwitch() {
  let directive = {
    restrict: 'E',
    replace: true,
    scope: {
      size: '@',
      id: '@toggleId',
      name: '@',
      ngModel: '=',
      isDisabled: '=',
      csChange: '&',
      csTrueValue: '@',
      csFalseValue: '@',
      csKeypressFn: '&?',
      csAriaLabel: '@?',
      csLabel: '@?',
    },
    template: `
      <div class="md-toggle-switch">
        <input
          class="md-input md-toggle-switch__input"
          type="checkbox"
          ng-model="ngModel"
          name="{{name}}"
          id="{{id}}"
          ng-disabled="isDisabled"
          ng-change="csChange({toggleValue: ngModel})"
          ng-true-value="{{csTrueValue || true}}"
          ng-false-value="{{csFalseValue || false}}"
          aria-label="{{::csAriaLabel}}"
          ng-keydown="keypressFn($event)">
        <label class="md-toggle-switch__label" for="{{id}}">
          <span class="md-toggle-switch__label__container"></span>
          <span class="md-toggle-switch__label__text" ng-if="csLabel">{{::csLabel}}</span>
        </label>
      </div>
    `,
    link: function (scope) {
      scope.keypressFn = function ($event) {
        if (scope.csKeypressFn) {
          scope.csKeypressFn({ $event: $event });
        }
      };
    },
  };
  return directive;
}

/**
* @name Default Toggle Switch
* @description Toggle Switches are useful.
*
* @category controls
* @component toggle-switch
* @section default
*
* @html

<cs-toggle-switch
  ng-model="ctrl.button1"
  toggle-id="toggle1"
  name="toggleExample1"
  cs-label="Label">
</cs-toggle-switch>
**/

/**
* @name Disabled Toggle Switch
* @description Toggle Switches are useful.
*
* @category controls
* @component toggle-switch
* @section disabled
*
* @html

<cs-toggle-switch
  is-disabled="true"
  ng-model="ctrl.button1"
  toggle-id="toggle2"
  name="toggleExample2"
  cs-label="Label">
</cs-toggle-switch>
**/
