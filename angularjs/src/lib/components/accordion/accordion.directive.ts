import * as angular from 'angular';
// The accordion directive simply sets up the directive controller
// and adds an accordion CSS class to itself element.

MdAccordionController.$inject = ['$scope', '$attrs', 'mdAccordionConfig'];
export function MdAccordionController($scope, $attrs, mdAccordionConfig) {
  let vm = this;
  // This array keeps track of the accordion groups
  vm.groups = [];

  // Ensure that all the groups in this accordion are closed, unless close-others explicitly says not to
  vm.closeOthers = function (openGroup) {
    let closeOthers = angular.isDefined($attrs.closeOthers) ?
      $scope.$eval($attrs.closeOthers) : mdAccordionConfig.closeOthers;
    if (closeOthers) {
      angular.forEach(vm.groups, function (group) {
        if (group !== openGroup) {
          group.isOpen = false;
        }
      });
    }
  };

  // This is called from the accordion-group directive to add itself to the accordion
  vm.addGroup = function (groupScope) {
    vm.groups.push(groupScope);

    groupScope.$on('$destroy', function (event) {
      vm.removeGroup(groupScope);
    });
  };

  // This is called from the accordion-group directive when to remove itself
  vm.removeGroup = function (group) {
    let index = vm.groups.indexOf(group);
    if (index !== -1) {
      vm.groups.splice(index, 1);
    }
  };

}

export function mdAccordion() {
  let mdAccordionDirective = {
    restrict: 'EA',
    controller: MdAccordionController,
    controllerAs: 'mdAccordion',
    transclude: true,
    template: `<div class="md-accordion" ng-transclude></div>`,
  };

  return mdAccordionDirective;
}
