import * as angular from 'angular';

export class $tooltip implements ng.IServiceProvider {
  constructor() {}
    // The default options tooltip and popover.

  private defaultOptions = {
    placement: 'top',
    showcaret: false,
    placementClassPrefix: '',
    animation: true,
    popupDelay: 0,
    popupCloseDelay: 0,
    useContentExp: false,
  };
  // Default hide triggers for each show trigger
  private triggerMap = {
    mouseenter: 'mouseleave',
    click: 'click',
    outsideClick: 'outsideClick',
    focus: 'blur',
    none: '',
  };

  // The options specified to the provider globally.
  private globalOptions = {};

  /**
   * `options({})` allows global configuration of all tooltips in the
   * application.
   *
   *   var app = angular.module( 'App', ['ui.bootstrap.tooltip'], function( $tooltipProvider ) {
   *     // place tooltips left instead of top by default
   *     $tooltipProvider.options( { placement: 'left' } );
   *   });
   */
  public options = (value) => {
    angular.extend(this.globalOptions, value);
  };

  /**
   * This allows you to extend the set of trigger mappings available. E.g.:
   *
   *   $tooltipProvider.setTriggers( 'openTrigger': 'closeTrigger' );
   */
  public setTriggers = (triggers) => {
    angular.extend(this.triggerMap, triggers);
  };

  /**
   * This is a helper function for translating camel-case to snake_case.
   */
  private snake_case = (name) => {
    let regexp = /[A-Z]/g;
    let separator = '-';
    return name.replace(regexp, (letter, pos) => {
      return (pos ? separator : '') + letter.toLowerCase();
    });
  }

