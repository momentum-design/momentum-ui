// Use cs-accordion-heading below a cs-accordion-group to provide a heading containing HTML
// <cs-accordion-group>
//   <cs-accordion-heading>Heading containing HTML - <img src="..."></cs-accordion-heading>
// </cs-accordion-group>
export function csAccordionHeading() {
  let csAccordionHeadingDirective = {
    restrict: 'EA',
    transclude: true, // Grab the contents to be used as the heading
    template: '', // In effect remove this element!
    replace: true,
    require: '^csAccordionGroup',
    link: link,
  };

  function link(scope, element, attr, csAccordionGroupCtrl, transclude) {
    // Pass the heading to the cs-accordion-group controller
    // so that it can be transcluded into the right place in the template
    // [The second parameter to transclude causes the elements to be cloned so that they work in ng-repeat]
    csAccordionGroupCtrl.setHeading(transclude(scope, function () { }));
  }

  return csAccordionHeadingDirective;
}
