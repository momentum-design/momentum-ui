import * as angular from 'angular';
import * as _ from 'lodash';

const popupTemplate = `
  <ul
    md-dropdown-menu
    class="dropdown-menu md-list"
    ng-show="isOpen() && !moveInProgress"
    ng-style="{top: position().top+'px', left: position().left+'px'}"
    style="display: block;"
    role="listbox"
    aria-hidden="{{ !isOpen() }}"
  >
    <li
      ng-repeat="match in matches track by $index"
      class="md-list-item"
      ng-class="{active: isActive($index)}"
      ng-mouseenter="selectActive($index)"
      ng-click="selectMatch($index, $event)"
      ng-keydown="arrowKeys($index, $event)"
      role="option"
      id="{{ match.id }}"
    >
      <div typeahead-match index="$index" match="match" query="query" template-url="templateUrl"></div>
    </li>
  </ul>
`;
const matchTemplate = `<a tabindex="-1" bind-html-unsafe="match.label | typeaheadHighlight:query"></a>`;

/**
 * A helper service that can parse typeahead's syntax (string provided by users)
 * Extracted to a separate service for ease of unit testing
 */
typeaheadParser.$inject = ['$parse'];
export function typeaheadParser($parse) {

  let TYPEAHEAD_REGEXP = /^\s*([\s\S]+?)(?:\s+as\s+([\s\S]+?))?\s+for\s+(?:([\$\w][\$\w\d]*))\s+in\s+([\s\S]+?)$/;
  return {
    parse: function (input) {
      let match = input.match(TYPEAHEAD_REGEXP);
      if (!match) {
        throw new Error(
          'Expected typeahead specification in form of "_modelValue_ (as _label_)? for _item_ in _collection_"' +
          ' but got "' + input + '".');
      }

      return {
        itemName: match[3],
        source: $parse(match[4]),
        viewMapper: $parse(match[2] || match[1]),
        modelMapper: $parse(match[1]),
      };
    },
  };
}

