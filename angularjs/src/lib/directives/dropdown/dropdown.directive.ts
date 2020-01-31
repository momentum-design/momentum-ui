import * as angular from 'angular';
import * as _ from 'lodash';
import { KeyCodes } from './keyCodes';
mdDropdownService.$inject = ['$document', '$rootScope'];
export function mdDropdownService($document, $rootScope) {
  let openScope = null;
  let lastOpenScope = null;
  let _event = null;

  const closeDropdown = (evt, options?) => {
    // This method may still be called during the same mouse event that
    // unbound this event handler. So check openScope before proceeding.
    if (!openScope) {
      return;
    }
    let dropdownElement = openScope.getDropdownElement();
    if(options && dropdownElement[0].contains(evt.target) && options.multi) {
      return;
    }

    if (evt && openScope.getAutoClose() === 'disabled') {
      return;
    }

    if (evt && evt.which === 3) {
      return;
    }

    let toggleElement = openScope.getToggleElement();
    if (evt && toggleElement && toggleElement[0].contains(evt.target)) {
      return;
    }

    if (evt && openScope.getAutoClose() === 'outsideClick' &&
    dropdownElement && dropdownElement[0].contains(evt.target)) {
      return;
    }

    openScope.isOpen = false;
    if (!$rootScope.$$phase) {
      openScope.$apply();
    }
  };

  let keybindFilter = function (evt) {
    const elems = openScope.getElems();
    const activeElem = evt.currentTarget.activeElement;
    const activeIndex = elems.indexOf(activeElem);
    const toggleElement = openScope.getNewToggleElement();
    // resets the selected option on nested dropdowns when mouse interaction gets keyboard navigation out of sync
    if (activeIndex >= 0 && activeIndex !== openScope.selectedOption) {
      openScope.selectedOption = activeIndex;
      openScope.selectedNestedOption = null;
    }

    if (evt.which === KeyCodes.ESCAPE) {
      openScope.focusToggleElement();
      openScope.selectedOption = null; // set to maintain arrow key integration
      openScope.selectedNestedOption = null;
      closeDropdown(evt);
    } else if (evt.which === KeyCodes.TAB && openScope.isOpen) {
      // Tab is modified to mimic the arrow keys inside the menu in order to prevent breaking the arrow-key integration
      // when switching between using tab and using up/down keys
      if (evt.shiftKey && openScope.selectedOption > 0) {
        evt.preventDefault();
        evt.stopPropagation();
        openScope.focusDropdownEntry(KeyCodes.UP, activeElem, elems);
      } else if (evt.shiftKey && _.isNull(openScope.selectedOption)) { // close menu on tab out of the select
        closeDropdown(evt);
      } else if (evt.shiftKey) { // when tabbing back to 'start' return selectedOption to null for arrow-key integration
        openScope.selectedOption = null;
        openScope.selectedNestedOption = null;
      } else if (!evt.shiftKey && openScope.selectedOption < (elems.length - 1)) {
        evt.preventDefault();
        evt.stopPropagation();

        const nestedElems = openScope.getElems(activeElem);
        if (nestedElems.length > 0 && openScope.checkVisible(nestedElems[0])) { // if there is a visible, nested menu then tab there first
          openScope.focusDropdownEntry(KeyCodes.RIGHT, activeElem, elems);
        } else {
          closeDropdown(evt);
          // openScope.focusDropdownEntry(KeyCodes.DOWN, activeElem, elems);
        }
      } else { // close menu on tab out
        openScope.selectedOption = null;
        openScope.selectedNestedOption = null;
        closeDropdown(evt);
      }
    } else if ((KeyCodes.UP === evt.which || KeyCodes.DOWN === evt.which || KeyCodes.RIGHT === evt.which || KeyCodes.LEFT === evt.which) && openScope.isOpen) {
      evt.preventDefault();
      evt.stopPropagation();
      openScope.focusDropdownEntry(evt.which, activeElem, elems);
    } else if (KeyCodes.SPACE === evt.which && openScope.isOpen) {
      if(!openScope.getTypeable() && !activeElem.querySelectorAll('.md-select__filter--input')) {
        evt.preventDefault();
        evt.stopPropagation();
        activeElem.click();
      }
      // openScope.selectedOption = activeIndex;
    } else if (KeyCodes.ENTER === evt.which && openScope.isOpen) {
      if((toggleElement && toggleElement[0]) !== activeElem) {
        activeElem.click();
      } else if (openScope.getTypeable()) {
        evt.preventDefault();
        closeDropdown(evt);
      }
    }
  };

  this.open = (dropdownScope, isMulti = false) => {
    if (!openScope) {
      if (!isMulti) {
        $document.on('click.test', closeDropdown);
      } else if (isMulti) {
        $document.on('click.test', e => {
          _event = e;
          return closeDropdown(e, {multi: true});
        });
      }
      $document.on('keydown.test', keybindFilter);
    }

    if (openScope && openScope !== dropdownScope) {
      // this.close(lastOpenScope);
      openScope.isOpen = false;
      openScope = null;
      this.open(dropdownScope, isMulti);
    //   lastOpenScope = openScope;
    //   $document.off('click', closeDropdown);
    //   $document.off('keydown', keybindFilter);
    }

    openScope = dropdownScope;
  };

  this.close = function (dropdownScope) {
    if (openScope === dropdownScope || lastOpenScope === dropdownScope) {
      lastOpenScope = openScope;
      openScope = null;
      $document.off('click.test', closeDropdown);
      $document.off('keydown.test', keybindFilter);
    }
  };
}

