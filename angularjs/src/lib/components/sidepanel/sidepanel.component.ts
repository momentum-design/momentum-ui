/**
* @category layout
* @component side-panel
*/
// const sidepanelModalTemplate = require('./sidepanel-modal.html');

/* @ngInject */
export function CsSidePanelCtrl($state) {
  /*jshint validthis: true */
  let vm = this;
  vm.close = closePanel;

  function closePanel() {
    $state.sidepanel.close();
  }
}

export function csSidepanel() {
  // Usage: <cs-sidepanel></cs-sidepanel>
  let directive = {
    restrict: 'E',
    controller: 'CsSidePanelCtrl',
    controllerAs: 'sp',
    scope: {
      size: '@',
    },
    template: `<div class="side-panel" ng-class="size" ui-view="sidepanel"></div>`,
    transclude: true,
  };
  return directive;
}

export function csSpHeader() {
  // Usage: <cs-sp-header></cs-sp-header>
  let directive = {
    require: '^csSidepanel',
    restrict: 'E',
    template: `
      <div class="side-panel-header" ng-transclude></div>
      <div class="side-panel-close">
        <button type="button" class="cui-button cui-button--none panel-close cui-close" ng-click="close()">
          <span class="sr-only">close panel</span>
        </button>
      </div>
    `,
    transclude: true,
    link: function (scope, element, attrs, CsSidePanelCtrl) {
      scope.close = CsSidePanelCtrl.close;
    },
  };
  return directive;
}

export function csSpContainer() {
  // Usage: <cs-sp-container></cs-sp-container>
  let directive = {
    restrict: 'E',
    template: `
      <div class="side-panel-container">
        <div class="side-panel-wrapper">
          <div class="breadcrumb-container">
            <cs-breadcrumbs displayname-property="data.displayName" cs-tabindex="csTabindex"></cs-breadcrumbs>
          </div>
          <ng-transclude></ng-transclude>
        </div>
        <div class="side-panel-view" ui-view></div>
      </div>
      </div>
    `,
    transclude: true,
    scope: {
      csTabindex: '<?', // used to selectively turn off breadcrumbs in the tabindex when covered by save/cancel buttons
                      // cs-breadcrumbs defaults tabindex to 0
                      // Example: <cs-sp-container cs-tabindex="$ctrl.form.dirty ? -1 : 0"></cs-sp-container>
    },
  };
  return directive;
}

export function csSpSection() {
  // Usage: <cs-sp-section><cs-sp-section>
  let directive = {
    restrict: 'E',
    template: `<div class="side-panel-section" ng-transclude></div>`,
    transclude: true,
  };
  return directive;
}

export function csSpButtons() {
  // Usage: <cs-sp-buttons></cs-sp-buttons>
  let directive = {
    restrict: 'E',
    scope: {
      showButtons: '=showButtons',
    },
    template: `<div class="button-container" ng-transclude></div>`,
    transclude: true,
  };
  return directive;
}
/*
* @name Side Panel
* @description
* @category layout
* @component side-panel
* @section states
*/