  public $get = ['$window', '$compile', '$timeout', '$document', '$position', '$interpolate', '$rootScope', '$parse', '$$stackedMap', ($window, $compile, $timeout, $document, $position, $interpolate, $rootScope, $parse, $$stackedMap) => {
    let openedTooltips = $$stackedMap.createNew();
    $document.on('keypress', keypressListener);

    $rootScope.$on('$destroy', () => {
      $document.off('keypress', keypressListener);
    });

    function keypressListener(e) {
      if (e.which === 27) {
        let last = openedTooltips.top();
        if (last) {
          last.value.close();
          openedTooltips.removeTop();
          last = null;
        }
      }
    }
    return (ttType, prefix, defaultTriggerShow, options) => {
      options = angular.extend({}, this.defaultOptions, this.globalOptions, options);

      /**
       * Returns an object of show and hide triggers.
       *
       * If a trigger is supplied,
       * it is used to show the tooltip; otherwise, it will use the `trigger`
       * option passed to the `$tooltipProvider.options` method; else it will
       * default to the trigger supplied to this directive factory.
       *
       * The hide trigger is based on the show trigger. If the `trigger` option
       * was passed to the `$tooltipProvider.options` method, it will use the
       * mapped trigger from `triggerMap` or the passed trigger if the map is
       * undefined; otherwise, it uses the `triggerMap` value of the show
       * trigger; else it will just use the show trigger.
       */
      let getTriggers = (trigger) => {
        let show = (trigger || options.trigger || defaultTriggerShow).split(' ');
        let hide = show.map((trigger) => {
          return this.triggerMap[trigger] || trigger;
        });
        return {
          show: show,
          hide: hide,
        };
      };

      let directiveName = this.snake_case(ttType);

      let startSym = $interpolate.startSymbol();
      let endSym = $interpolate.endSymbol();
      let template =
        '<div ' + directiveName + '-popup ' +
        'title="' + startSym + 'title' + endSym + '" ' +
        (options.useContentExp ?
          'content-exp="contentExp()" ' :
          'content="' + startSym + 'content' + endSym + '" ') +
        'placement="' + startSym + 'placement' + endSym + '" ' +
        'popup-class="' + startSym + 'popupClass' + endSym + '" ' +
        'class="tooltip tip-' + startSym + 'placement' + endSym + '"' +
        'animation="animation" ' +
        'is-open="isOpen"' +
        'showcaret="showcaret"' +
        'origin-scope="origScope" ' +
        'style="visibility: hidden; display: block; top: -9999px; left: -9999px;width: auto;"' +
        '>' +
        '</div>';

      return {
        compile: (tElem, tAttrs) => {
          let tooltipLinker = $compile(template);

          return function link(scope, element, attrs, tooltipCtrl) {
            let tooltip;
            let tooltipLinkedScope;
            let transitionTimeout;
            let showTimeout;
            let hideTimeout;
            let positionTimeout;
            let appendToBody = angular.isDefined(options.appendToBody) ? options.appendToBody : false;
            let triggers = getTriggers(undefined);
            let hasEnableExp = angular.isDefined(attrs[prefix + 'Enable']);
            let ttScope = scope.$new(true);
            let repositionScheduled = false;
            let isOpenParse = angular.isDefined(attrs[prefix + 'IsOpen']) ? $parse(attrs[prefix + 'IsOpen']) : false;
            let contentParse = options.useContentExp ? $parse(attrs[ttType]) : false;
            let observers = [];

            let positionTooltip = () => {
              // check if tooltip exists and is not empty
              if (!tooltip || !tooltip.html()) {
                return;
              }

              if (!positionTimeout) {
                positionTimeout = $timeout(() => {
                  // Reset the positioning.
                  tooltip.css({
                    top: 0,
                    left: 0,
                  });

                  // Now set the calculated positioning.
                  let ttPosition = $position.positionElements(element, tooltip, ttScope.placement, appendToBody);
                  tooltip.css({
                    top: ttPosition.top + 'px',
                    left: ttPosition.left + 'px',
                    visibility: 'visible',
                  });

                  // If the placement class is prefixed, still need
                  // to remove the TWBS standard class.
                  if (options.placementClassPrefix) {
                    tooltip.removeClass('top bottom left right');
                  }

                  tooltip.removeClass(
                    options.placementClassPrefix + 'top ' +
                    options.placementClassPrefix + 'top-left ' +
                    options.placementClassPrefix + 'top-right ' +
                    options.placementClassPrefix + 'bottom ' +
                    options.placementClassPrefix + 'bottom-left ' +
                    options.placementClassPrefix + 'bottom-right ' +
                    options.placementClassPrefix + 'left ' +
                    options.placementClassPrefix + 'left-top ' +
                    options.placementClassPrefix + 'left-bottom ' +
                    options.placementClassPrefix + 'right ' +
                    options.placementClassPrefix + 'right-top ' +
                    options.placementClassPrefix + 'right-bottom');

                  let placement = ttPosition.placement.split('-');
                  tooltip.addClass(placement[0] + ' ' + options.placementClassPrefix + ttPosition.placement);
                  $position.positionArrow(tooltip, ttPosition.placement);

                  positionTimeout = null;
                }, 0, false);
              }
            };

            // Set up the correct scope to allow transclusion later
            ttScope.origScope = scope;

            // By default, the tooltip is not open.
            // TODO add ability to start tooltip opened
            ttScope.isOpen = false;
            ttScope.showcaret = false;
            openedTooltips.add(ttScope, {
              close: hide,
            });

            function toggleTooltipBind() {
              if (!ttScope.isOpen) {
                showTooltipBind();
              } else {
                hideTooltipBind();
              }
            }

            // Show the tooltip with delay if specified, otherwise show it immediately
            function showTooltipBind() {
              if (hasEnableExp && !scope.$eval(attrs[prefix + 'Enable'])) {
                return;
              }

              cancelHide();
              prepareTooltip();

              if (ttScope.popupDelay) {
                // Do nothing if the tooltip was already scheduled to pop-up.
                // This happens if show is triggered multiple times before any hide is triggered.
                if (!showTimeout) {
                  showTimeout = $timeout(show, ttScope.popupDelay, false);
                }
              } else {
                show();
              }
            }

            function hideTooltipBind() {
              cancelShow();

              if (ttScope.popupCloseDelay) {
                if (!hideTimeout) {
                  hideTimeout = $timeout(hide, ttScope.popupCloseDelay, false);
                }
              } else {
                hide();
              }
            }

            // Show the tooltip popup element.
            function show() {
              cancelShow();
              cancelHide();

              // Don't show empty tooltips.
              if (!ttScope.content) {
                return angular.noop;
              }

              createTooltip();

              // And show the tooltip.
              ttScope.$evalAsync(function () {
                ttScope.isOpen = true;
                assignIsOpen(true);
                positionTooltip();
              });
            }

            function cancelShow() {
              if (showTimeout) {
                $timeout.cancel(showTimeout);
                showTimeout = null;
              }

              if (positionTimeout) {
                $timeout.cancel(positionTimeout);
                positionTimeout = null;
              }
            }

            // Hide the tooltip popup element.
            function hide() {
              if (!ttScope) {
                return;
              }

              // First things first: we don't show it anymore.
              ttScope.$evalAsync(function () {
                if (ttScope) {
                  ttScope.isOpen = false;
                  assignIsOpen(false);
                  // And now we remove it from the DOM. However, if we have animation, we
                  // need to wait for it to expire beforehand.
                  // FIXME: this is a placeholder for a port of the transitions library.
                  // The fade transition in TWBS is 150ms.
                  if (ttScope.animation) {
                    if (!transitionTimeout) {
                      transitionTimeout = $timeout(removeTooltip, 150, false);
                    }
                  } else {
                    removeTooltip();
                  }
                }
              });
            }

            function cancelHide() {
              if (hideTimeout) {
                $timeout.cancel(hideTimeout);
                hideTimeout = null;
              }

              if (transitionTimeout) {
                $timeout.cancel(transitionTimeout);
                transitionTimeout = null;
              }
            }

            function createTooltip() {
              // There can only be one tooltip element per directive shown at once.
              if (tooltip) {
                return;
              }

              tooltipLinkedScope = ttScope.$new();
              tooltip = tooltipLinker(tooltipLinkedScope, function (tooltip) {
                if (appendToBody) {
                  $document.find('body').append(tooltip);
                } else {
                  element.after(tooltip);
                }
              });

              prepObservers();
            }

            function removeTooltip() {
              cancelShow();
              cancelHide();
              unregisterObservers();

              if (tooltip) {
                tooltip.remove();
                tooltip = null;
              }
              if (tooltipLinkedScope) {
                tooltipLinkedScope.$destroy();
                tooltipLinkedScope = null;
              }
            }

            /**
             * Set the initial scope values. Once
             * the tooltip is created, the observers
             * will be added to keep things in sync.
             */
            function prepareTooltip() {
              ttScope.title = attrs[prefix + 'Title'];
              if (contentParse) {
                ttScope.content = contentParse(scope);
              } else {
                ttScope.content = attrs[ttType];
              }

              ttScope.popupClass = attrs[prefix + 'Class'];
              ttScope.placement = angular.isDefined(attrs[prefix + 'Placement']) ? attrs[prefix + 'Placement'] : options.placement;
              let delay = parseInt(attrs[prefix + 'PopupDelay'], 10);
              let closeDelay = parseInt(attrs[prefix + 'PopupCloseDelay'], 10);
              ttScope.popupDelay = !isNaN(delay) ? delay : options.popupDelay;
              ttScope.popupCloseDelay = !isNaN(closeDelay) ? closeDelay : options.popupCloseDelay;
            }

            function assignIsOpen(isOpen) {
              if (isOpenParse && angular.isFunction(isOpenParse.assign)) {
                isOpenParse.assign(scope, isOpen);
              }
            }

            ttScope.contentExp = function () {
              return ttScope.content;
            };

            /**
             * Observe the relevant attributes.
             */
            attrs.$observe('disabled', function (val) {
              if (val) {
                cancelShow();
              }

              if (val && ttScope.isOpen) {
                hide();
              }
            });

            if (isOpenParse) {
              scope.$watch(isOpenParse, function (val) {
                if (ttScope && !val === ttScope.isOpen) {
                  toggleTooltipBind();
                }
              });
            }

            function prepObservers() {
              observers.length = 0;

              if (contentParse) {
                observers.push(
                  scope.$watch(contentParse, function (val) {
                    ttScope.content = val;
                    if (!val && ttScope.isOpen) {
                      hide();
                    }
                  })
                );

                observers.push(
                  tooltipLinkedScope.$watch(function () {
                    if (!repositionScheduled) {
                      repositionScheduled = true;
                      tooltipLinkedScope.$$postDigest(function () {
                        repositionScheduled = false;
                        if (ttScope && ttScope.isOpen) {
                          positionTooltip();
                        }
                      });
                    }
                  })
                );
              } else {
                observers.push(
                  attrs.$observe(ttType, function (val) {
                    ttScope.content = val;
                    if (!val && ttScope.isOpen) {
                      hide();
                    } else {
                      positionTooltip();
                    }
                  })
                );
              }

              observers.push(
                attrs.$observe(prefix + 'Title', function (val) {
                  ttScope.title = val;
                  if (ttScope.isOpen) {
                    positionTooltip();
                  }
                })
              );

              observers.push(
                attrs.$observe(prefix + 'Placement', function (val) {
                  ttScope.placement = val ? val : options.placement;
                  if (ttScope.isOpen) {
                    positionTooltip();
                  }
                })
              );

              observers.push(
                attrs.$observe(prefix + 'Showcaret', function (val) {
                  ttScope.showcaret = (val == 'true');
                  if (ttScope.isOpen) {
                    positionTooltip();
                  }
                })
              );
            }

            function unregisterObservers() {
              if (observers.length) {
                angular.forEach(observers, function (observer) {
                  observer();
                });
                observers.length = 0;
              }
            }

            // hide tooltips/popovers for outsideClick trigger
            function bodyHideTooltipBind(e) {
              if (!ttScope || !ttScope.isOpen || !tooltip) {
                return;
              }
              // make sure the tooltip/popover link or tool tooltip/popover itself were not clicked
              if (!element[0].contains(e.target) && !tooltip[0].contains(e.target)) {
                hideTooltipBind();
              }
            }

            let unregisterTriggers = function () {
              triggers.show.forEach(function (trigger) {
                if (trigger === 'outsideClick') {
                  element[0].removeEventListener('click', toggleTooltipBind);
                } else {
                  element[0].removeEventListener(trigger, showTooltipBind);
                  element[0].removeEventListener(trigger, toggleTooltipBind);
                }
              });
              triggers.hide.forEach(function (trigger) {
                if (trigger === 'outsideClick') {
                  $document.off('click', bodyHideTooltipBind);
                } else {
                  element[0].removeEventListener(trigger, hideTooltipBind);
                }
              });
            };

            function prepTriggers() {
              let val = attrs[prefix + 'Trigger'];
              unregisterTriggers();

              triggers = getTriggers(val);

              if (triggers.show !== 'none') {
                triggers.show.forEach(function (trigger, idx) {
                  if (trigger === 'outsideClick') {
                    element[0].addEventListener('click', toggleTooltipBind);
                    $document.on('click', bodyHideTooltipBind);
                  } else if (trigger === triggers.hide[idx]) {
                    element[0].addEventListener(trigger, toggleTooltipBind);
                  } else if (trigger) {
                    element[0].addEventListener(trigger, showTooltipBind);
                    element[0].addEventListener(triggers.hide[idx], hideTooltipBind);
                  }

                  element[0].addEventListener('keypress', function (e) {
                    if (e.which === 27) {
                      hideTooltipBind();
                    }
                  });
                });
              }
            }

            prepTriggers();

            let animation = scope.$eval(attrs[prefix + 'Animation']);
            ttScope.animation = angular.isDefined(animation) ? !!animation : options.animation;

            let appendToBodyVal;
            let appendKey = prefix + 'AppendToBody';
            if (appendKey in attrs && attrs[appendKey] === undefined) {
              appendToBodyVal = true;
            } else {
              appendToBodyVal = scope.$eval(attrs[appendKey]);
            }

            appendToBody = angular.isDefined(appendToBodyVal) ? appendToBodyVal : appendToBody;

            // Make sure tooltip is destroyed and removed.
            scope.$on('$destroy', function onDestroyTooltip() {
              unregisterTriggers();
              removeTooltip();
              openedTooltips.remove(ttScope);
              ttScope = null;
            });
          };
        },
      };
    };
  }];

}

