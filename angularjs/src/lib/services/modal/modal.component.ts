/**
* @category containers
* @component modals
*/
import * as angular from 'angular';
import { KeyCodes } from '../../directives/dropdown/keyCodes';

csModalBackdrop.$inject = ['$animate', '$injector', '$modalStack'];
export function csModalBackdrop($animate, $injector, $modalStack) {
  return {
    replace: true,
    template: `
      <div
        class="md-modal-bg"
        modal-animation-class="fade"
        modal-in-class="in"
        ng-style="{'z-index': 1040 + (index && 1 || 0) + index*10}"
        ng-click="close($event)"
        style="display: block;">
      </div>
    `,
    compile: function (tElement, tAttrs) {
      tElement.addClass(tAttrs.backdropClass);
      return linkFn;
    },
  };

  function linkFn(scope, element, attrs) {
    if (attrs.modalInClass) {
      $animate.addClass(element, attrs.modalInClass);

      scope.$on($modalStack.NOW_CLOSING_EVENT, function (e, setIsAsync) {
        let done = setIsAsync();
        if (scope.modalOptions.animation) {
          $animate.removeClass(element, attrs.modalInClass).then(done);
        } else {
          done();
        }
      });
    }
  }
}

const modalTemplate = `
  <div
    class="md-modal__backdrop fade in"
    ng-style="{'z-index': 1051 + index*10}">
    <div
      role="dialog"
      class="md-modal in"
      tabindex="-1"
      ng-class="modalClass"
      id="{{modalId}}">
      <div class="md-modal__content">
        <div class="md-modal__flex-container" modal-transclude></div>
      </div>
    </div>
  </div>
`;

csModalWindow.$inject = ['$modalStack', '$q', '$animate', '$animateCss', '$document'];
export function csModalWindow($modalStack, $q, $animate, $animateCss, $document) {
  return {
    scope: {
      index: '@',
    },
    replace: true,
    transclude: true,
    template: function (tElement, tAttrs) {
      return tAttrs.template || modalTemplate;
    },
    link: function (scope, element, attrs) {
      element.addClass(attrs.windowClass || '');
      element.addClass(attrs.windowTopClass || '');
      scope.modalId = attrs.modalId;
      scope.modalClass = attrs.modalClass;

      scope.close = function (evt) {
        let modal = $modalStack.getTop();
        if (modal && modal.value.backdrop &&
          modal.value.backdrop !== 'static' &&
          evt.target === evt.currentTarget) {
          evt.preventDefault();
          evt.stopPropagation();
          $modalStack.dismiss(modal.key, 'backdrop click');
        }
      };

      // moved from template to fix issue #2280
      element.on('click', scope.close);

      // This property is only added to the scope for the purpose of detecting when this directive is rendered.
      // We can detect that by using this property in the template associated with this directive and then use
      // {@link Attribute#$observe} on it. For more details please see {@link TableColumnResize}.
      scope.$isRendered = true;

      // Deferred object that will be resolved when this modal is render.
      let modalRenderDeferObj = $q.defer();
      // Observe function will be called on next digest cycle after compilation, ensuring that the DOM is ready.
      // In order to use this way of finding whether DOM is ready, we need to observe a scope property used in modal's template.
      attrs.$observe('modalRender', function (value) {
        if (value === 'true') {
          modalRenderDeferObj.resolve();
        }
      });

      modalRenderDeferObj.promise.then(function () {
        let animationPromise = null;

        if (attrs.modalInClass) {
          animationPromise = $animateCss(element, {
            addClass: attrs.modalInClass,
          }).start();

          scope.$on($modalStack.NOW_CLOSING_EVENT, function (e, setIsAsync) {
            let done = setIsAsync();
            if ($animateCss) {
              $animateCss(element, {
                removeClass: attrs.modalInClass,
              }).start().then(done);
            } else {
              $animate.removeClass(element, attrs.modalInClass).then(done);
            }
          });
        }

        $q.when(animationPromise).then(function () {
          // Notify {@link $modalStack} that modal is rendered.
          let modal = $modalStack.getTop();
          if (modal) {
            $modalStack.modalRendered(modal.key);
          }

           // If something within the freshly-opened modal already has focus (perhaps via a
           // directive that causes focus). then no need to try and focus anything.
          if (!($document[0].activeElement && element[0].contains($document[0].activeElement))) {
            let inputWithAutofocus = element[0].querySelector('[autofocus]');
            // Auto-focusing of a freshly-opened modal element causes any child elements
            // with the autofocus attribute to lose focus. This is an issue on touch
            // based devices which will show and then hide the onscreen keyboard.
            // Attempts to refocus the autofocus element via JavaScript will not reopen
            // the onscreen keyboard. Fixed by updated the focusing logic to only autofocus
            // the modal element if the modal does not contain an autofocus element.
            if (inputWithAutofocus) {
              inputWithAutofocus.focus();
            } else {
              element[0].focus();
            }

            $('.md-modal').on('scroll touchmove', function (e) {
              let _initialScrollDiff = 80;
              let _finalScrollDiff = 10;
              let _diffScroll = _initialScrollDiff - _finalScrollDiff;
              let _scrollTop = $('.md-modal').scrollTop();
              if (_scrollTop <= (_initialScrollDiff + 4)) {
                $('.md-modal__title').css({ 'margin-top': _diffScroll - _scrollTop });
              } else {
                $('.md-modal__title').css({ 'margin-top': 4 });
              }
            });
          }
        });
      });
    },
  };
}

