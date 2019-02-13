/** @component list-item */

import React from 'react';
import PropTypes from 'prop-types';
import omit from 'lodash/omit';
import uniqueId from 'lodash/uniqueId';
import { UIDReset } from 'react-uid';
import SelectableContext from '../SelectableContext';
import ListContext from '../ListContext';
import qsa from 'dom-helpers/query/querySelectorAll';

class List extends React.Component {
  static getDerivedStateFromProps({ active }, state) {
    return (
      active 
        ? {
          ...state,
          listContext: {
            ...state.listContext,
            active
          }
        }
        : state
    );
  }
  
  state = {
    id: this.props.id || uniqueId('cui-list-'),
    last: 0,
    listContext: {
      active: this.props.active,
      focus: null,
      role: this.props.itemRole,
      type: this.props.type
    },
  };

  componentDidMount() {
    const { focusFirst } =  this.props;

    focusFirst
      && this.listNode
      && this.determineInitialFocus();
  }

  componentDidUpdate(prevProps, prevState) {
    if (!this._needsRefocus || !this.listNode) return;

    if (this.state.listContext.focus && prevState.listContext.focus !== this.state.listContext.focus) {
      this.listNode.querySelector(`[data-md-event-key=${this.state.listContext.focus}]`).focus();
    }
  }

  getNextFocusedChild(current, offset) {
    if (!this.listNode) return null;

    const items = qsa(this.listNode, `.cui-list-item:not(.disabled):not(:disabled):not(.cui-list-item--read-only)`);
    const possibleIndex = items.indexOf(current) + offset;

    const getIndex = () => {
      if (possibleIndex < 0) {
        return items.length - 1;
      } else if (possibleIndex > items.length - 1) {
        return 0;
      } else return possibleIndex;
    };

    this.setState({ 
      listContext: {
        ...this.state.listContext,
        focus: items[getIndex()].attributes['data-md-event-key'].value,
      }
    });
  }

  determineInitialFocus = () => {
    const items = qsa(this.listNode, `.cui-list-item:not(.disabled):not(:disabled):not(.cui-list-item--read-only)`);

    items.length && this.getNextFocusedChild(items[0], 0);
  }

  handleSelect = (e, value, label, eventKey) => {
    const { onSelect } = this.props;
    const { active } = this.state.listContext;
    const items = qsa(this.listNode, '.cui-list-item');
    const index = items.indexOf(this.listNode.querySelector(`[data-md-event-key=${eventKey}]`));

    this.setFocus(index);
    // Don't do anything if onSelect Event Handler is present
    if (onSelect) {
      return onSelect(e, value, items[index].attributes['data-md-event-key'].value, label);
    }
    // Don't do anything if index is the same or outside of the bounds
    if (
      eventKey === active ||
      index < 0 ||
      index >= items.length - 1
    )
    return;
    // Keep reference to last index for event handler
    const last = active;
    // Call change event handler
    this.setState(state => ({ 
      last,
      listContext: {
        ...state.listContext,
        active: items[index].attributes['data-md-event-key'].value
      }
    }));
  };

  setFocus = index => {
    const items = qsa(this.listNode, '.cui-list-item');

    this.setState(state => ({ 
      listContext: {
        ...state.listContext,
        focus: items[index].attributes['data-md-event-key'].value,
      }
    }));
  };

  getIncludesFirstCharacter = (str, char) =>
    str
      .charAt(0)
      .toLowerCase()
      .includes(char);

