import React from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';
import omit from 'lodash/omit';
import mapContextToProps from 'react-context-toolbox/mapContextToProps';
import qsa from 'dom-helpers/query/querySelectorAll';
import { UIDReset } from 'react-uid';
import SelectableContext from '../SelectableContext';
import ListContext from '../ListContext';
import MenuContext from '../MenuContext';

class Menu extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      currentParent: null,
      activeElement: null,
      listContext: {
        active: [],
        focus: null,
      },
      selectContext: {
        parentKeyDown: this.handleKeyDown,
        parentOnSelect: this.handleSelect
      }
    };
  }

  componentDidMount() {
    const menuItems = this.getFocusableItems(this.menuNode);

    menuItems.length && this.setFocus(menuItems[0]);
  }

  componentDidUpdate(prevProps, prevState) {
    if(!this.menuNode) return;
    const { 
      activeElement,
      currentParent,
      listContext,
    } = this.state;

    if(prevState.listContext !== listContext) {
      if(activeElement && this._selectRefocus) {
        const activeNode = ReactDOM.findDOMNode(activeElement);
        const overlayItems = this.getFocusableItems(activeNode, '.cui-menu-item-container');
        const items = overlayItems.length 
          && this.getFocusableItems(overlayItems[0]);
        
        this._selectRefocus = false;
        items.length && this.setFocus(items[0]);
      } else if (!activeElement && this._selectRefocus) {

        this._selectRefocus = false;
        this.menuNode
          .querySelector(`[data-md-event-key=${currentParent}]`)
          .focus();
      } else if (this._needsRefocus) {

        this._needsRefocus = false;
        this.menuNode
          .querySelector(`[data-md-event-key=${listContext.focus}]`)
          .focus();
      }
    }
  }

  getFocusableItems = (node, selector) => {
    const defaultSelector = '.cui-list-item:not(.disabled):not(:disabled)' + 
      ':not(.cui-list-item--read-only)';

    return qsa(node, selector || defaultSelector);
  }

  getIncludesFirstCharacter = (str, char) =>
  str
    .charAt(0)
    .toLowerCase()
    .includes(char);

  getNextFocusedChild(element, current, offset) {
    if (!element) return null;
    const { focus } = this.state.listContext;
    
    const items = this.getFocusableItems(element);
    const possibleIndex = items.indexOf(current) + offset;

    const getIndex = () => {
      if (possibleIndex < 0) {
        return items.length - 1;
      } else if (possibleIndex > items.length - 1) {
        return 0;
      } else return possibleIndex;
    };

    const newFocusKey = items[getIndex()]
      .attributes['data-md-event-key']
      .value;

    newFocusKey !== focus
    && this.setState({ 
      listContext: {
        ...this.state.listContext,
        focus: newFocusKey,
      }
    });
  }

  handleSelect = (e, opts) => {
    const { onSelect, parentOnSelect } = this.props;
    const { eventKey, element } = opts;
    const { children } = element.props;
    this._selectRefocus = true;

    this.setState(state => ({
      activeElement: children ? element : null,
      currentParent: children ? eventKey : state.currentParent,
      listContext: {
        ...state.listContext,
        focus: eventKey,
        active: [eventKey]
      }
    }),
      () => {
        onSelect && onSelect(e, {eventKey, element});
        parentOnSelect && parentOnSelect(e, {eventKey, element});
      }
    );
  }

  setFocus = child => {
    this._needsRefocus = false;

    this.setState(state => ({
      listContext: {
        ...state.listContext,
        focus: child.attributes['data-md-event-key'].value
      }
    }),
      () => child.focus()
    );
  }

  setFocusByFirstCharacter = (element, char) => {
    const { focus } = this.state.listContext;

    const items = this.getFocusableItems(element);
    const focusIdx = focus && items.indexOf(element.querySelector(`[data-md-event-key=${focus}]`)) || 0;
    const length = items.length && items.length - 1 || 0;

    const newIndex = items
      .reduce((agg, item, idx, arr) => {

        const index = focusIdx + idx + 1 > length
          ? Math.abs(focusIdx + idx - length)
          : focusIdx + idx + 1;

          return (
            !agg.length
              && arr[index].attributes['data-md-keyboard-key']
              && arr[index].attributes['data-md-keyboard-key'].value
              && this.getIncludesFirstCharacter(arr[index].attributes['data-md-keyboard-key'].value, char)
          )
            ? agg.concat(arr[index].attributes['data-md-event-key'].value)
            : agg;
      },
      []
    );

    typeof newIndex[0] === 'string' 
      && newIndex[0] !== focus
      && this.setState(state => ({ 
        listContext: {
          ...state.listContext,
          focus: newIndex[0],
        }
      }));
  }

  setFocusToLimit(element, target) {
    if (!element) return null;
    const { focus } = this.state.listContext;
  
    const items = this.getFocusableItems(element);
    const newFocusKey = 
      items[
        target === 'start' 
        ? 0 
        : items.length -1
      ]
        .attributes['data-md-event-key']
        .value;

    newFocusKey !== focus
    && this.setState({ 
      listContext: {
        ...this.state.listContext,
        focus: newFocusKey,
      }
    });
  }

  handleKeyDown = (e, opts) => {
    const { element } = opts;
    const { children } = element.props;
    const { activeElement, listContext } = this.state;
    const char = e.key;
    const target = e.currentTarget;
    const activeParent = activeElement
      ? qsa(ReactDOM.findDOMNode(activeElement), '.cui-menu-item-container')[0]
      : this.menuNode;

    const isPrintableCharacter = char => {
      return char.length === 1 && char.match(/\S/);
    };
    let flag = false;

    switch (e.which) {
      case 38://up
        this.getNextFocusedChild(activeParent, target, -1);
        this._needsRefocus = true;
        flag = true;
        break;

      case 40://down
        this.getNextFocusedChild(activeParent, target, 1);
        this._needsRefocus = true;
        flag = true;
        break;

      case 39: //right
        children &&
        this.handleSelect(e, opts);
        flag = true;
        break;

      case 37: //left
        listContext.active.length &&
          this.setState({
            activeElement: null,
            listContext: {
              focus: listContext.active,
              active: []
            }
          });
        this._needsRefocus = true;
        flag = true;
        break;

      case 33:
      case 36: //home or page up
        this.setFocusToLimit(activeParent, 'start');
        this._needsRefocus = true;
        flag = true;
        break;
      case 34:
      case 35: //end or page down
        this.setFocusToLimit(activeParent, 'end');
        this._needsRefocus = true;
        flag = true;
        break;

      default:
        if (isPrintableCharacter(char)) {
          this.setFocusByFirstCharacter(activeParent, char);
          this._needsRefocus = true;
          flag = true;
        }
        break;
    }

    if (flag) {
      e.stopPropagation();
      e.preventDefault();
    }
  }

  render() {
    const {
      ariaLabel,
      children,
      className,
      ...props
    } = this.props;
    const { 
      listContext, 
      selectContext
    } = this.state;

    const otherProps = omit({...props}, [
      'parentOnSelect'
    ]);

    return (
      <SelectableContext.Provider value={selectContext}>
        <ListContext.Provider value={listContext}>
          <div
            className={
              'cui-menu' +
              ' cui-menu-item-container' +
              `${(className && ` ${className}`) || ''}`
            }
            aria-label={ariaLabel}
            ref={ref => this.menuNode = ref}
            role="menubar"
            {...otherProps}
          >
            <UIDReset>
              {children}
            </UIDReset>
          </div>
        </ListContext.Provider>
      </SelectableContext.Provider>
    );
  }
}

Menu.propTypes = {
  /** @prop Text to display for accessibility features | ''  */
  ariaLabel: PropTypes.string,
  /** @prop Children nodes to render inside Menu | null */
  children: PropTypes.node,
  /** @prop Optional css class name | '' */
  className: PropTypes.string,
  /** @prop Callback function invoked when user selects | null */
  onSelect: PropTypes.func,
  // Internal Context Use Only
  parentOnSelect: PropTypes.func,
};

Menu.defaultProps = {
  ariaLabel: '',
  children: null,
  className: '',
  onSelect: null,
  parentOnSelect: null,
};

Menu.displayName = 'Menu';

export default mapContextToProps(
  MenuContext,
  parentOnSelect => ({ parentOnSelect }),
  Menu
);