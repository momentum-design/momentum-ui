/**
* @name Loading Button
* @description Change the State of Button to loading
*
* @category forms
* @component buttons
* @section loading
*
* @html
*   <button cs-btn class="cui-button cui-button--blue" loading="$ctrl.loading" ng-click="$ctrl.loading = !$ctrl.loading">Button Text</button>
*
*   <button cs-btn class="cui-button cui-button--mint cui-button--52" loading="$ctrl.loading2" ng-click="$ctrl.loading2 = !$ctrl.loading2">Button Text 2</button>
*
*   <button cs-btn type="button" class="cui-button cui-button--circle cui-button--52 cui-button--blue" loading="$ctrl.loading3" ng-click="$ctrl.loading3 = !$ctrl.loading3"><span class="icon icon-search"></span></button>
*
*   <button cs-btn type="button" class="cui-button cui-button--circle cui-button--small cui-button--orange icon" loading="$ctrl.loading4" ng-click="$ctrl.loading4 = !$ctrl.loading4"><span class="icon-search"></span></button>
*
*   <button class="cui-button" ng-click="$ctrl.loading = false; $ctrl.loading2 = false; $ctrl.loading3 = false; $ctrl.loading4 = false">Reset Loading State</button>
*
* @param loading - triggers loading state (expression)
* @param ngDisabled - disables button (boolean or expression)
*
*/

export function csBtn() {
  let csBtnDirective = {
    restrict: 'EA',
    transclude: true,
    replace: false,
    priority: -1000,
    scope: {
      loading: '=',
      ngDisabled: '=',
    },
    template: `
      <span ng-transclude class="cui-button__children" ng-if="!isLoading"></span>
      <div class="cui-loading" ng-if="isLoading">
        <span class="cui-loading__icon"></span>&nbsp;<span class="cui-loading__icon"></span>&nbsp;<span class="cui-loading__icon"></span>
      </div>
      <span class="cui-button__children" ng-if="isLoading" style="opacity: 0;">loading</span>
    `,
    link: function(scope, elem, attrs) {
      elem.addClass('cui-button');
      scope.$watch('loading', function(newValue, oldValue) {
        if (newValue) {
          let width = $(elem).css('width');
          scope.isLoading = true;
          elem.css('width', width);
          elem.attr('disabled', 'disabled');
        } else if (newValue === false) {
          scope.isLoading = false;
          elem.css('width', '');  // remove the width style instead of overwriting it
          if (!scope.ngDisabled) {
              elem.removeAttr('disabled');
          }
        }
      });
    },
  };

  return csBtnDirective;
}
