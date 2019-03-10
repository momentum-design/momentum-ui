export function popoverTemplatePopup() {
  return {
    replace: true,
    scope: {
      title: '@', contentExp: '&', placement: '@', popupClass: '@', animation: '&', isOpen: '&',
      originScope: '&',
    },
    template: `
      <div class="popover {{placement}}" tooltip-classes ng-class="{ in: isOpen(), fade: animation() }" style="width: auto">
        <div class="arrow"></div>
        <div class="popover-inner">
          <h3 class="popover-title" ng-bind="title" ng-show="title"></h3>
          <div class="popover-content" tooltip-template-transclude="contentExp()" tooltip-template-transclude-scope="originScope()"></div>
        </div>
      </div>
    `,
  };
}

popoverTemplate.$inject = ['$tooltip'];
export function popoverTemplate($tooltip) {
  return $tooltip('popoverTemplate', 'popover', 'click', {
    useContentExp: true,
  });
}

export function popoverHtmlPopup() {
  return {
    replace: true,
    scope: { contentExp: '&', title: '@', placement: '@', popupClass: '@', animation: '&', isOpen: '&' },
    template: `
      <div class="popover {{placement}}" tooltip-classes ng-class="{ in: isOpen(), fade: animation() }" style="width: auto">
        <div class="arrow"></div>
        <div class="popover-inner">
          <h3 class="popover-title" ng-bind="title" ng-show="title"></h3>
          <div class="popover-content" ng-bind-html="contentExp()"></div>
        </div>
      </div>
    `,
  };
}

popoverHtml.$inject = ['$tooltip'];
export function popoverHtml($tooltip) {
  return $tooltip('popoverHtml', 'popover', 'click', {
    useContentExp: true,
  });
}

export function popoverPopup() {
  return {
    replace: true,
    scope: { title: '@', content: '@', placement: '@', popupClass: '@', animation: '&', isOpen: '&' },
    template: `
      <div class="popover {{placement}}" tooltip-classes ng-class="{ in: isOpen(), fade: animation() }" style="width: auto">
        <div class="arrow"></div>
        <div class="popover-inner">
          <h3 class="popover-title" ng-bind="title" ng-show="title"></h3>
          <div class="popover-content" ng-bind="content"></div>
        </div>
      </div>
    `,
  };
}

popover.$inject = ['$tooltip'];
export function popover($tooltip) {
  return $tooltip('popover', 'popover', 'click');
}
