/**
* @category layout
* @component side-panel
*/
// const sidepanelModalTemplate = require('./sidepanel-modal.html');

/* @ngInject */
export function MdSidePanelCtrl($state) {
  /*jshint validthis: true */
  let vm = this;
  vm.close = closePanel;

  function closePanel() {
    $state.sidepanel.close();
  }
}

export function mdSidepanel() {
  // Usage: <md-sidepanel></md-sidepanel>
  let directive = {
    restrict: 'E',
    controller: 'MdSidePanelCtrl',
    controllerAs: 'sp',
    scope: {
      size: '@',
    },
    template: `<div class="side-panel" ng-class="size" ui-view="sidepanel"></div>`,
    transclude: true,
  };
  return directive;
}

export function mdSpHeader() {
  // Usage: <md-sp-header></md-sp-header>
  let directive = {
    require: '^mdSidepanel',
    restrict: 'E',
    template: `
      <div class="side-panel-header" ng-transclude></div>
      <div class="side-panel-close">
        <button type="button" class="md-button md-button--none panel-close md-close" ng-click="close()">
          <span class="sr-only">close panel</span>
        </button>
      </div>
    `,
    transclude: true,
    link: function (scope, element, attrs, MdSidePanelCtrl) {
      scope.close = MdSidePanelCtrl.close;
    },
  };
  return directive;
}

export function mdSpContainer() {
  // Usage: <md-sp-container></md-sp-container>
  let directive = {
    restrict: 'E',
    template: `
      <div class="side-panel-container">
        <div class="side-panel-wrapper">
          <div class="breadcrumb-container">
            <md-breadcrumbs displayname-property="data.displayName" md-tabindex="mdTabindex"></md-breadcrumbs>
          </div>
          <ng-transclude></ng-transclude>
        </div>
        <div class="side-panel-view" ui-view></div>
      </div>
      </div>
    `,
    transclude: true,
    scope: {
      mdTabindex: '<?', // used to selectively turn off breadcrumbs in the tabindex when covered by save/cancel buttons
                      // md-breadcrumbs defaults tabindex to 0
                      // Example: <md-sp-container md-tabindex="$ctrl.form.dirty ? -1 : 0"></md-sp-container>
    },
  };
  return directive;
}

export function mdSpSection() {
  // Usage: <md-sp-section><md-sp-section>
  let directive = {
    restrict: 'E',
    template: `<div class="side-panel-section" ng-transclude></div>`,
    transclude: true,
  };
  return directive;
}

export function mdSpButtons() {
  // Usage: <md-sp-buttons></md-sp-buttons>
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