export function tooltipPopup() {
  return {
    restrict: 'EA',
    replace: true,
    scope: {
      content: '@',
      placement: '@',
      animation: '&',
      isOpen: '&',
      showcaret: '&',
      popupClass: '@',
    },
    template: `
        <span class="tooltip tip-{{placement}}"
          tooltip-classes
          ng-class="{ in: isOpen(), fade: animation() }"
          style="width: auto">
          <span class="c-nub radius" ng-bind="content"></span>
          <span class="nub" ng-if="showcaret()"></span>
        </span>
      `,
  };
}

// This is mostly ngInclude code but with a custom scope
tooltipTemplateTransclude.$inject = ['$animate', '$sce', '$compile', '$templateRequest'];
export function tooltipTemplateTransclude($animate, $sce, $compile, $templateRequest) {
  return {
    link: function (scope, elem, attrs) {
      let origScope = scope.$eval(attrs.tooltipTemplateTranscludeScope);

      let changeCounter = 0,
        currentScope,
        previousElement,
        currentElement;

      let cleanupLastIncludeContent = function () {
        if (previousElement) {
          previousElement.remove();
          previousElement = null;
        }

        if (currentScope) {
          currentScope.$destroy();
          currentScope = null;
        }

        if (currentElement) {
          $animate.leave(currentElement).then(function () {
            previousElement = null;
          });
          previousElement = currentElement;
          currentElement = null;
        }
      };

      scope.$watch($sce.parseAsResourceUrl(attrs.tooltipTemplateTransclude), function (src) {
        let thisChangeId = ++changeCounter;

        if (src) {
          //set the 2nd param to true to ignore the template request error so that the inner
          //contents and scope can be cleaned up.
          $templateRequest(src, true).then(function (response) {
            if (thisChangeId !== changeCounter) { return; }
            let newScope = origScope.$new();
            let template = response;

            let clone = $compile(template)(newScope, function (clone) {
              cleanupLastIncludeContent();
              $animate.enter(clone, elem);
            });

            currentScope = newScope;
            currentElement = clone;

            currentScope.$emit('$includeContentLoaded', src);
          }, function () {
            if (thisChangeId === changeCounter) {
              cleanupLastIncludeContent();
              scope.$emit('$includeContentError', src);
            }
          });
          scope.$emit('$includeContentRequested', src);
        } else {
          cleanupLastIncludeContent();
        }
      });

      scope.$on('$destroy', cleanupLastIncludeContent);
    },
  };
}

