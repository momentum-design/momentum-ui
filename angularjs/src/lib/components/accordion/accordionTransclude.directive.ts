
// Use in the md-accordion-group template to indicate where you want the heading to be transcluded
// You must provide the property on the md-accordion-group controller that will hold the transcluded element
// <div class="md-accordion-group">
//   <div class="md-accordion-heading" ><a ... md-accordion-transclude="heading">...</a></div>
//   ...
// </div>
export function mdAccordionTransclude() {
  let mdAccordionTranscludeDirective = {
    require: '^mdAccordionGroup',
    link: link,
  };

  function link(scope, element, attr, controller) {
    scope.$watch(function () {
      return controller[attr.mdAccordionTransclude];
    }, function (heading) {
      if (heading) {
        element.html('');
        element.append(heading);
      }
    });
  }

  return mdAccordionTranscludeDirective;
}
