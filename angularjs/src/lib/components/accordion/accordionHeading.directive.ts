// Use md-accordion-heading below a md-accordion-group to provide a heading containing HTML
// <md-accordion-group>
//   <md-accordion-heading>Heading containing HTML - <img src="..."></md-accordion-heading>
// </md-accordion-group>
export function mdAccordionHeading() {
  let mdAccordionHeadingDirective = {
    restrict: 'EA',
    transclude: true, // Grab the contents to be used as the heading
    template: '', // In effect remove this element!
    replace: true,
    require: '^mdAccordionGroup',
    link: link,
  };

  function link(scope, element, attr, mdAccordionGroupCtrl, transclude) {
    // Pass the heading to the md-accordion-group controller
    // so that it can be transcluded into the right place in the template
    // [The second parameter to transclude causes the elements to be cloned so that they work in ng-repeat]
    mdAccordionGroupCtrl.setHeading(transclude(scope, function () { }));
  }

  return mdAccordionHeadingDirective;
}