export function csModalAnimationClass() {
  return {
    compile: function (tElement, tAttrs) {
      if (tAttrs.modalAnimation) {
        tElement.addClass(tAttrs.modalAnimationClass);
      }
    },
  };
}

export function csModalTransclude() {
  return {
    link: function (scope, element, attrs, controller, transclude) {
      transclude(scope.$parent, function (clone) {
        element.empty();
        element.append(clone);
      });
    },
  };
}

csModalStack.$inject = ['$animate', '$animateCss', '$compile', '$document', '$rootScope', '$q', '$$multiMap', '$$stackedMap'];
export function csModalStack($animate, $animateCss, $compile, $document, $rootScope, $q, $$multiMap, $$stackedMap) {
  let OPENED_MODAL_CLASS = 'modal-open';

  let backdropDomEl, backdropScope;
  let openedWindows = $$stackedMap.createNew();
  let openedClasses = $$multiMap.createNew();
  let $modalStack = {
    NOW_CLOSING_EVENT: 'modal.stack.now-closing',
    open: open,
    close: close,
    dismiss: dismiss,
    dismissAll: dismissAll,
    getTop: getTop,
    modalRendered: modalRendered,
    focusFirstFocusableElement: focusFirstFocusableElement,
    focusLastFocusableElement: focusLastFocusableElement,
    isModalFocused: isModalFocused,
    isFocusInFirstItem: isFocusInFirstItem,
    isFocusInLastItem: isFocusInLastItem,
    clearFocusListCache: clearFocusListCache,
    loadFocusElementList: loadFocusElementList,
  };

  //Modal focus behavior
  let focusableElementList;
  let focusIndex = 0;
  let tabbableSelector = 'a[href], area[href], input:not([disabled]):visible, ' +
    'button:not([disabled]):visible, select:not([disabled]), textarea:not([disabled]), ' +
    'iframe, object, embed, *[tabindex], *[contenteditable=true]';

  function backdropIndex() {
    let topBackdropIndex = -1;
    let opened = openedWindows.keys();
    for (let i = 0; i < opened.length; i++) {
      if (openedWindows.get(opened[i]).value.backdrop) {
        topBackdropIndex = i;
      }
    }
    return topBackdropIndex;
  }

  $rootScope.$watch(backdropIndex, function (newBackdropIndex) {
    if (backdropScope) {
      backdropScope.index = newBackdropIndex;
    }
  });

  function removeModalWindow(modalInstance, elementToReceiveFocus) {
    let modalWindow = openedWindows.get(modalInstance).value;
    let appendToElement = modalWindow.appendTo;

    //clean up the stack
    openedWindows.remove(modalInstance);

    removeAfterAnimate(modalWindow.modalDomEl, modalWindow.modalScope, function () {
      let modalBodyClass = modalWindow.openedClass || OPENED_MODAL_CLASS;
      openedClasses.remove(modalBodyClass, modalInstance);
      appendToElement.toggleClass(modalBodyClass, openedClasses.hasKey(modalBodyClass));
      toggleTopWindowClass(true);
    }, modalWindow.closedDeferred);
    checkRemoveBackdrop();

    //move focus to specified element if available, or else to body
    if (elementToReceiveFocus && elementToReceiveFocus.focus) {
      elementToReceiveFocus.focus();
    } else if (appendToElement.focus) {
      appendToElement.focus();
    }
  }

  // Add or remove "windowTopClass" from the top window in the stack
  function toggleTopWindowClass(toggleSwitch) {
    let modalWindow;

    if (openedWindows.length() > 0) {
      modalWindow = openedWindows.top().value;
      modalWindow.modalDomEl.toggleClass(modalWindow.windowTopClass || '', toggleSwitch);
    }
  }

  function checkRemoveBackdrop() {
    //remove backdrop if no longer needed
    if (backdropDomEl && backdropIndex() === -1) {
      let backdropScopeRef = backdropScope;
      removeAfterAnimate(backdropDomEl, backdropScope, function () {
        backdropScopeRef = null;
      }, null);
      backdropDomEl = undefined;
      backdropScope = undefined;
    }
  }

  function removeAfterAnimate(domEl, scope, done, closedDeferred) {
    let asyncDeferred;
    let doneAnimating;
    let asyncPromise = null;
    let setIsAsync = function () {
      if (!asyncDeferred) {
        asyncDeferred = $q.defer();
        asyncPromise = asyncDeferred.promise;
      }

      return function asyncDone() {
        asyncDeferred.resolve();
      };
    };
    scope.$broadcast($modalStack.NOW_CLOSING_EVENT, setIsAsync);

    // Note that it's intentional that asyncPromise might be null.
    // That's when setIsAsync has not been called during the
    // NOW_CLOSING_EVENT broadcast.
    return $q.when(asyncPromise).then(afterAnimating);

    function afterAnimating() {
      if (doneAnimating) {
        return;
      }
      doneAnimating = true;

      $animateCss(domEl, {
        event: 'leave',
      }).start().then(function () {
        domEl.remove();
        if (closedDeferred) {
          closedDeferred.resolve();
        }
      });

      scope.$destroy();
      if (done) {
        done();
      }
    }
  }

  $document.on('keydown', keydownListener);

  $rootScope.$on('$destroy', function () {
    $document.off('keydown', keydownListener);
  });

  function keydownListener(evt) {
    if (evt.isDefaultPrevented()) {
      return evt;
    }

    let modal = openedWindows.top();
    if (modal) {
      switch (evt.which) {
        case KeyCodes.ESCAPE: {
          if (modal.value.keyboard) {
            evt.preventDefault();
            $rootScope.$apply(function () {
              $modalStack.dismiss(modal.key, 'escape key press');
            });
          }
          break;
        }
        case KeyCodes.TAB: {
          $modalStack.clearFocusListCache();
          $modalStack.loadFocusElementList();
          let focusChanged = false;
          if (evt.shiftKey) {
            if ($modalStack.isFocusInFirstItem(evt) || !$modalStack.isModalFocused(evt)) {
              focusChanged = $modalStack.focusLastFocusableElement();
            }
          } else {
            if ($modalStack.isFocusInLastItem(evt) || !$modalStack.isModalFocused(evt)) {
              focusChanged = $modalStack.focusFirstFocusableElement();
            }
          }

          if (focusChanged) {
            evt.preventDefault();
            evt.stopPropagation();
          }
          break;
        }
      }
    }
  }

  function open(modalInstance, modal) {
    let modalOpener = $document[0].activeElement,
      modalBodyClass = modal.openedClass || OPENED_MODAL_CLASS;

    toggleTopWindowClass(false);

    openedWindows.add(modalInstance, {
      deferred: modal.deferred,
      renderDeferred: modal.renderDeferred,
      closedDeferred: modal.closedDeferred,
      modalScope: modal.scope,
      backdrop: modal.backdrop,
      keyboard: modal.keyboard,
      openedClass: modal.openedClass,
      windowTopClass: modal.windowTopClass,
      animation: modal.animation,
      appendTo: modal.appendTo,
    });

    openedClasses.put(modalBodyClass, modalInstance);

    let appendToElement = modal.appendTo,
      currBackdropIndex = backdropIndex();

    if (!appendToElement.length) {
      throw new Error('appendTo element not found. Make sure that the element passed is in DOM.');
    }

    if (currBackdropIndex >= 0 && !backdropDomEl) {
      backdropScope = $rootScope.$new(true);
      backdropScope.modalOptions = modal;
      backdropScope.index = currBackdropIndex;
      backdropDomEl = angular.element('<div modal-backdrop="modal-backdrop"></div>');
      backdropDomEl.attr('backdrop-class', modal.backdropClass);
      if (modal.animation) {
        backdropDomEl.attr('modal-animation', 'true');
      }
      $compile(backdropDomEl)(backdropScope);
      $animate.enter(backdropDomEl, appendToElement);
    }

    let angularDomEl = angular.element('<div modal-window="modal-window"></div>');

    const modalType = modal.type ? `md-modal--${modal.type}` : 'md-modal--large';
    angularDomEl.attr({
      template: modal.windowTemplate,
      'window-class': modal.windowClass,
      'window-top-class': modal.windowTopClass,
      index: openedWindows.length() - 1,
      animate: 'animate',
      'modal-id': modal.modalId,
      'modal-class': `${modal.modalClass} ${modalType}`,
    }).html(modal.content);
    if (modal.animation) {
      angularDomEl.attr('modal-animation', 'true');
    }

    $animate.enter($compile(angularDomEl)(modal.scope), appendToElement)
      .then(function () {
        $animate.addClass(appendToElement, modalBodyClass);
      });

    openedWindows.top().value.modalDomEl = angularDomEl;
    openedWindows.top().value.modalOpener = modalOpener;

    $modalStack.clearFocusListCache();
  }

  function broadcastClosing(modalWindow, resultOrReason, closing) {
    return !modalWindow.value.modalScope.$broadcast('modal.closing', resultOrReason, closing).defaultPrevented;
  }

  function close(modalInstance, result) {
    let modalWindow = openedWindows.get(modalInstance);
    if (modalWindow && broadcastClosing(modalWindow, result, true)) {
      modalWindow.value.modalScope.$$uibDestructionScheduled = true;
      modalWindow.value.deferred.resolve(result);
      removeModalWindow(modalInstance, modalWindow.value.modalOpener);
      return true;
    }
    return !modalWindow;
  }

  function dismiss(modalInstance, reason) {
    let modalWindow = openedWindows.get(modalInstance);
    if (modalWindow && broadcastClosing(modalWindow, reason, false)) {
      modalWindow.value.modalScope.$$uibDestructionScheduled = true;
      modalWindow.value.deferred.reject(reason);
      removeModalWindow(modalInstance, modalWindow.value.modalOpener);
      return true;
    }
    return !modalWindow;
  }

  function dismissAll(reason) {
    let topModal = this.getTop();
    while (topModal && this.dismiss(topModal.key, reason)) {
      topModal = this.getTop();
    }
  }

  function getTop() {
    return openedWindows.top();
  }

  function modalRendered(modalInstance) {
    let modalWindow = openedWindows.get(modalInstance);
    if (modalWindow) {
      modalWindow.value.renderDeferred.resolve();
    }
  }

  function focusFirstFocusableElement() {
    if (focusableElementList.length > 0) {
      focusableElementList[0].focus();
      return true;
    }
    return false;
  }

  function focusLastFocusableElement() {
    if (focusableElementList.length > 0) {
      focusableElementList[focusableElementList.length - 1].focus();
      return true;
    }
    return false;
  }

  function isModalFocused(evt) {
    if (evt) {
      return focusableElementList.index(evt.target) > -1;
    }
    return false;
  }

  function isFocusInFirstItem(evt) {
    if (focusableElementList.length > 0) {
      return (evt.target || evt.srcElement) === focusableElementList[0];
    }
    return false;
  }

  function isFocusInLastItem(evt) {
    if (focusableElementList.length > 0) {
      return (evt.target || evt.srcElement) === focusableElementList[focusableElementList.length - 1];
    }
    return false;
  }

  function clearFocusListCache() {
    focusableElementList = [];
    focusIndex = 0;
  }

  function loadFocusElementList() {
    if (focusableElementList === undefined || !focusableElementList.length) {
      var modalWindow = $('.md-modal__content:visible').first();
      focusableElementList = modalWindow ? modalWindow.find(tabbableSelector) : [];
    }
  }

  return $modalStack;
}

