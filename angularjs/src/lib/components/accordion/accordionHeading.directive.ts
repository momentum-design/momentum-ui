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
    mdAccordionGroupCtrl.setHeading(transclude(scope, function () { }));
  }

  return mdAccordionHeadingDirective;
}