tooltip.$inject = ['$tooltip'];
export function tooltip($tooltip) {
  return $tooltip('tooltip', 'tooltip', 'mouseenter');
}

export function tooltipHtmlUnsafePopup() {
  return {
    restrict: 'EA',
    replace: true,
    scope: {
      content: '@',
      placement: '@',
      animation: '&',
      isOpen: '&',
      showcaret: '&',
    },
    template: `
        <span class="tooltip tip-{{placement}}"
          tooltip-classes
          ng-class="{ in: isOpen(), fade: animation() }"
          style="width: auto">
          <span class="c-nub radius" ng-bind-html="content"></span>
          <span class="nub" ng-if="showcaret()"></span>
        </span>
      `,
  };
}

tooltipHtmlUnsafe.$inject = ['$tooltip'];
export function tooltipHtmlUnsafe($tooltip) {
  return $tooltip('tooltipHtmlUnsafe', 'tooltip', 'mouseenter');
}

export function tooltipHtmlPopup() {
  return {
    replace: true,
    scope: { contentExp: '&', placement: '@', popupClass: '@', animation: '&', isOpen: '&' , showcaret: '&' },
    template: `
        <span class="tooltip tip-{{placement}}"
          tooltip-classes
          ng-class="{ in: isOpen(), fade: animation() }"
          style="width: auto">
          <span class="c-nub radius" ng-bind-html="contentExp()"></span>
          <span class="nub" ng-if="showcaret()"></span>
        </span>
      `,
  };
}
tooltipHtml.$inject = ['$tooltip'];
export function tooltipHtml($tooltip) {
  return $tooltip('tooltipHtml', 'tooltip', 'mouseenter', {
    useContentExp: true,
  });
}