export function csModal() {
  let $modalProvider = {
    options: {
      animation: true,
      backdrop: 'static', //can also be true or 'static'
      keyboard: true,
    },
    $get: ['$rootScope', '$q', '$document', '$templateRequest', '$controller', '$csResolve', '$modalStack',
      function ($rootScope, $q, $document, $templateRequest, $controller, $csResolve, $modalStack) {
        let $modal = {
          getPromiseChain: getPromiseChain,
          open: open,
        };

        function getTemplatePromise(options) {
          return options.template ? $q.when(options.template) :
            $templateRequest(angular.isFunction(options.templateUrl) ?
              options.templateUrl() : options.templateUrl);
        }

        let promiseChain = null;
        function getPromiseChain() {
          return promiseChain;
        }

        function open(modalOptions) {
          let modalResultDeferred = $q.defer();
          let modalOpenedDeferred = $q.defer();
          let modalClosedDeferred = $q.defer();
          let modalRenderDeferred = $q.defer();

          //prepare an instance of a modal to be injected into controllers and returned to a caller
          let modalInstance = {
            result: modalResultDeferred.promise,
            opened: modalOpenedDeferred.promise,
            closed: modalClosedDeferred.promise,
            rendered: modalRenderDeferred.promise,
            close: function (result) {
              return $modalStack.close(modalInstance, result);
            },
            dismiss: function (reason) {
              return $modalStack.dismiss(modalInstance, reason);
            },
          };

          //merge and clean up options
          modalOptions = angular.extend({}, $modalProvider.options, modalOptions);
          modalOptions.resolve = modalOptions.resolve || {};
          modalOptions.appendTo = modalOptions.appendTo || $document.find('body').eq(0);

          //verify options
          if (!modalOptions.template && !modalOptions.templateUrl) {
            throw new Error('One of template or templateUrl options is required.');
          }

          let templateAndResolvePromise =
            $q.all([getTemplatePromise(modalOptions), $csResolve.resolve(modalOptions.resolve, {}, null, null)]);

          function resolveWithTemplate() {
            return templateAndResolvePromise;
          }

          // Wait for the resolution of the existing promise chain.
          // Then switch to our own combined promise dependency (regardless of how the previous modal fared).
          // Then add to $modalStack and resolve opened.
          // Finally clean up the chain variable if no subsequent modal has overwritten it.
          let samePromise;
          samePromise = promiseChain = $q.all([promiseChain])
            .then(resolveWithTemplate, resolveWithTemplate)
            .then(function resolveSuccess(tplAndVars) {
              let providedScope = modalOptions.scope || $rootScope;

              let modalScope = providedScope.$new();
              modalScope.$close = modalInstance.close;
              modalScope.$dismiss = modalInstance.dismiss;

              modalScope.$on('$destroy', function () {
                if (!modalScope.$$uibDestructionScheduled) {
                  modalScope.$dismiss('$uibUnscheduledDestruction');
                }
              });

              let ctrlInstance;

              //controllers
              if (modalOptions.controller) {
                let ctrlLocals = {
                  $scope: modalScope,
                  $modalInstance: modalInstance,
                };
                angular.forEach(tplAndVars[1], function (value, key) {
                  ctrlLocals[key] = value;
                });

                ctrlInstance = $controller(modalOptions.controller, ctrlLocals);
                if (modalOptions.controllerAs) {
                  if (modalOptions.bindToController) {
                    ctrlInstance.$close = modalScope.$close;
                    ctrlInstance.$dismiss = modalScope.$dismiss;
                    angular.extend(ctrlInstance, providedScope);
                  }

                  modalScope[modalOptions.controllerAs] = ctrlInstance;
                }
              }

              $modalStack.open(modalInstance, {
                scope: modalScope,
                deferred: modalResultDeferred,
                renderDeferred: modalRenderDeferred,
                closedDeferred: modalClosedDeferred,
                content: tplAndVars[0],
                animation: modalOptions.animation,
                backdrop: modalOptions.backdrop,
                keyboard: modalOptions.keyboard,
                backdropClass: modalOptions.backdropClass,
                windowTopClass: modalOptions.windowTopClass,
                windowClass: modalOptions.windowClass,
                windowTemplate: modalOptions.windowTemplate,
                openedClass: modalOptions.openedClass,
                appendTo: modalOptions.appendTo,
                modalId: modalOptions.modalId,
                modalClass: modalOptions.modalClass,
                type: modalOptions.type,
              });
              modalOpenedDeferred.resolve(true);

            }, function resolveError(reason) {
              modalOpenedDeferred.reject(reason);
              modalResultDeferred.reject(reason);
            })['finally'](function () {
              if (promiseChain === samePromise) {
                promiseChain = null;
              }
            });

          return modalInstance;
        }

        return $modal;
      },
    ],
  };

  return $modalProvider;
}


