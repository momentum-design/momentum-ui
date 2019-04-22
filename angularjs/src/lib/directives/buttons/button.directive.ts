/**
* @name Loading Button
* @description Change the State of Button to loading
*
* @category forms
* @component buttons
* @section loading
*
* @html
*   <button md-btn class="md-button md-button--blue" loading="$ctrl.loading" ng-click="$ctrl.loading = !$ctrl.loading">Button Text</button>
*
*   <button md-btn class="md-button md-button--mint md-button--52" loading="$ctrl.loading2" ng-click="$ctrl.loading2 = !$ctrl.loading2">Button Text 2</button>
*
*   <button md-btn type="button" class="md-button md-button--circle md-button--52 md-button--blue" loading="$ctrl.loading3" ng-click="$ctrl.loading3 = !$ctrl.loading3"><span class="icon icon-search"></span></button>
*
*   <button md-btn type="button" class="md-button md-button--circle md-button--small md-button--orange icon" loading="$ctrl.loading4" ng-click="$ctrl.loading4 = !$ctrl.loading4"><span class="icon-search"></span></button>
*
*   <button class="md-button" ng-click="$ctrl.loading = false; $ctrl.loading2 = false; $ctrl.loading3 = false; $ctrl.loading4 = false">Reset Loading State</button>
*
* @param loading - triggers loading state (expression)
* @param ngDisabled - disables button (boolean or expression)
*
*/

export function mdBtn() {
  let mdBtnDirective = {
    restrict: 'EA',
    transclude: true,
    replace: false,
    priority: -1000,
    scope: {
      loading: '=',
      ngDisabled: '=',
    },
    template: `
      <span ng-transclude class="md-button__children" ng-if="!isLoading"></span>
      <div class="md-loading" ng-if="isLoading">
        <span class="md-loading__icon"></span>&nbsp;<span class="md-loading__icon"></span>&nbsp;<span class="md-loading__icon"></span>
      </div>
      <span class="md-button__children" ng-if="isLoading" style="opacity: 0;">loading</span>
    `,
    link: function(scope, elem, attrs) {
      elem.addClass('md-button');
      scope.$watch('loading', function(newValue, oldValue) {
        if (newValue) {
          let width = $(elem).foobar('width');
          scope.isLoading = true;
          elem.foobar('width', width);
          elem.attr('disabled', 'disabled');
        } else if (newValue === false) {
          scope.isLoading = false;
          elem.foobar('width', '');  // remove the width style instead of overwriting it
          if (!scope.ngDisabled) {
              elem.removeAttr('disabled');
          }
        }
      });
    },
  };

  return mdBtnDirective;
}
