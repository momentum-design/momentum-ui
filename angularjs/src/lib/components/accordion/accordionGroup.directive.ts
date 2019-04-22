// The md-accordion-group directive indicates a block of html that will expand and collapse in an accordion
export function mdAccordionGroup() {
  let mdAccordionGroupDirective = {
    require: '^mdAccordion', // We need this directive to be inside an accordion
    restrict: 'EA',
    transclude: true, // It transcludes the contents of the directive into the template
    replace: true, // The element containing the directive will be replaced with the template
    template: // ng-show is used for the content section in case of forms
     `<div
        class="md-accordion__group"
        ng-class="{'md-accordion__group--active': isOpen, 'md-accordion__group--disabled': isDisabled}">
        <div
          class="md-accordion__header"
          ng-click="toggleOpen()">
          <span
            class="md-accordion__header-text"
            md-accordion-transclude="heading">
            <ng-transclude></ng-transclude>
          </span>
          <span class="md-accordion__header-icon ng-scope"></span>
        </div>
        <div class="md-accordion__content"
          ng-show="isOpen"
          ng-transclude>
        </div>
      </div>`,
    scope: {
      heading: '@', // Interpolate the heading attribute onto this scope
      isOpen: '=?',
      isDisabled: '=?',
      displayStatus: '@?',
      showCaret: '=?',
    },
    controller: mdAccordionGroupCtrl,
    controllerAs: 'mdAccordionGrp',
    link: link,
  };

  function link(scope, element, attrs, mdAccordionCtrl) {
    scope.toggleOpen = toggleOpen;

    mdAccordionCtrl.addGroup(scope);

    scope.$watch('isOpen', function (value) {
      if (value) {
        mdAccordionCtrl.closeOthers(scope);
      }
    });

    function toggleOpen() {
      if (!scope.isDisabled) {
        scope.isOpen = !scope.isOpen;
      }
    }
  }

  function mdAccordionGroupCtrl() {
    let vm = this;
    vm.setHeading = setHeading;

    function setHeading(element) {
      vm.heading = element;
    }
  }

  return mdAccordionGroupDirective;
}
