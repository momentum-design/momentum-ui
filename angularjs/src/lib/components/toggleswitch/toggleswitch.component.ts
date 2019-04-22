/*
* @category controls
* @component toggle-switch
*/
export function mdToggleSwitch() {
  let directive = {
    restrict: 'E',
    replace: true,
    scope: {
      size: '@',
      id: '@toggleId',
      name: '@',
      ngModel: '=',
      isDisabled: '=',
      mdChange: '&',
      mdTrueValue: '@',
      mdFalseValue: '@',
      mdKeypressFn: '&?',
      mdAriaLabel: '@?',
      mdLabel: '@?',
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
          ng-change="mdChange({toggleValue: ngModel})"
          ng-true-value="{{mdTrueValue || true}}"
          ng-false-value="{{mdFalseValue || false}}"
          aria-label="{{::mdAriaLabel}}"
          ng-keydown="keypressFn($event)">
        <label class="md-toggle-switch__label" for="{{id}}">
          <span class="md-toggle-switch__label__container"></span>
          <span class="md-toggle-switch__label__text" ng-if="mdLabel">{{::mdLabel}}</span>
        </label>
      </div>
    `,
    link: function (scope) {
      scope.keypressFn = function ($event) {
        if (scope.mdKeypressFn) {
          scope.mdKeypressFn({ $event: $event });
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

<md-toggle-switch
  ng-model="ctrl.button1"
  toggle-id="toggle1"
  name="toggleExample1"
  md-label="Label">
</md-toggle-switch>
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

<md-toggle-switch
  is-disabled="true"
  ng-model="ctrl.button1"
  toggle-id="toggle2"
  name="toggleExample2"
  md-label="Label">
</md-toggle-switch>
**/