export function tooltipTemplatePopup() {
  return {
    restrict: 'A',
    scope: { contentExp: '&', originScope: '&', showcaret: '&' },
    template: `
        <span class="c-nub radius" tooltip-template-transclude="contentExp()"
        tooltip-template-transclude-scope="originScope()"></span>
        <span class="nub" ng-if="showcaret()"></span>
      `,
  };
}

tooltipTemplate.$inject = ['$tooltip'];
export function tooltipTemplate($tooltip) {
  return $tooltip('tooltipTemplate', 'tooltip', 'mouseenter', {
    useContentExp: true,
  });
}

tooltipClasses.$inject = ['$position'];
export function tooltipClasses($position) {
  return {
    restrict: 'A',
    link: function (scope, element, attrs) {
      // need to set the primary position so the
      // arrow has space during position measure.
      // tooltip.positionTooltip()
      if (scope.placement) {
        // // There are no top-left etc... classes
        // // in TWBS, so we need the primary position.
        let position = $position.parsePlacement(scope.placement);
        element.addClass(position[0]);
      } else {
        element.addClass('top');
      }

      if (scope.popupClass) {
        element.addClass(scope.popupClass);
      }

      if (scope.animation()) {
        element.addClass(attrs.tooltipAnimationClass);
      }
    },
  };
}