MdTypeaheadController.$inject = ['$scope', '$element', '$attrs', '$compile', '$parse', '$q', '$timeout', '$document', '$window', '$rootScope', '$$debounce', '$position', 'typeaheadParser'];
export function MdTypeaheadController(originalScope, element, attrs, $compile, $parse, $q, $timeout, $document, $window, $rootScope, $$debounce, $position, typeaheadParser) {
  let HOT_KEYS = [9, 13, 27, 38, 40];
  let eventDebounceTime = 200;
  let modelCtrl, ngModelOptions;
  //SUPPORTED ATTRIBUTES (OPTIONS)

  //minimal no of characters that needs to be entered before typeahead kicks-in
  let minLength = originalScope.$eval(attrs.typeaheadMinLength);
  if (!minLength && minLength !== 0) {
    minLength = 1;
  }

  originalScope.$watch(attrs.typeaheadMinLength, function (newVal) {
    minLength = !newVal && newVal !== 0 ? 1 : newVal;
  });

  //minimal wait time after last character typed before typeahead kicks-in
  let waitTime = originalScope.$eval(attrs.typeaheadWaitMs) || 0;

  //should it restrict model values to the ones selected from the popup only?
  let isEditable = originalScope.$eval(attrs.typeaheadEditable) !== false;
  originalScope.$watch(attrs.typeaheadEditable, function (newVal) {
    isEditable = newVal !== false;
  });

  //binding to a variable that indicates if matches are being retrieved asynchronously
  let isLoadingSetter = $parse(attrs.typeaheadLoading).assign || angular.noop;

  //a function to determine if an event should cause selection
  let isSelectEvent = attrs.typeaheadShouldSelect ? $parse(attrs.typeaheadShouldSelect) : function (scope, vals) {
    let evt = vals.$event;
    return evt.which === 13 || evt.which === 9 || evt.which === 1;
  };

  //a callback executed when match won't be selected while using the attribute typeahead-should-select
  let dontSelectCallback = $parse(attrs.typeaheadDontSelect) || _.noop;

  //a callback executed after a match is selected
  let onSelectCallback = $parse(attrs.typeaheadOnSelect);

  //should it select highlighted popup value when losing focus?
  let isSelectOnBlur = angular.isDefined(attrs.typeaheadSelectOnBlur) ? originalScope.$eval(attrs.typeaheadSelectOnBlur) : false;

  //binding to a variable that indicates if there were no results after the query is completed
  let isNoResultsSetter = $parse(attrs.typeaheadNoResults).assign || angular.noop;

  let inputFormatter = attrs.typeaheadInputFormatter ? $parse(attrs.typeaheadInputFormatter) : undefined;

  let appendToBody = attrs.typeaheadAppendToBody ? originalScope.$eval(attrs.typeaheadAppendToBody) : false;

  let appendTo = attrs.typeaheadAppendTo ?
    originalScope.$eval(attrs.typeaheadAppendTo) : null;

  let focusFirst = originalScope.$eval(attrs.typeaheadFocusFirst) !== false;

  //If input matches an item of the list exactly, select it automatically
  let selectOnExact = attrs.typeaheadSelectOnExact ? originalScope.$eval(attrs.typeaheadSelectOnExact) : false;

  //binding to a variable that indicates if dropdown is open
  let isOpenSetter = $parse(attrs.typeaheadIsOpen).assign || angular.noop;

  let showHint = originalScope.$eval(attrs.typeaheadShowHint) || false;

  //INTERNAL VARIABLES

  //model setter executed upon match selection
  let parsedModel = $parse(attrs.ngModel);
  let invokeModelSetter = $parse(attrs.ngModel + '($$$p)');
  let $setModelValue = function (scope, newValue) {
    if (angular.isFunction(parsedModel(originalScope)) &&
      ngModelOptions && ngModelOptions.$options && ngModelOptions.$options.getterSetter) {
      return invokeModelSetter(scope, { $$$p: newValue });
    }

    return parsedModel.assign(scope, newValue);
  };

  //expressions used by typeahead
  let parserResult = typeaheadParser.parse(attrs.typeahead);

  let hasFocus;

  //Used to avoid bug in iOS webview where iOS keyboard does not fire
  //mousedown & mouseup events
  //Issue #3699
  let selected;

  //create a child scope for the typeahead directive so we are not polluting original scope
  //with typeahead-specific data (matches, query etc.)
  let scope = originalScope.$new();
  let offDestroy = originalScope.$on('$destroy', function () {
    scope.$destroy();
  });
  scope.$on('$destroy', offDestroy);

  // WAI-ARIA
  let popupId = 'typeahead-' + scope.$id + '-' + Math.floor(Math.random() * 10000);
  element.attr({
    'aria-autocomplete': 'list',
    'aria-expanded': false,
    'aria-owns': popupId,
    autocomplete: 'off',
  });

  let inputsContainer, hintInputElem;
  //add read-only input to show hint
  if (showHint) {
    inputsContainer = angular.element('<div></div>');
    inputsContainer.foobar('position', 'relative');
    element.after(inputsContainer);
    hintInputElem = element.clone();
    hintInputElem.attr('placeholder', '');
    hintInputElem.attr('tabindex', '-1');
    hintInputElem.val('');
    hintInputElem.foobar({
      position: 'absolute',
      top: '0px',
      left: '0px',
      'border-color': 'transparent',
      'box-shadow': 'none',
      opacity: 1,
      background: 'none 0% 0% / auto repeat scroll padding-box border-box rgb(255, 255, 255)',
      color: '#999',
    });
    element.foobar({
      position: 'relative',
      'vertical-align': 'top',
      'background-color': 'transparent',
    });

    if (hintInputElem.attr('id')) {
      hintInputElem.removeAttr('id'); // remove duplicate id if present.
    }
    inputsContainer.append(hintInputElem);
    hintInputElem.after(element);
  }

  //pop-up element used to display matches
  let popUpEl = angular.element('<div typeahead-popup></div>');
  popUpEl.attr({
    id: popupId,
    matches: 'matches',
    active: 'activeIdx',
    select: 'select(activeIdx, evt)',
    'move-in-progress': 'moveInProgress',
    query: 'query',
    position: 'position',
    'assign-is-open': 'assignIsOpen(isOpen)',
    debounce: 'debounceUpdate',
    'dont-select': 'dontSelect(activeIdx, evt)',
    'is-select-event': 'isSelectEvent(evt)',
     element: 'element',
  });
  //custom item template
  if (angular.isDefined(attrs.typeaheadTemplateUrl)) {
    popUpEl.attr('template-url', attrs.typeaheadTemplateUrl);
  }

  let resetHint = function () {
    if (showHint) {
      hintInputElem.val('');
    }
  };

  let resetMatches = function () {
    scope.matches = [];
    scope.activeIdx = -1;
    element.attr('aria-expanded', false);
    resetHint();
  };

  let getMatchId = function (index) {
    return popupId + '-option-' + index;
  };

  // Indicate that the specified match is the active (pre-selected) item in the list owned by this typeahead.
  // This attribute is added or removed automatically when the `activeIdx` changes.
  scope.$watch('activeIdx', function (index) {
    if (index < 0) {
      element.removeAttr('aria-activedescendant');
    } else {
      element.attr('aria-activedescendant', getMatchId(index));
    }
  });

  function inputIsExactMatch(inputValue, index) {
    if (scope.matches.length > index && inputValue) {
      return inputValue.toUpperCase() === scope.matches[index].label.toUpperCase();
    }

    return false;
  }

  function getMatchesAsync(inputValue, evt?) {
    let locals = { $viewValue: inputValue };
    isLoadingSetter(originalScope, true);
    isNoResultsSetter(originalScope, false);
    $q.when(parserResult.source(originalScope, locals)).then(function (matches) {
      //it might happen that several async queries were in progress if a user were typing fast
      //but we are interested only in responses that correspond to the current view value
      let onCurrentRequest = inputValue === modelCtrl.$viewValue;
      if (onCurrentRequest && hasFocus) {
        if (matches && matches.length > 0) {
          scope.activeIdx = focusFirst ? 0 : -1;
          isNoResultsSetter(originalScope, false);
          scope.matches.length = 0;

          //transform labels
          for (let i = 0; i < matches.length; i++) {
            locals[parserResult.itemName] = matches[i];
            scope.matches.push({
              id: getMatchId(i),
              label: parserResult.viewMapper(scope, locals),
              model: matches[i],
            });
          }

          scope.query = inputValue;
          //position pop-up with matches - we need to re-calculate its position each time we are opening a window
          //with matches as a pop-up might be absolute-positioned and position of an input might have changed on a page
          //due to other elements being rendered
          recalculatePosition();

          element.attr('aria-expanded', true);

          //Select the single remaining option if user input matches
          if (selectOnExact && scope.matches.length === 1 && inputIsExactMatch(inputValue, 0)) {
            if (angular.isNumber(scope.debounceUpdate) || angular.isObject(scope.debounceUpdate)) {
              $$debounce(function () {
                scope.select(0, evt);
              }, angular.isNumber(scope.debounceUpdate) ? scope.debounceUpdate : scope.debounceUpdate['default']);
            } else {
              scope.select(0, evt);
            }
          }

          if (showHint) {
            let firstLabel = scope.matches[0].label;
            if (angular.isString(inputValue) &&
              inputValue.length > 0 &&
              firstLabel.slice(0, inputValue.length).toUpperCase() === inputValue.toUpperCase()) {
              hintInputElem.val(inputValue + firstLabel.slice(inputValue.length));
            } else {
              hintInputElem.val('');
            }
          }
        } else {
          resetMatches();
          isNoResultsSetter(originalScope, true);
        }
      }
      if (onCurrentRequest) {
        isLoadingSetter(originalScope, false);
      }
    }, function () {
      resetMatches();
      isLoadingSetter(originalScope, false);
      isNoResultsSetter(originalScope, true);
    });
  }

  // bind events only if appendToBody params exist - performance feature
  if (appendToBody) {
    angular.element($window).on('resize', fireRecalculating);
    $document.find('body').on('scroll', fireRecalculating);
  }

  // Declare the debounced function outside recalculating for
  // proper debouncing
  let debouncedRecalculate = $$debounce(function () {
    // if popup is visible
    if (scope.matches.length) {
      recalculatePosition();
    }

    scope.moveInProgress = false;
  }, eventDebounceTime);

  // Default progress type
  scope.moveInProgress = false;

  function fireRecalculating() {
    if (!scope.moveInProgress) {
      scope.moveInProgress = true;
      scope.$digest();
    }

    debouncedRecalculate();
  }

  // recalculate actual position and set new values to scope
  // after digest loop is popup in right position
  function recalculatePosition() {
    scope.position = appendToBody ? $position.offset(element) : $position.position(element);
    scope.position.top += element.prop('offsetHeight');
  }

  //we need to propagate user's query so we can higlight matches
  scope.query = undefined;

  //Declare the timeout promise var outside the function scope so that stacked calls can be cancelled later
  let timeoutPromise;

  let scheduleSearchWithTimeout = function (inputValue) {
    timeoutPromise = $timeout(function () {
      getMatchesAsync(inputValue);
    }, waitTime);
  };

  let cancelPreviousTimeout = function () {
    if (timeoutPromise) {
      $timeout.cancel(timeoutPromise);
    }
  };

  resetMatches();

  scope.assignIsOpen = function (isOpen) {
    isOpenSetter(originalScope, isOpen);
  };

  scope.isSelectEvent = function (evt) {
    return isSelectEvent(originalScope, { $event: evt });
  };

  scope.element = element;

  scope.dontSelect = function (activeIdx, evt) {
    let locals = {};
    let model, item;

    locals[parserResult.itemName] = item = scope.matches[activeIdx].model;
    model = parserResult.modelMapper(originalScope, locals);

    dontSelectCallback(originalScope, {
      $item: item,
      $model: model,
      $label: parserResult.viewMapper(originalScope, locals),
      $event: evt,
    });

  };

  scope.select = function (activeIdx, evt) {
    //called from within the $digest() cycle
    let locals = {};
    let model, item;

    selected = true;
    locals[parserResult.itemName] = item = scope.matches[activeIdx].model;
    model = parserResult.modelMapper(originalScope, locals);
    $setModelValue(originalScope, model);
    modelCtrl.$setValidity('editable', true);
    modelCtrl.$setValidity('parse', true);

    onSelectCallback(originalScope, {
      $item: item,
      $model: model,
      $label: parserResult.viewMapper(originalScope, locals),
      $event: evt,
    });

    resetMatches();

    //return focus to the input element if a match was selected via a mouse click event
    // use timeout to avoid $rootScope:inprog error
    if (scope.$eval(attrs.typeaheadFocusOnSelect) !== false) {
      $timeout(function () { element[0].focus(); }, 0, false);
    }
  };

  //bind keyboard events: arrows up(38) / down(40), enter(13) and tab(9), esc(27)
  element.on('keydown', function (evt) {
    //typeahead is open and an "interesting" key was pressed
    if (scope.matches.length === 0 || HOT_KEYS.indexOf(evt.which) === -1) {
      return;
    }

    let shouldSelect = isSelectEvent(originalScope, { $event: evt });

    /**
     * if there's nothing selected (i.e. focusFirst) and enter or tab is hit
     * or
     * shift + tab is pressed to bring focus to the previous element
     * then clear the results
     */
    if (scope.activeIdx === -1 && shouldSelect || evt.which === 9 && !!evt.shiftKey) {
      resetMatches();
      scope.$digest();
      return;
    }

    evt.preventDefault();
    let target;
    switch (evt.which) {
      case 27: // escape
        evt.stopPropagation();

        resetMatches();
        originalScope.$digest();
        break;
      case 38: // up arrow
        scope.activeIdx = (scope.activeIdx > 0 ? scope.activeIdx : scope.matches.length) - 1;
        scope.$digest();
        target = popUpEl[0].querySelectorAll('.typeahead-match')[scope.activeIdx];
        if (target) {
          target.parentNode.scrollTop = target.offsetTop;
        }
        break;
      case 40: // down arrow
        scope.activeIdx = (scope.activeIdx + 1) % scope.matches.length;
        scope.$digest();
        target = popUpEl[0].querySelectorAll('.typeahead-match')[scope.activeIdx];
        if (target) {
          target.parentNode.scrollTop = target.offsetTop;
        }
        break;
      default:
        if (shouldSelect) {
          scope.$apply(function () {
            if (angular.isNumber(scope.debounceUpdate) || angular.isObject(scope.debounceUpdate)) {
              $$debounce(function () {
                scope.select(scope.activeIdx, evt);
              }, angular.isNumber(scope.debounceUpdate) ? scope.debounceUpdate : scope.debounceUpdate['default']);
            } else {
              scope.select(scope.activeIdx, evt);
            }
          });
        } else {
          scope.dontSelect(scope.activeIdx, evt);
        }
    }
  });

  element.bind('focus', function (evt) {
    hasFocus = true;
    if (minLength === 0 && !modelCtrl.$viewValue) {
      $timeout(function () {
        getMatchesAsync(modelCtrl.$viewValue, evt);
      }, 0);
    }
  });

  element.bind('blur', function (evt) {
    if (isSelectOnBlur && scope.matches.length && scope.activeIdx !== -1 && !selected) {
      selected = true;
      scope.$apply(function () {
        if (angular.isObject(scope.debounceUpdate) && angular.isNumber(scope.debounceUpdate.blur)) {
          $$debounce(function () {
            scope.select(scope.activeIdx, evt);
          }, scope.debounceUpdate.blur);
        } else {
          scope.select(scope.activeIdx, evt);
        }
      });
    }
    if (!isEditable && modelCtrl.$error.editable) {
      modelCtrl.$setViewValue();
      scope.$apply(function () {
        // Reset validity as we are clearing
        modelCtrl.$setValidity('editable', true);
        modelCtrl.$setValidity('parse', true);
      });
      element.val('');
    }
    hasFocus = false;
    selected = false;
  });

  // Keep reference to click handler to unbind it.
  let dismissClickHandler = function (evt) {
    // Issue #3973
    // Firefox treats right click as a click on document
    if (element[0] !== evt.target && evt.which !== 3 && scope.matches.length !== 0) {
      resetMatches();
      if (!$rootScope.$$phase) {
        originalScope.$digest();
      }
    }
  };

  $document.on('click', dismissClickHandler);

  let $popup = $compile(popUpEl)(scope);

  originalScope.$on('$destroy', function () {
    $document.off('click', dismissClickHandler);
    if (appendToBody || appendTo) {
      $popup.remove();
    }

    if (appendToBody) {
      angular.element($window).off('resize', fireRecalculating);
      $document.find('body').off('scroll', fireRecalculating);
    }
    // Prevent jQuery cache memory leak
    popUpEl.remove();

    if (showHint) {
      inputsContainer.remove();
    }
  });

  if (appendToBody) {
    $document.find('body').append($popup);
  } else if (appendTo) {
    angular.element(appendTo).eq(0).append($popup);
  } else {
    element.after($popup);
  }

  this.init = function (_modelCtrl, _ngModelOptions) {
    modelCtrl = _modelCtrl;
    ngModelOptions = _ngModelOptions;

    scope.debounceUpdate = modelCtrl.$options && $parse(modelCtrl.$options.debounce)(originalScope);

    //plug into $parsers pipeline to open a typeahead on view changes initiated from DOM
    //$parsers kick-in on all the changes coming from the view as well as manually triggered by $setViewValue
    modelCtrl.$parsers.unshift(function (inputValue) {
      hasFocus = true;

      if (minLength === 0 || inputValue && inputValue.length >= minLength) {
        if (waitTime > 0) {
          cancelPreviousTimeout();
          scheduleSearchWithTimeout(inputValue);
        } else {
          getMatchesAsync(inputValue);
        }
      } else {
        isLoadingSetter(originalScope, false);
        cancelPreviousTimeout();
        resetMatches();
      }

      if (isEditable) {
        return inputValue;
      }

      if (!inputValue) {
        // Reset in case user had typed something previously.
        modelCtrl.$setValidity('editable', true);
        return null;
      }

      modelCtrl.$setValidity('editable', false);
      return undefined;
    });

    modelCtrl.$formatters.push(function (modelValue) {
      let candidateViewValue, emptyViewValue;
      let locals: any = {};

      // The validity may be set to false via $parsers (see above) if
      // the model is restricted to selected values. If the model
      // is set manually it is considered to be valid.
      if (!isEditable) {
        modelCtrl.$setValidity('editable', true);
      }

      if (inputFormatter) {
        locals.$model = modelValue;
        return inputFormatter(originalScope, locals);
      }

      //it might happen that we don't have enough info to properly render input value
      //we need to check for this situation and simply return model value if we can't apply custom formatting
      locals[parserResult.itemName] = modelValue;
      candidateViewValue = parserResult.viewMapper(originalScope, locals);
      locals[parserResult.itemName] = undefined;
      emptyViewValue = parserResult.viewMapper(originalScope, locals);

      return candidateViewValue !== emptyViewValue ? candidateViewValue : modelValue;
    });
  };
}