/**
* @name Modal
* @description <p><code>$modal</code> is a service to quickly create AngularJS-powered modal windows.Creating custom modals is straightforward: create a partial view, its controller and reference them when using the service.</p><p>The <code>$modal</code> service has only one method: <code>open(options)</code> where available options are like follows:</p><ul><li><code>templateUrl</code> - a path to a template representing modal&apos;s content</li><li><code>template</code> - inline template representing the modal&apos;s content</li><li><code>scope</code> - a scope instance to be used for the modal&apos;s content (actually the <code>$modal</code> service is going to create a child scope of a provided scope). Defaults to <code>$rootScope</code></li><li><code>controller</code> - a controller for a modal instance - it can initialize scope used by modal. Accepts the "controller-as" syntax, and can be injected with <code>$modalInstance</code></li><li><code>resolve</code> - members that will be resolved and passed to the controller as locals;it is equivalent of the <code>resolve</code> property for AngularJS routes</li><li><code>backdrop</code> - controls presence of a backdrop. Allowed values: true (default), false (no backdrop), <code>&apos;static&apos;</code> - backdrop is present but modal window is not closed when clicking outside of the modal window.</li><li><code>keyboard</code> - indicates whether the dialog should be closable by hitting the ESC key, defaults to true</li><li><code>modalId</code> - ID to be added to a modal window template</li><li><code>modalClass</code> - additional CSS class(es) to be added to a modal window template</li><li><code>windowTemplateUrl</code> - a path to a template overriding modal&apos;s window template</li><li><code>type</code> - optional type of modal . Allowed values: <code>&apos;md-modal--large&apos;</code> (large) or <code>&apos;small&apos;</code> (smaller) or <code>&apos;dialog&apos;</code> (dialog modal).</li></ul><p>The <code>open</code> method returns a modal instance, an object with the following properties:</p><ul><li><code>close(result)</code> - a method that can be used to close a modal, passing a result</li><li><code>dismiss(reason)</code> - a method that can be used to dismiss a modal, passing a reason</li><li><code>result</code> - a promise that is resolved when a modal is closed and rejected when a modal is dismissed</li><li><code>opened</code> - a promise that is resolved when a modal gets opened after downloading content&apos;s template and resolving all variables</li></ul><p>In addition the scope associated with modal&apos;s content is augmented with 2 methods:</p><ul><li><code>$close(result)</code></li><li><code>$dismiss(reason)</code></li></ul><p>Those methods make it easy to close a modal window without a need to create a dedicated controller</p>
* @category container
* @component modal
* @section default
*/