/*
* @component tooltip
* @category communication
* @section default
* @name Tooltips
* @description A lightweight, extensible directive for fancy tooltip creation. The tooltipdirective supports multiple placements, optional transition animation, and more.
*
* @html
<div class="docs-example docs-example--spacing">
  <h3>Default Tooltip</h3>
  <br/>
  <a href="#" tooltip="I am a tooltip!">Tooltip</a>
</div>
*/

/*
* @component tooltip
* @category communication
* @section positional
*
* @ts
export class TooltipPositionalController implements ng.IComponentController {
  public placement = {
    options: [
      'top',
      'top-left',
      'top-right',
      'bottom',
      'bottom-left',
      'bottom-right',
      'left',
      'right'
    ],
    selected: 'top'
  };
}

export class TooltipPositionalComponent implements ng.IComponentOptions {
  public controller = TooltipPositionalController;
  public template = `
    <div class="form-group">
      <label>Tooltip placement</label>
      <select class="form-control" ng-model="$ctrl.placement.selected" ng-options="o as o for o in $ctrl.placement.options"></select>
    </div>
    <button tooltip-placement="{{$ctrl.placement.selected}}" tooltip="On the {{$ctrl.placement.selected}}" type="button" class="cui-button">Tooltip {{$ctrl.placement.selected}}</button>
  `;
  public transclude = true;
}
*/

/*
* @component tooltip
* @category communication
* @section dynamic
*
* @ts
export class TooltipDynamicController implements ng.IComponentController {
  public dynamicTooltip = 'Hello, World!';
  public dynamicTooltipText = 'dynamic';
  public htmlTooltip = 'I\'ve been made <b>bold</b>!';
  public unsafeHtml = '<div>Unsafe HTML</div>';
}

export class TooltipDynamicComponent implements ng.IComponentOptions {
  public controller = TooltipDynamicController;
  public template = `
    <div class="form-group">
      <label>Dynamic Tooltip Text</label>
      <input type="text" ng-model="$ctrl.dynamicTooltipText" class="form-control">
    </div>
    <div class="form-group">
      <label>Dynamic Tooltip Popup Text</label>
      <input type="text" ng-model="$ctrl.dynamicTooltip" class="form-control">
    </div>
    <p>
      Pellentesque <a href="#" tooltip="{{$ctrl.dynamicTooltip}}">{{$ctrl.dynamicTooltipText}}</a>,
      sit amet venenatis urna cursus eget nunc scelerisque viverra mauris, in
      aliquam. Tincidunt lobortis feugiat vivamus at
      <a href="#" tooltip-animation="false" tooltip="I don't fade. :-(">fading</a>
      eget arcu dictum varius duis at consectetur lorem. Vitae elementum curabitur
      <a href="#" tooltip-popup-delay='1000' tooltip='appears with delay'>show delay</a>
      nunc sed velit dignissim sodales ut eu sem integer vitae. Turpis egestas
      <a href="#" tooltip-popup-close-delay='1000' tooltip='hides with delay'>hide delay</a>
      pharetra convallis posuere morbi leo urna,
      <a href="#" tooltip-template="'myTooltipTemplate.html'">Custom template</a>
      at elementum eu, facilisis sed odio morbi quis commodo odio.
    </p>
    <p>
        I can even contain HTML. <a href="#" tooltip-html="$ctrl.htmlTooltip">Check me out!</a>
    </p>
    <p>
        I can even contain HTML (unsafe). <a href="#" tooltip-html-unsafe="{{$ctrl.unsafeHtml}}">Check me out!</a>
    </p>
    <p>
      <style>
        .customClass {
          color: #880000;
          background-color: #ffff66;
          box-shadow: 0 6px 12px rgba(0,0,0,.175);
        }
        .customClass .nub {
          display: none;
        }
      </style>
      I can have a custom class. <a href="#" tooltip="I can have a custom class applied to me!" tooltip-class="customClass">Check me out!</a>
    </p>
  `;
  public transclude = true;
}
*/
