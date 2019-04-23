/**
 * Description: Reusable service for components with dropdowns
 * component can pick and choose which functions it need for
 * dropup and keyboard support depending on what type of data
 * is in the dropdown
*/
import * as _ from 'lodash';
import { KeyboardEventCodes } from './eventCodes';

export class DropdownService {
  /**
   * Function for determining if an element is completely visible onscreen
   * or if the element is offscreen or only partially visible.  The element
   * must be completely visible for isVisible to return true.
   *
   * @public
   * @param element
   * @returns boolean
   *
   * @memberOf DropdownService
   */
  public isVisible(element: HTMLElement): boolean {
    if (!!element && !!element.getBoundingClientRect()) {

      const scrollParent = function (el) {
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
      };

      const wb = window.pageXOffset + window.innerHeight;
      const sp = scrollParent(element);
      const et = element.getBoundingClientRect().top - 36 - element.getBoundingClientRect().height;
      const eb = element.getBoundingClientRect().bottom;
      const pb = !!sp.getBoundingClientRect && sp.getBoundingClientRect().bottom || wb;
      const pt = !!sp.getBoundingClientRect && sp.getBoundingClientRect().top || 0;

      return (eb < wb && eb < pb) || (et < 0 && et < pt);
    }
  }

  /**
   * Function for controlling the keyboard movements in a list
   *  - TODO: Account for lists with flyout menu(s)
   *  - NOTE: Has not been tested with dropdowns including nested inputs
   *
   * @param options: {
   *  $event: KeyboardEvent,
   *  optionList: ng.IRootElementService,
   *  selectedLocation: number,
   *  selectedOption: any,
   *  toggleButton: ng.IRootElementService,
   *  closeMenu: Function,
   *  taboutFn? : Function
   * }
   */
  public listItemKeypress(options: {
    $event: KeyboardEvent,
    optionList: ng.IRootElementService,
    selectedLocation: number,
    selectedOption: any, // TODO: create interface for use checking for flyout menus
    toggleButton: ng.IRootElementService,
    closeMenu: Function,
    taboutFn?: Function,
  }) {
    const { $event, optionList, selectedLocation, selectedOption, toggleButton, closeMenu, taboutFn } = options;
    const eventCode = $event.key;
    const listLength = optionList.length - 1;

    switch (eventCode) {
      case KeyboardEventCodes.Enter:
      case KeyboardEventCodes.Space:
        this.stopEventPropogation($event);
        closeMenu($event, selectedOption);
        break;
      case KeyboardEventCodes.Up:
      case KeyboardEventCodes.ArrowUp:
        this.stopEventPropogation($event);
        if (selectedLocation > 0) {
          optionList[selectedLocation - 1].focus();
        }
        break;
      case KeyboardEventCodes.Down:
      case KeyboardEventCodes.ArrowDown:
        this.stopEventPropogation($event);
        if (selectedLocation < listLength) {
          optionList[selectedLocation + 1].focus();
        }
        break;
      case KeyboardEventCodes.Tab:
        if ($event.shiftKey) {
          this.stopEventPropogation($event);
          if (selectedLocation > 0) {
            optionList[selectedLocation - 1].focus();
          } else {
            toggleButton.focus();
          }
        } else {
          if (selectedLocation < listLength) {
            this.stopEventPropogation($event);
            optionList[selectedLocation + 1].focus();
          } else if (_.isFunction(taboutFn)) {
            this.stopEventPropogation($event);
            taboutFn($event);
          }
        }
    }
  }

  /**
   * Function for scrolling the selected item on a list into view
   *
   * @param listContainer
   * @param listItem
   */
  public scrollIntoView(listContainer, listItem) {
    listContainer.animate({
      scrollTop: listItem.offsetTop,
    });
  }

  /**
   * Function for stopping propogation
   *
   * @param $event
   */
  public stopEventPropogation($event) {
    $event.preventDefault();
    $event.stopPropagation();
  }


  /**
   * Function to control the keypress events for the dropdown toggle.
   * When the dropdown is open, tabbing into the dropdown should go to
   * the selectedElement and Enter/Space should trigger the click
   * function which is passed in as toggleOpen
   *
   * @param options: {
   *  $event: KeyboardEvent,
   *  menuOpen: boolean,
   *  selectedElement: HTMLElement,
   *  toggleOpen: Function,
   * }
   */
   public toggleKeypress(options: {
     $event: KeyboardEvent,
     menuOpen: boolean,
     selectedElement: HTMLElement,
     toggleOpen: Function,
    }) {
    const { $event, menuOpen, selectedElement, toggleOpen } = options;
    const eventCode = $event.key;

    if (menuOpen) {
      switch (eventCode) {
        case KeyboardEventCodes.Enter:
        case KeyboardEventCodes.Space:
          this.stopEventPropogation($event);
          toggleOpen($event);
          break;
        case KeyboardEventCodes.Tab:
          if ($event.shiftKey) {
            // menu should close on shift+tab
            // but normal shift+tab should occur
            toggleOpen($event);
          } else {
            this.stopEventPropogation($event);
            selectedElement.focus();
          }
          break;
      }
    } else {
      switch (eventCode) {
        case KeyboardEventCodes.Enter:
        case KeyboardEventCodes.Space:
          this.stopEventPropogation($event);
          toggleOpen($event);
          break;
      }
    }
   }
}