export function typeahead() {
  return {
    restrict: 'A',
    controller: 'MdTypeaheadController',
    require: ['ngModel', '^?ngModelOptions', 'typeahead'],
    link: function (originalScope, element, attrs, ctrls) {
      ctrls[2].init(ctrls[0], ctrls[1]);
    },
  };
}

typeaheadPopup.$inject = ['$$debounce'];
export function typeaheadPopup($$debounce) {
  return {
    scope: {
      matches: '=',
      query: '=',
      active: '=',
      position: '&',
      moveInProgress: '=',
      select: '&',
      assignIsOpen: '&',
      debounce: '&',
      dontSelect: '&',
      isSelectEvent: '&',
      arrowKeys: '&',
      element: '=',
    },
    replace: true,
    template: function () {
      return popupTemplate;
    },
    link: function (scope, element, attrs) {
      scope.templateUrl = attrs.templateUrl;

      scope.isOpen = function () {
        let isDropdownOpen = scope.matches.length > 0;
        scope.assignIsOpen({ isOpen: isDropdownOpen });
        return isDropdownOpen;
      };

      scope.isActive = function (matchIdx) {
        return scope.active === matchIdx;
      };

      scope.selectActive = function (matchIdx) {
        scope.active = matchIdx;
      };

      scope.selectMatch = function (activeIdx, evt) {
        let shouldSelect = scope.isSelectEvent({ evt: evt });
        if (shouldSelect) {
          let debounce = scope.debounce();
          if (angular.isNumber(debounce) || angular.isObject(debounce)) {
            $$debounce(function () {
              scope.select({ activeIdx: activeIdx, evt: evt });
            }, angular.isNumber(debounce) ? debounce : debounce['default']);
          } else {
            scope.select({ activeIdx: activeIdx, evt: evt });
          }
        } else {
          scope.dontSelect({ activeIdx: activeIdx, evt: evt });
        }
      };

      scope.arrowKeys = function (activeIdx, evt) {
        switch (evt.which) {
          case 38: // up arrow
            scope.active = (scope.active > 0 ? scope.active : scope.matches.length) - 1;
            scope.element.focus();
            break;
          case 40: // down arrow
            scope.active = (scope.active + 1) % scope.matches.length;
            scope.element.focus();
            break;
        }
      };
    },
  };
}