MdDropdownController.$inject = ['$scope', '$element', '$attrs', '$parse', 'mdDropdownConfig', 'mdDropdownService', '$animate', '$position', '$document', '$compile', '$templateRequest', '$timeout'];
export function MdDropdownController($scope, $element, $attrs, $parse, dropdownConfig, mdDropdownService, $animate, $position, $document, $compile, $templateRequest, $timeout) {
  let self = this,
    scope = $scope.$new(), // create a child scope so we are not polluting original one
    templateScope,
    appendToOpenClass = dropdownConfig.appendToOpenClass,
    openClass = dropdownConfig.openClass,
    getIsOpen,
    setIsOpen = angular.noop,
    toggleInvoker = $attrs.onToggle ? $parse($attrs.onToggle) : angular.noop,
    appendToBody = false,
    appendTo = null,
    body = $document.find('body');

  $element.addClass('dropdown');

  let _filterMenuItems = (lists, character) => {
    let escapedCharacter = character.replace(/[\-\[\]{}()*+?.,\\\^$|#\s]/g, '\\$&'),
      regex = new RegExp('^' + escapedCharacter, 'i');

    return lists
      .filter(function (list) {
        let title = list.querySelector('a');
        title = title || list;

        return regex.test(
          title.text || title.innerText
        );
      });
  };

  let _addFocus = (elems, index) => {
    for (let i = 0; i < elems.length; i++) {
      elems[i].classList.remove('hover');
      elems[i].parentNode.classList.remove('hover');
    }
    if (index !== false) {
      elems[this.selectedOption].classList.add('hover');
      elems[this.selectedOption].parentNode.classList.add('hover');
    }
  };

  let _hasScroll = function (menu) {
    return menu.offsetHeight < menu.scrollHeight;
  };

  let _scrollIntoView = (item) => {
    let borderTop, paddingTop, offset, scroll, elementHeight, itemHeight;
    let activeMenu = $element[0].querySelector('.dropdown-menu');
    if (_hasScroll(activeMenu)) {
      borderTop = parseFloat(getComputedStyle(activeMenu)['border-top-width']) || 0;
      paddingTop = parseFloat(getComputedStyle(activeMenu)['padding-top']) || 0;
      offset = item.getBoundingClientRect().top - activeMenu.getBoundingClientRect().top - borderTop - paddingTop;
      scroll = activeMenu.scrollTop;
      elementHeight = activeMenu.offsetHeight;
      itemHeight = item.offsetHeight;

      if (offset < 0) {
        activeMenu.scrollTop = ( scroll + offset );
      } else if (offset + itemHeight > elementHeight) {
        activeMenu.scrollTop = ( scroll + offset - elementHeight + itemHeight );
      }
    }
  };

  let _focusDropdownEntry = (event) => {
    let keyCode = event.which;
    // If append to body is used.
    let hostEl = $element[0].getElementsByTagName('ul')[0]
    || $element[0].getElementsByClassName('md-select__options')[0];
    if (!hostEl) {
  // todo: throw exception?
        return;
    }
    if (
      Array.prototype.slice.call(document.activeElement.classList).indexOf('select-filter') !== -1
      || Array.prototype.slice.call(document.activeElement.classList).indexOf('md-select__filter') !== -1
    ) {
        return;
    }
    let elems = hostEl ? hostEl.getElementsByTagName('a') : [];
    let elemsLi = [];
    elemsLi = hostEl && hostEl.getElementsByTagName('li') || [];
    elemsLi = elemsLi.length ? elemsLi : (hostEl && hostEl.getElementsByClassName('md-list-item') || []);
    elemsLi = Array.prototype.slice.call(elemsLi);

    elems = elems.length ? elems : elemsLi;
    if (!elems || !elems.length) {
        return;
    }
    let focus, prev, character, skip, match, isTypeable, preventDefault = true, ignore = false;
    focus = true;
    isTypeable = $attrs.mdTypeable === 'true';
    switch (keyCode) {
        case (KeyCodes.BACKSPACE):
          ignore = true;
          break;
        case (KeyCodes.DOWN):
            if (typeof this.selectedOption !== 'number') {
                this.selectedOption = 0;
                break;
            }

            if (this.selectedOption === elems.length - 1) {
                break;
            }
            this.selectedOption++;
            break;
        case (KeyCodes.UP):
            if (typeof this.selectedOption !== 'number') {
                return;
            }

            if (this.selectedOption === 0) {
            // todo: return?
                break;
            }
            this.selectedOption--;
            break;
        case (KeyCodes.ENTER):
        case (KeyCodes.SPACE):
            if (scope.isOpen) {
                let selectToggle = $element[0].querySelector('.select-toggle');
                selectToggle = selectToggle || $element[0].querySelector('.md-select__input');
                focus = false;
                if (this.selectedOption === -1 || this.selectedOption === undefined) {
                    ignore = true;
                }
                if (this.selectedOption > -1) {
                  elems[this.selectedOption].focus();
                  elems[this.selectedOption].click();
                }
                selectToggle && selectToggle.focus();
                break;
            } else {
                scope.$apply(function() {
                  scope.isOpen = true;
                });
                let selectedItem = $element[0].querySelector('.select-selected');
                let ul = $element[0].getElementsByTagName('ul')[0]
                || $element[0].getElementsByClassName('md-select__options')[0];
                let elements = [];
                elements = ul && ul.getElementsByTagName('li') || [];
                elements = elements.length ? elements : (ul && ul.getElementsByClassName('md-list-item') || []);
                let nodeList = Array.prototype.slice.call(elements);
                this.selectedOption = nodeList.indexOf(selectedItem);
                break;
            }
        case (KeyCodes.TAB):
          preventDefault = false;
          break;
        default:
            if (isTypeable) {
              ignore = true;
              break;
            }
            preventDefault = true;
            prev = this.previousFilter || '';
            character = String.fromCharCode(keyCode);
            skip = false;

            $timeout.cancel(this.filterTimer);

            if (character === prev) {
                skip = true;
            } else {
                character = prev + character;
            }
            match = _filterMenuItems(elemsLi, character);
            if (skip && match.indexOf(this.active.nextElementSibling) !== -1) {
                match = [this.active.nextElementSibling];
            }
            if (!match.length) {
                character = String.fromCharCode(keyCode);
                match = _filterMenuItems(elemsLi, character);
            }
            if (match.length && this.mdIsOpen) {
                this.previousFilter = character;
                this.active = match[0];
                this.filterTimer = $timeout(() => {
                    delete this.previousFilter;
                }, 1000);
                this.selectedOption = elemsLi.indexOf(this.active);
            } else if (match.length && !this.mdIsOpen) {
                this.previousFilter = character;
                this.active = match[0];
                this.filterTimer = $timeout(() => {
                    delete this.previousFilter;
                }, 1000);
                this.selectedOption = elemsLi.indexOf(this.active);
                elems[this.selectedOption].click();
                focus = false;
            } else {
                delete this.previousFilter;
            }
            break;
    }
    if (!ignore) {
      if (focus && parseInt(this.selectedOption, 10) > -1) {
          _scrollIntoView(elems[this.selectedOption]);
          if (!scope.isOpen) {
            elems[this.selectedOption].click();
          } else {
            _addFocus(elems, this.selectedOption);
          }
      }
      if (preventDefault) {
          event.preventDefault();
      }
    }
  };

  this.keybindFilter = (e) => {
    // arrow-key navigation with the menu closed should only happen in default or combo selects, or dropdowns
    // where the selected option is easily viewable - nested and multi selects are too complicated and regular
    // dropdowns do not necessarily places the selected option on view
    if ($attrs.mdKeyboardNav === 'true' && $attrs.mdIsDisabled !== 'true') {
      _focusDropdownEntry(e);
    }
  };

  this.init = function () {
    if ($attrs.isOpen) {
      getIsOpen = $parse($attrs.isOpen);
      setIsOpen = getIsOpen.assign;

      $scope.$watch(getIsOpen, function (value) {
        scope.isOpen = !!value;
        if ($attrs.mdKeyboardNav === 'true') {
          if (!scope.isOpen) {
            scope.selectedOption = void 0;
            let focussedItem = $element[0].querySelector('.hover');
            if (focussedItem && focussedItem.classList) {
              focussedItem.classList.remove('hover');
            }
          } else {
            let selectedItem = $element[0].querySelector('.select-selected');
            let ul = $element[0].getElementsByTagName('ul')[0]
            || $element[0].getElementsByClassName('md-select__options')[0];
            let elements = [];
            elements = ul && ul.getElementsByTagName('li') || [];
            elements = elements.length ? elements : (ul && ul.getElementsByClassName('md-list-item') || []);
            let nodeList = Array.prototype.slice.call(elements);
            scope.selectedOption = nodeList.indexOf(selectedItem);
          }
        }
      });
    }

    if (angular.isDefined($attrs.dropdownAppendTo)) {
      let appendToEl = $parse($attrs.dropdownAppendTo)(scope);
      if (appendToEl) {
        appendTo = angular.element(appendToEl);
      }
    }

    appendToBody = angular.isDefined($attrs.dropdownAppendToBody);

    if (appendToBody && !appendTo) {
      appendTo = body;
    }

    if (appendTo && self.dropdownMenu) {
      appendTo.append(self.dropdownMenu);
      $element.on('$destroy', function handleDestroyEvent() {
        self.dropdownMenu.remove();
      });
    }
  };

  this.toggle = function (open) {
    return scope.isOpen = arguments.length ? !!open : !scope.isOpen;
  };

  // Allow other directives to watch status
  this.isOpen = function () {
    return scope.isOpen;
  };

  scope.getNewToggleElement = function () {
    return $element.find('.md-select__input');
  };

  scope.getToggleElement = function () {
    return self.toggleElement;
  };

  // check for ':visible' on a nested menu element
  scope.checkVisible = function (elem) {
    if (self.dropdownMenu) {
      return self.dropdownMenu.find(elem).is(':visible');
    } else {
      return $element.find(elem).is(':visible');
    }
  };

  // is the element below the nearest scrollable parent or viewport
  scope.isVisible = function (element) {
    if (!!element && !!element.getBoundingClientRect()) {
      let scrollParent = function (el) {
        // get parents
        let parents = function (node, ps) {
          return null === node.parentNode ? ps : parents(node.parentNode, ps.concat([node]));
        },
          // has overflow
          overflow = function (node) {
            let s = '';
            ['overflow', 'overflow-y'].forEach(function (n) {
              let css = getComputedStyle(node, null).getPropertyValue(n);
              s += s.indexOf(css) === -1 ? css : '';
            });
            return s;
          };
        // is scrollable
        if (el instanceof HTMLElement) {
          let ps = parents(el.parentNode, []),
            l = ps.length,
            i = 0;
          while (l--) {
            if (/(auto|scroll)/.test(overflow(ps[i]))) {
              return ps[i];
            }
            i++;
          }
          return window;
        }
      },
        wb = window.pageXOffset + window.innerHeight,
        wt = 0,
        sp = scrollParent(element),
        et = element.getBoundingClientRect().top - 36 - element.getBoundingClientRect().height,
        eb = element.getBoundingClientRect().bottom,
        pb = !!sp.getBoundingClientRect && sp.getBoundingClientRect().bottom || wb,
        pt = !!sp.getBoundingClientRect && sp.getBoundingClientRect().top || wt;

      return (eb < wb && eb < pb) || (et < wt && et < pt);
    }
  };

  scope.getAutoClose = function () {
    return $attrs.autoClose || 'always'; //or 'outsideClick' or 'disabled'
  };

  scope.getElement = function () {
    return $element;
  };

  scope.getElems = function (activeElement?) {
    if (_.isUndefined(activeElement)) {
      let elems;
      if (self.dropdownMenu) {
        let search = self.dropdownMenu.find('.md-select__filter--input');
        elems = self.dropdownMenu.find('.md-list-item');
        elems = elems.length ? elems : self.dropdownMenu.find('li');
        if (_.get(search, '[0].type') === 'text') {
          elems = elems.add(search[0]);
        }
      } else {
        let search = self.dropdownMenu.find('.md-select__filter--input');
        elems = $element.find('ul').eq(0).find('li');
        elems = elems.length ? elems : $element.find('.md-select__options').eq(0).find('li');
        elems = elems.length ? elems : $element.find('.md-select__options').eq(0).find('.md-list-item');
        if (_.get(search, '[0].type') === 'text') {
          elems = elems.add(search[0]);
        }
      }

      // nested options should be navigated into separately from the main options
      return _.filter(elems, function (elem: JQuery) {
        return (elem as any).classList.value.indexOf('md-select__nested-option') === -1;
      });
    } else {
      let items;
      if (self.dropdownMenu) {
        items = self.dropdownMenu.find(activeElement).find('li');
        items = items.length ? items : self.dropdownMenu.find(activeElement).find('.md-list-item');
        return items;
      } else {
        items = $element.find(activeElement).find('ul').eq(0).find('li');
        items = items.length ? items : $element.find(activeElement).find('.md-select__options').eq(0).find('.md-list-item');
        return items;
      }
    }
  };

  scope.getTypeable = () => {
    return $attrs.mdTypeable === 'true';
  }

  scope.focusDropdownEntry = function (keyCode, activeElement, elems?) {
    if (_.isUndefined(elems)) {
      elems = scope.getElems();
    }

    if (!_.isFinite(scope.selectedNestedOption)) {
      scope.nestedElems = scope.getElems(activeElement);
    }
    switch (keyCode) {
      case KeyCodes.DOWN:
        {
          if (!_.isFinite(scope.selectedOption) && !_.isFinite(scope.selectedNestedOption)) {
            scope.selectedOption = 0;
          } else if (_.isFinite(scope.selectedOption) && !_.isFinite(scope.selectedNestedOption)) {
            scope.selectedOption = scope.selectedOption === elems.length - 1 ? scope.selectedOption : scope.selectedOption + 1;
          } else if (_.isFinite(scope.selectedNestedOption)) {
            scope.selectedNestedOption = scope.selectedNestedOption === scope.nestedElems.length - 1 ? null : scope.selectedNestedOption + 1;
            if (!_.isFinite(scope.selectedNestedOption)) {
              scope.selectedOption = scope.selectedOption === elems.length - 1 ? scope.selectedOption : scope.selectedOption + 1;
            }
          }
          break;
        }
      case KeyCodes.UP:
        {
          if (_.isFinite(scope.selectedOption) && !_.isFinite(scope.selectedNestedOption)) {
            scope.selectedOption = scope.selectedOption === 0 ? 0 : scope.selectedOption - 1;
          } else if (_.isFinite(scope.selectedNestedOption)) {
            scope.selectedNestedOption = scope.selectedNestedOption === 0 ? null : scope.selectedNestedOption - 1;
          }
          break;
        }
      case KeyCodes.RIGHT:
        {
          if (!_.isFinite(scope.selectedNestedOption) && scope.nestedElems.length > 0) {
            scope.selectedNestedOption = 0;
          }
          break;
        }
      case KeyCodes.LEFT:
        {
          scope.selectedNestedOption = null;
          break;
        }
    }

    if (_.isFinite(scope.selectedOption) && !_.isFinite(scope.selectedNestedOption)) {
      elems.map((e) => e !== elems[scope.selectedOption] ? e.tabIndex = -1 : e.tabIndex = 0);
      elems[scope.selectedOption].tabIndex = 0;
      elems[scope.selectedOption].focus();
    } else if (_.isFinite(scope.selectedNestedOption)) {
      // timeout necessary to ensure focus doesn't shift until after the menu becomes visible
      $timeout(function () {
        scope.nestedElems[scope.selectedNestedOption].focus();
      }, 100);
    }
  };

  scope.getDropdownElement = function () {
    return self.dropdownMenu;
  };

  scope.focusToggleElement = function () {
    if (self.toggleElement) {
      self.toggleElement[0].focus();
    }
  };

  scope.$watch('isOpen', function (isOpen, wasOpen) {
    $animate[isOpen ? 'addClass' : 'removeClass']($element, openClass);
    if (appendTo && self.dropdownMenu) {
      let pos = $position.positionElements($element, self.dropdownMenu, 'bottom-left', true),
        css,
        rightalign;

      css = {
        top: pos.top + 'px',
        display: isOpen ? 'block' : 'none',
      };

      rightalign = self.dropdownMenu.hasClass('dropdown-menu-right');
      if (!rightalign) {
        css.left = pos.left + 'px';
        css.right = 'auto';
      } else {
        css.left = 'auto';
        css.right = window.innerWidth -
          (pos.left + $element.prop('offsetWidth')) + 'px';
      }

      // Need to adjust our positioning to be relative to the appendTo container
      // if it's not the body element
      if (!appendToBody) {
        let appendOffset = $position.offset(appendTo);

        css.top = pos.top - appendOffset.top + 'px';

        if (!rightalign) {
          css.left = pos.left - appendOffset.left + 'px';
        } else {
          css.right = window.innerWidth -
            (pos.left - appendOffset.left + $element.prop('offsetWidth')) + 'px';
        }
      }

      self.dropdownMenu.css(css);
    }

    let openContainer = appendTo ? appendTo : $element;

    $animate[isOpen ? 'addClass' : 'removeClass'](openContainer, appendTo ? appendToOpenClass : openClass).then(function () {
      $scope.$broadcast('positionDropdown', isOpen, wasOpen, openContainer, $element);
      if (angular.isDefined(isOpen) && isOpen !== wasOpen) {
        toggleInvoker($scope, { open: !!isOpen });
      }
    });

    if (isOpen) {
      if (self.dropdownMenuTemplateUrl) {
        $templateRequest(self.dropdownMenuTemplateUrl).then(function (tplContent) {
          templateScope = scope.$new();
          $compile(tplContent.trim())(templateScope, function (dropdownElement) {
            let newEl = dropdownElement;
            self.dropdownMenu.replaceWith(newEl);
            self.dropdownMenu = newEl;
          });
        });
      }

      scope.focusToggleElement();
      if ($element.hasClass('md-select-multi')) {
        mdDropdownService.open(scope, true);
      } else {
        mdDropdownService.open(scope);
      }
    } else {
      if (self.dropdownMenuTemplateUrl) {
        if (templateScope) {
          templateScope.$destroy();
        }
        let newEl = angular.element('<ul class="dropdown-menu"></ul>');
        self.dropdownMenu.replaceWith(newEl);
        self.dropdownMenu = newEl;
      }

      mdDropdownService.close(scope);
      scope.selectedOption = null;
      scope.selectedNestedOption = null;
    }

    if (angular.isFunction(setIsOpen)) {
      setIsOpen($scope, isOpen);
    }
    $timeout(function () {
      $animate[isOpen ? 'addClass' : 'removeClass']($('.dropdown-menu', $element), 'visible');
    }, 10);

  });

  $scope.$on('positionDropdown', function (isOpen, wasOpen, openContainer, $element) {
    let element = $('.dropdown-menu', $element)[0];
    if (element) {
      $animate[isOpen && !scope.isVisible(element) ? 'addClass' : 'removeClass'](element, 'top');
    }
  });

  $scope.$on('$locationChangeSuccess', function () {
    if (scope.getAutoClose() !== 'disabled') {
      scope.isOpen = false;
    }
  });
}

mdDropdown.$inject = ['$window'];
export function mdDropdown($window) {
  return {
    controller: MdDropdownController,
    link: function (scope, element, attrs, dropdownCtrl) {
      dropdownCtrl.init();

      setTimeout(() => {
        element.find('.select-toggle').on('focus', () => {
          $window.document.addEventListener('keydown', dropdownCtrl.keybindFilter);
        });
        element.find('.select-toggle').on('blur', () => {
          $window.document.removeEventListener('keydown', dropdownCtrl.keybindFilter);
        });
        element.find('.md-select__input').on('focus', () => {
          $window.document.addEventListener('keydown', dropdownCtrl.keybindFilter);
        });
        element.find('.md-select__input').on('blur', () => {
          $window.document.removeEventListener('keydown', dropdownCtrl.keybindFilter);
        });
      });

    },
  };
}

export function mdDropdownMenu() {
  return {
    restrict: 'A',
    require: '?^mdDropdown',
    link: function (scope, element, attrs, dropdownCtrl) {
      if (!dropdownCtrl || angular.isDefined(attrs.dropdownNested)) {
        return;
      }

      element.addClass('dropdown-menu');

      let tplUrl = attrs.templateUrl;
      if (tplUrl) {
        dropdownCtrl.dropdownMenuTemplateUrl = tplUrl;
      }

      if (!dropdownCtrl.dropdownMenu) {
        dropdownCtrl.dropdownMenu = element;
      }
    },
  };
}

export function mdDropdownToggle() {
  return {
    require: '?^mdDropdown',
    link: function (scope, element, attrs, dropdownCtrl) {
      if (!dropdownCtrl) {
        return;
      }

      element.addClass('dropdown-toggle');

      dropdownCtrl.toggleElement = element;

      let toggleDropdown = function (event) {
        event.preventDefault();

        if (!element.hasClass('disabled') && !attrs.disabled) {
          scope.$apply(function () {
            dropdownCtrl.toggle();
          });
        }
      };

      element.bind('click', toggleDropdown);

      // WAI-ARIA
      element.attr({ 'aria-haspopup': true, 'aria-expanded': false });
      scope.$watch(dropdownCtrl.isOpen, function (isOpen) {
        element.attr('aria-expanded', !!isOpen);
      });

      scope.$on('$destroy', function () {
        element.unbind('click', toggleDropdown);
      });
    },
  };
}
