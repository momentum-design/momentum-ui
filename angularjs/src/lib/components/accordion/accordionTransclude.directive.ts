
// Use in the cs-accordion-group template to indicate where you want the heading to be transcluded
// You must provide the property on the cs-accordion-group controller that will hold the transcluded element
// <div class="md-accordion-group">
//   <div class="md-accordion-heading" ><a ... cs-accordion-transclude="heading">...</a></div>
//   ...
// </div>
export function csAccordionTransclude() {
  let csAccordionTranscludeDirective = {
    require: '^csAccordionGroup',
    link: link,
  };

  function link(scope, element, attr, controller) {
    scope.$watch(function () {
      return controller[attr.csAccordionTransclude];
    }, function (heading) {
      if (heading) {
        element.html('');
        element.append(heading);
      }
    });
  }

  return csAccordionTranscludeDirective;
}