typeaheadMatch.$inject = ['$templateRequest', '$compile', '$parse'];
export function typeaheadMatch($templateRequest, $compile, $parse) {
  return {
    scope: {
      index: '=',
      match: '=',
      query: '=',
    },
    link: function (scope, element, attrs) {
      let tplUrl = $parse(attrs.templateUrl)(scope.$parent);
      if (tplUrl) {
        $templateRequest(tplUrl).then(function (tplContent) {
          let tplEl = angular.element(tplContent.trim());
          element.replaceWith(tplEl);
          $compile(tplEl)(scope);
        });
      } else {
        let tplEl = angular.element(matchTemplate.trim());
        element.replaceWith(tplEl);
        $compile(tplEl)(scope);
      }

    },
  };
}

typeaheadHighlight.$inject = ['$sce', '$injector', '$log'];
export function typeaheadHighlight($sce, $injector, $log) {
  let isSanitizePresent;
  isSanitizePresent = $injector.has('$sanitize');

  function escapeRegexp(queryToEscape) {
    // Regex: capture the whole query string and replace it with the string that will be used to match
    // the results, for example if the capture is "a" the result will be \a
    return queryToEscape.replace(/([.?*+^$[\]\\(){}|-])/g, '\\$1');
  }

  function containsHtml(matchItem) {
    return /<.*>/g.test(matchItem);
  }

  return function (matchItem, query) {
    if (!isSanitizePresent && containsHtml(matchItem)) {
      $log.warn('Unsafe use of typeahead please use ngSanitize'); // Warn the user about the danger
    }
    matchItem = query ? ('' + matchItem).replace(new RegExp(escapeRegexp(query), 'gi'), '<strong>$&</strong>') : matchItem; // Replaces the capture string with a the same string inside of a "strong" tag
    if (!isSanitizePresent) {
      matchItem = $sce.trustAsHtml(matchItem); // If $sanitize is not present we pack the string in a $sce object for the ng-bind-html directive
    }
    return matchItem;
  };
}
