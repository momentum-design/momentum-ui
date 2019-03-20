/** @component list-item */

import React from 'react';
import PropTypes from 'prop-types';
import omit from 'lodash/omit';
import uniqueId from 'lodash/uniqueId';
import qsa from 'dom-helpers/query/querySelectorAll';
import { UIDReset } from 'react-uid';
import SelectableContext from '../SelectableContext';
import ListContext from '../ListContext';

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

  constructor(props) {
    super(props);

    this.state = {
      id: props.id || uniqueId('cui-list-'),
      last: 0,
      listContext: {
        active: props.active,
        focus: null,
        role: props.itemRole,
        type: props.type
      },
      selectContext: {
        parentKeyDown: this.handleKeyDown,
        parentOnSelect: this.handleSelect
      }
    };
  }

  componentDidMount() {
    const { focusFirst } =  this.props;

    focusFirst
      && this.listNode
      && this.determineInitialFocus();
  }

  componentDidUpdate(prevProps, prevState) {
    const { listContext } = this.state;
    if (!this._needsRefocus || !this.listNode) return;

    if (listContext.focus && prevState.listContext.focus !== listContext.focus) {
      this.listNode.querySelector(`[data-md-event-key="${listContext.focus}"]`).focus();
    }
  }

  determineInitialFocus = () => {
    const items = qsa(this.listNode, `.cui-list-item:not(.disabled):not(:disabled):not(.cui-list-item--read-only)`);

    this._needsRefocus = true;
    items.length && this.getNextFocusedChild(items[0], 0);
  }

  getIncludesFirstCharacter = (str, char) =>
  str
    .charAt(0)
    .toLowerCase()
    .includes(char);

  getNextFocusedChild(current, offset) {
    if (!this.listNode) return null;
    const { shouldLoop } = this.props;
    const { listContext } = this.state;

    const items = qsa(this.listNode, `.cui-list-item:not(.disabled):not(:disabled):not(.cui-list-item--read-only)`);
    const possibleIndex = items.indexOf(current) + offset;

    const getIndex = () => {
      if (possibleIndex < 0) {
        return shouldLoop 
          ? items.length - 1
          : 0;
      } else if (possibleIndex > items.length - 1) {
        return shouldLoop
          ? 0
          : items.length - 1;
      } else return possibleIndex;
    };

    return listContext.focus !== this.getValue(items, getIndex(), 'event')
      && this.setState({
      listContext: {
        ...listContext,
        focus: this.getValue(items, getIndex(), 'event'),
      }
    });
  }

  getValue = (arr, index, attribute) => (
    arr[index].attributes[`data-md-${attribute}-key`]
      && arr[index].attributes[`data-md-${attribute}-key`].value
  );

  handleKeyDown = e => {
    const { focus } = this.state.listContext;
    let clickEvent;
    const tgt = e.currentTarget;
    const char = e.key;
    const items = qsa(this.listNode, `.cui-list-item:not(.disabled):not(:disabled):not(.cui-list-item--read-only)`);
    const length = items.length && items.length - 1 || 0;
    const focusIdx = focus && items.indexOf(this.listNode.querySelector(`[data-md-event-key="${focus}"]`)) || 0;
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
        this.setFocusToLimit('start', items, length);
        this._needsRefocus = true;
        flag = true;
        break;

      case 34:
      case 35:
        this.setFocusToLimit('end', items, length);
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
  }

  handleSelect = (e, opts) => {
    const { onSelect } = this.props;
    const { active } = this.state.listContext;
    const { eventKey, label, value } = opts;
    const items = qsa(this.listNode, '.cui-list-item');
    const index = items.indexOf(this.listNode.querySelector(`[data-md-event-key="${eventKey}"]`));

    this.setFocus(index);
    // Don't do anything if onSelect Event Handler is present
    if (onSelect) {
      return onSelect(e, {
        eventKey: this.getValue(items, index, 'event'),
        label,
        value,
      });
    }
    // Don't do anything if index is the same or outside of the bounds
    if (
      eventKey === active ||
      index < 0 ||
      index > items.length - 1
    )
    return;
    // Keep reference to last index for event handler
    const last = active;
    // Call change event handler
    this.setState(state => ({
      last,
      listContext: {
        ...state.listContext,
        active: this.getValue(items, index, 'event')
      }
    }));
  };

  setFocus = index => {
    const items = qsa(this.listNode, '.cui-list-item');

    this.setState(state => ({
      listContext: {
        ...state.listContext,
        focus: this.getValue(items, index, 'event'),
      }
    }));
  };

  setFocusByFirstCharacter = (char, focusIdx, items, length) => {
    const { listContext } = this.state;
    const newIndex = items
      .reduce((agg, item, idx, arr) => {

        const index = focusIdx + idx + 1 > length
          ? Math.abs(focusIdx + idx - length)
          : focusIdx + idx + 1;

          return (
            !agg.length
              && this.getValue(arr, index, 'keyboard')
              && this.getIncludesFirstCharacter(this.getValue(arr, index, 'keyboard'), char)
          )
            ? agg.concat(this.getValue(arr, index, 'event'))
            : agg;
      },
      []
    );

    typeof newIndex[0] === 'string'
    && listContext.focus !== newIndex[0]
    && this.setState(state => ({
      listContext: {
        ...state.listContext,
        focus: newIndex[0],
      }
    }));
  }

  setFocusToLimit(target, items, length) {
    const { focus } = this.state.listContext;

    const index = target === 'start' ? 0 : length;
    const newFocusKey = this.getValue(items, index, 'event');

    newFocusKey !== focus
    && this.setState({
      listContext: {
        ...this.state.listContext,
        focus: newFocusKey,
      }
    });
  }

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
      listContext,
      selectContext,
    } = this.state;

    const otherProps = omit({...props}, [
      'focusFirst',
      'itemRole',
      'shouldLoop',
      'type'
    ]);

    const getActiveId = () => {
      const activeNode = active
        && active.length
        && this.listNode
        && this.listNode.querySelector(`[data-md-event-key="${active[0]}"]`);

      return (
        activeNode && activeNode.id
      );
    };

    /* eslint-disable jsx-a11y/aria-activedescendant-has-tabindex */
    return (
      <SelectableContext.Provider value={selectContext}>
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
    PropTypes.array,
    PropTypes.number
  ]),
  /** @prop Children nodes to render inside List | null */
  children: PropTypes.node,
  /** @prop Optional css class string | '' */
  className: PropTypes.string,
  /** @prop Sets first List item to have focus | true */
  focusFirst: PropTypes.bool,
  /** @prop Optional ID value of List | null */
  id: PropTypes.string,
  /** @prop Optional tabType prop type to manually set child role | 'listitem' */
  itemRole: PropTypes.string,
  /** @prop Callback function invoked by user selecting an interactive item within List | null */
  onSelect: PropTypes.func,
  /** @prop Sets the ARIA role for the Nav, in the context of a TabContainer | 'list' */
  role: PropTypes.string,
  /** @prop Determines if keyboard navigation should loop through list | true */
  shouldLoop: PropTypes.bool,
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
  itemRole: 'listitem',
  focusFirst: true,
  onSelect: null,
  role: 'list',
  shouldLoop: true,
  tabType: 'vertical',
  type: null,
  wrap: false,
};

List.displayName = 'List';

export default List;
