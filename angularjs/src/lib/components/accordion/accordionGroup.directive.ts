// The cs-accordion-group directive indicates a block of html that will expand and collapse in an accordion
export function csAccordionGroup() {
  let csAccordionGroupDirective = {
    require: '^csAccordion', // We need this directive to be inside an accordion
    restrict: 'EA',
    transclude: true, // It transcludes the contents of the directive into the template
    replace: true, // The element containing the directive will be replaced with the template
    template: // ng-show is used for the content section in case of forms
     `<div
        class="cui-accordion__group"
        ng-class="{'cui-accordion__group--active': isOpen, 'cui-accordion__group--disabled': isDisabled}">
        <div
          class="cui-accordion__header"
          ng-click="toggleOpen()">
          <span
            class="cui-accordion__header-text"
            cs-accordion-transclude="heading">
            <ng-transclude></ng-transclude>
          </span>
          <span class="cui-accordion__header-icon ng-scope"></span>
        </div>
        <div class="cui-accordion__content"
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
    controller: csAccordionGroupCtrl,
    controllerAs: 'csAccordionGrp',
    link: link,
  };

  function link(scope, element, attrs, csAccordionCtrl) {
    scope.toggleOpen = toggleOpen;

    csAccordionCtrl.addGroup(scope);

    scope.$watch('isOpen', function (value) {
      if (value) {
        csAccordionCtrl.closeOthers(scope);
      }
    });

    function toggleOpen() {
      if (!scope.isDisabled) {
        scope.isOpen = !scope.isOpen;
      }
    }
  }

  function csAccordionGroupCtrl() {
    let vm = this;
    vm.setHeading = setHeading;

    function setHeading(element) {
      vm.heading = element;
    }
  }

  return csAccordionGroupDirective;
}
