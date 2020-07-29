/** @component list-item */

import React from 'react';
import PropTypes from 'prop-types';
import omit from 'lodash/omit';
import uniqueId from 'lodash/uniqueId';
import qsa from 'dom-helpers/query/querySelectorAll';
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
      id: props.id || uniqueId('md-list-'),
      last: 0,
      listContext: {
        active: props.active,
        focus: (props.shouldFocusActive && props.active) || props.focus,
        role: props.itemRole,
        type: props.type,
        ariaConfig: props.ariaConfig
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
    const { active, focus, shouldFocusActive } = this.props;
    if (shouldFocusActive && (prevProps.focus !== focus || prevProps.active !== active)) {
      this.setActiveAndFocus(active, focus);
    }
    if (!this._needsRefocus || !this.listNode) return;

    if (listContext.focus && prevState.listContext.focus !== listContext.focus) {
      this.listNode.querySelector(`[data-md-event-key="${listContext.focus}"]`).focus();
    }
  }

  determineInitialFocus = () => {
    const { focusFirstQuery, shouldFocusInitial } = this.props;
    const { listContext } = this.state;
    const items = qsa(this.listNode, focusFirstQuery || `.md-list-item:not(.disabled):not(:disabled):not(.md-list-item--read-only)`);

    let focus = listContext.focus;
    if (items.length) {
      if (!focus) {
        focus = this.getNextFocusedChild(items, items[0], 0);
      }
      if (focus && shouldFocusInitial ) {
        this.listNode.querySelector(`[data-md-event-key="${focus}"]`).focus();
      }
    }
  }

  getIncludesFirstCharacter = (str, char) =>
  str
    .charAt(0)
    .toLowerCase()
    .includes(char);

  getNextFocusedChild(items, current, offset) {
    if (!this.listNode) return null;
    const { shouldLoop } = this.props;
    const { listContext } = this.state;

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

    listContext.focus !== this.getValue(items, getIndex(), 'event')
      && this.setState({
      listContext: {
        ...listContext,
        focus: this.getValue(items, getIndex(), 'event'),
      }
    });

    return this.getValue(items, getIndex(), 'event');
  }

  getValue = (arr, index, attribute) => (
    arr[index].attributes[`data-md-${attribute}-key`]
      && arr[index].attributes[`data-md-${attribute}-key`].value
  )

  getFocusableItems = () => {
    if (!this.listNode) return null;
    const { focusQuery } = this.props;

    const defaultItems = qsa(this.listNode, `.md-list-item:not(.disabled):not(:disabled):not(.md-list-item--read-only)`);
    const customItems = focusQuery && qsa(this.listNode, focusQuery) || [];

    return customItems.length
      ? customItems.filter(item => customItems.indexOf(item) >= 0)
      : defaultItems;
  }

  handleKeyDown = e => {
    const { shouldFocusActive, shouldPropagateKeyDown, navigationDirection} = this.props;
    const { focus } = this.state.listContext;
    let clickEvent;
    const tgt = e.currentTarget;
    const char = e.key;
    const items = this.getFocusableItems();
    const length = items.length && items.length - 1 || 0;
    const focusIdx = focus && items.indexOf(this.listNode.querySelector(`[data-md-event-key="${focus}"]`)) || 0;
    let flag = false;

    const isPrintableCharacter = str => {
      return str.length === 1 && str.match(/\S/);
    };

    switch (e.which) {
      case 9: // TAB
        if(shouldFocusActive) {
          this._needsRefocus = false;
          this.setFocusToActive();
        }
        break;
      case 32: // SPACE
      case 13: // ENTER
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

      case 38: // UP
        if (navigationDirection === 'both' || navigationDirection === 'vertical') {
          this.getNextFocusedChild(items, tgt, -1);
          this._needsRefocus = true;
          if(!shouldPropagateKeyDown) flag = true;
        }
        break;
      case 37: // LEFT
        if (navigationDirection === 'both' || navigationDirection === 'horizontal') {
          this.getNextFocusedChild(items, tgt, -1);
          this._needsRefocus = true;
          if(!shouldPropagateKeyDown) flag = true;
        }
        break;

      case 39: // RIGHT
        if (navigationDirection === 'both' || navigationDirection === 'horizontal') {
          this.getNextFocusedChild(items, tgt, 1);
          this._needsRefocus = true;
          if(!shouldPropagateKeyDown) flag = true;
        }
        break;
      case 40: // DOWN
        if (navigationDirection === 'both' || navigationDirection === 'vertical') {
          this.getNextFocusedChild(items, tgt, 1);
          this._needsRefocus = true;
          if(!shouldPropagateKeyDown) flag = true;
        }
        break;

      case 33: // PAGE UP
      case 36: // HOME
        this.setFocusToLimit('start', items, length);
        this._needsRefocus = true;
        flag = true;
        break;

      case 34: // PAGE DOWN
      case 35: // END
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
    const { onSelect, trackActive } = this.props;
    const { active } = this.state.listContext;
    const { eventKey, label, value } = opts;

    const items = this.getFocusableItems();
    const index = items.findIndex((item) => item.getAttribute('data-md-event-key') === eventKey || item.querySelector(`[data-md-event-key="${  eventKey  }"]`));

    // Don't do anything if index is the same or outside of the bounds
    if (
      eventKey === active ||
      index < 0 ||
      index > items.length - 1
    )
    return;

    this.setFocus(items, index);
  
    // Don't do anything if onSelect Event Handler is present
    if (onSelect) {
      return onSelect(e, {
        keyboardKey: this.getValue(items, index, 'keyboard'),
        eventKey: this.getValue(items, index, 'event'),
        label,
        value,
      });
    }

    // Keep reference to last index for event handler
    const last = active;
    // Call change event handler
    trackActive
      && this.setState(state => ({
        last,
        listContext: {
          ...state.listContext,
          active: this.getValue(items, index, 'event')
        }
      }));
  }

  setFocus = (items, index) => {
    this.setState(state => ({
      listContext: {
        ...state.listContext,
        focus: this.getValue(items, index, 'event'),
      }
    }));
  }

  setActiveAndFocus = (active, focus) => {
    this._needsRefocus = false;
      this.setState(state => ({
        listContext: {
          ...state.listContext,
          active: active,
          focus: (state.shouldFocusActive && active) || focus,
        }
      }));
  }

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

  setFocusToActive() {
    let focus = this.state.listContext.active;
    if (!focus) {
      const items = this.getFocusableItems();
      focus =  this.getValue(items, 0, 'event');
    }
    this.setState({
      listContext: {
        ...this.state.listContext,
        focus,
      }
    });
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
      'ariaConfig',
      'focusFirst',
      'focusFirstQuery',
      'focusQuery',
      'itemRole',
      'navigationDirection',
      'shouldPropagateKeyDown',
      'shouldFocusActive',
      'shouldFocusInitial',
      'shouldLoop',
      'trackActive',
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
              'md-list' +
              `${tabType && ` md-list--${tabType}` || ''}` +
              `${wrap && ` md-list--wrap` || ''}` +
              `${(className && ` ${className}`) || ''}`
            }
            role={role}
            aria-activedescendant={getActiveId()}
            ref={ref => this.listNode = ref}
            {...otherProps}
          >
            {children}
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
  /** @prop Optional parameter for accessibility configuration | null */
  ariaConfig: PropTypes.object,
  /** @prop Children nodes to render inside List | null */
  children: PropTypes.node,
  /** @prop Optional css class string | '' */
  className: PropTypes.string,
  /** @prop Optional focus prop to pass focus prop to children | null */
  focus: PropTypes.string,
  /** @prop Sets first List item to have focus within List context | true */
  focusFirst: PropTypes.bool,
  /** @prop Queries children to find matching item to have focus | '' */
  focusFirstQuery: PropTypes.string,
  /** @prop Additional elements that can be focused by selector | '' */
  focusQuery: PropTypes.string,
  /** @prop Optional ID value of List | null */
  id: PropTypes.string,
  /** @prop Optional tabType prop type to manually set child role | 'listitem' */
  itemRole: PropTypes.string,
  /** @prop Restricts the traversal of the list with either UP/DOWN, LEFT/RIGHT, or both | 'both' */
  navigationDirection: PropTypes.oneOf(['vertical', 'horizontal', 'both']),
  /** @prop Callback function invoked by user selecting an interactive item within List | null */
  onSelect: PropTypes.func,
  /** @prop Disables the stopPropagation() & preventDefault() for ArrowKey Events | false */  
  shouldPropagateKeyDown: PropTypes.bool,
  /** @prop Sets the ARIA role for the Nav, in the context of a TabContainer | 'list' */
  role: PropTypes.string,
  /** @prop Invokes dom focus method on mount | true */
  shouldFocusInitial: PropTypes.bool,
  /** @prop Determines if focus should revert to active on list exit | false */
  shouldFocusActive: PropTypes.bool,
  /** @prop Determines if keyboard navigation should loop through list | true */
  shouldLoop: PropTypes.bool,
  /** @prop Sets the orientation of the List | 'vertical' */
  tabType: PropTypes.oneOf(['vertical', 'horizontal']),
  /** @prop Determines if List wrapper should track active | true */
  trackActive: PropTypes.bool,
  /** @prop Sets List size | null */
  type: PropTypes.oneOf(['small', 'large', 'space', 'xlarge']),
  /** @prop Optional wrap prop type to wrap items to next row */
  wrap: PropTypes.bool
};

List.defaultProps = {
  active: null,
  ariaConfig: null,
  children: null,
  className: '',
  id: null,
  itemRole: 'listitem',
  focus: null,
  focusFirst: true,
  focusFirstQuery: '',
  focusQuery: '',
  navigationDirection: 'both',
  onSelect: null,
  shouldPropagateKeyDown: false,
  role: 'list',
  shouldFocusActive: false,
  shouldFocusInitial: true,
  shouldLoop: true,
  tabType: 'vertical',
  trackActive: true,
  type: null,
  wrap: false,
};

List.displayName = 'List';

export default List;