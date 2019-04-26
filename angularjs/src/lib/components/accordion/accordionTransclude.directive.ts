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