  setFocusByFirstCharacter = (char, focusIdx, items, length) => {
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
            ? agg.concat(index)
            : agg;
      },
      []
    );

    !isNaN(newIndex[0]) && this.setFocus(newIndex[0]);
  };

  handleKeyDown = (e) => {
    const { focus } = this.state.listContext;
    let clickEvent;
    const tgt = e.currentTarget;
    const char = e.key;
    const items = qsa(this.listNode, `.cui-list-item:not(.disabled):not(:disabled):not(.cui-list-item--read-only)`);
    const length = items.length && items.length - 1 || 0;
    const focusIdx = focus && items.indexOf(this.listNode.querySelector(`[data-md-event-key=${focus}]`)) || 0;
    let flag = false;

    const isPrintableCharacter = str => {
      return str.length === 1 && str.match(/\S/);
    };

    switch (e.which) {
      case 32:
      case 13:
        try {
          clickEvent = new MouseEvent('click', {
            view: window,
            bubbles: true,
            cancelable: true,
          });
        } catch (err) {
          if (document.createEvent) {
            // DOM Level 3 for IE 9+
            clickEvent = document.createEvent('MouseEvents');
            clickEvent.initEvent('click', true, true);
          }
        }
        tgt.dispatchEvent(clickEvent);
        flag = true;
        break;

      case 38:
      case 37:
        this.getNextFocusedChild(tgt, -1);
        this._needsRefocus = true;
        flag = true;
        break;

      case 39:
      case 40:
        this.getNextFocusedChild(tgt, 1);
        this._needsRefocus = true;
        flag = true;
        break;

      case 33:
      case 36:
        this.setFocus(0);
        this._needsRefocus = true;
        flag = true;
        break;

      case 34:
      case 35:
        this.setFocus(length);
        this._needsRefocus = true;
        flag = true;
        break;
      default:
        if (isPrintableCharacter(char)) {
          this.setFocusByFirstCharacter(char, focusIdx, items, length);
          this._needsRefocus = true;
          flag = true;
        }
        break;
    }

    if (flag) {
      e.stopPropagation();
      e.preventDefault();
    }
  };
  
  render() {
    const {
      active,
      children,
      className,
      role,
      tabType,
      wrap,
      ...props
    } = this.props;
    const {
      listContext
    } = this.state;
    
    const otherProps = omit({...props}, [
      'focusFirst',
      'itemRole',
      'type'
    ]);

    const getActiveId = () => {
      const activeNode = active 
        && active.length
        && this.listNode
        && this.listNode.querySelector(`[data-md-event-key=${active[0]}]`);

      return (
        activeNode && activeNode.id
      );
    };

    /* eslint-disable jsx-a11y/aria-activedescendant-has-tabindex */
    return (
      <SelectableContext.Provider value={{
        parentKeyDown: this.handleKeyDown,
        parentSelect: this.handleSelect
      }}>
        <ListContext.Provider value={listContext}>
          <div
            className={
              'cui-list' +
              `${tabType && ` cui-list--${tabType}` || ''}` +
              `${wrap && ` cui-list--wrap` || ''}` +
              `${(className && ` ${className}`) || ''}`
            }
            role={role}
            aria-activedescendant={getActiveId()}
            ref={ref => this.listNode = ref}
            {...otherProps}
          >
            <UIDReset>
              {children}
            </UIDReset>
          </div>
        </ListContext.Provider>
      </SelectableContext.Provider>
    );
    /* eslint-enable*/
  }
}

List.propTypes = {
  /** @prop Optional active prop to pass active prop to children | null */
  active: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.array
  ]),
  /** @prop Children nodes to render inside List | null */
  children: PropTypes.node,
  /** @prop Optional css class string | '' */
  className: PropTypes.string,
  /** @prop Sets first List item to have focus | true */
  focusFirst: PropTypes.bool,
  /** @prop Optional ID value of List | null */
  id: PropTypes.string,
  /** @prop Optional tabType prop type to manually set child role | 'listItem' */
  itemRole: PropTypes.string,
  /** @prop Callback function invoked by user selecting an interactive item within List | null */
  onSelect: PropTypes.func,
  /** @prop Sets the ARIA role for the Nav, in the context of a TabContainer | 'list' */
  role: PropTypes.string,
  /** @prop Sets the orientation of the List | 'vertical' */
  tabType: PropTypes.oneOf(['vertical', 'horizontal']),
  /** @prop Sets List size | null */
  type: PropTypes.oneOf(['small', 'large', 'space', 'xlarge']),
  /** @prop Optional wrap prop type to wrap items to next row */
  wrap: PropTypes.bool
};

List.defaultProps = {
  active: null,
  children: null,
  className: '',
  id: null,
  itemRole: 'listItem',
  focusFirst: true,
  onSelect: null,
  role: 'list',
  tabType: 'vertical',
  type: null,
  wrap: false,
};

List.displayName = 'List';

export default List;