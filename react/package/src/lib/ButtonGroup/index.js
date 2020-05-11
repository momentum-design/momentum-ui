/** @component button-group */

import React from 'react';
import PropTypes from 'prop-types';
import omit from 'lodash/omit';
import qsa from 'dom-helpers/query/querySelectorAll';
import { UIDReset } from 'react-uid';
import ButtonGroupContext from '../ButtonGroupContext';
import SelectableContext from '../SelectableContext';

class ButtonGroup extends React.Component {
  static getDerivedStateFromProps({ active }, state) {
    return (
      active
        ? {
          ...state,
          bgContext: {
            ...state.bgContext,
            active
          }
        }
        : state
    );
  }

  constructor(props) {
    super(props);

    this.state = {
      bgContext : {
        active: props.type === 'pill' ? false : props.highlightSelected && props.active,
        focus: props.active || null,
        isButtonGroup: true,
        ...props.pillWidth && {width: props.pillWidth},
      },
      selectContext: {
        parentOnSelect: this.handleSelect,
        parentKeyDown: this.handleKeyDown,
      }
    };
  }

  componentDidMount() {
    this.containerNode
      && this.determineInitialFocus();
  }

  componentDidUpdate(prevProps, prevState) {
    const { bgContext } = this.state;
    const { active } = this.props;
    if ((prevProps.active !== active)) {
      this.setActiveAndFocus(active, focus);
    }
    if (!this._needsRefocus || !this.containerNode) return;

    if (bgContext.focus && prevState.bgContext.focus !== bgContext.focus) {
      this.containerNode.querySelector(`[data-md-event-key="${bgContext.focus}"]`).focus();
    }
  }

  determineInitialFocus = () => {
    const { bgContext } = this.state;
    const { focusFirstQuery, focusOnLoad } = this.props;
    const items = qsa(this.containerNode, focusFirstQuery || `.md-button:not(.disabled):not(:disabled)`);

    let focus = bgContext.focus;
    if (items.length) {
      if (!focus) {
        focus = this.getNextFocusedChild(items, items[0], 0);
      }
      if (focus && focusOnLoad) {
        this.containerNode.querySelector(`[data-md-event-key="${focus}"]`).focus();
      }
    }
  }

  handleSelect = (e, opts) => {
    const { highlightSelected, onSelect, type } = this.props;
    const { active } = this.state.bgContext;
    const { eventKey } = opts;

    const items = this.getFocusableItems();
    const index = items.indexOf(this.containerNode.querySelector(`[data-md-event-key="${eventKey}"]`));

    this.setFocus(items, index);
    // Don't do anything if onSelect Event Handler is present
    if (onSelect) {
      return onSelect(e, {
        eventKey: this.getValue(items, index, 'event')
      });
    }
    // Don't do anything if index is the same or outside of the bounds
    if (
      eventKey === active ||
      index < 0 ||
      index > items.length - 1
    )
    return;

    // Call change event handler
    this.setState(state => ({
      bgContext: {
        ...state.bgContext,
        active: type === 'pill' ? false : highlightSelected && this.getValue(items, index, 'event')
      }
    }));
  }

  getNextFocusedChild(items, current, offset) {
    if (!this.containerNode) return null;
    const { bgContext } = this.state;

    const possibleIndex = items.indexOf(current) + offset;

    const getIndex = () => {
      if (possibleIndex < 0) {
        return items.length - 1;
      } else if (possibleIndex > items.length - 1) {
        return 0;
      } else return possibleIndex;
    };

    bgContext.focus !== this.getValue(items, getIndex(), 'event')
      && this.setState({
      bgContext: {
        ...bgContext,
        focus: this.getValue(items, getIndex(), 'event'),
      }
    });

    return this.getValue(items, getIndex(), 'event');
  }

  getValue = (arr, index, attribute) => (
    arr[index].attributes[`data-md-${attribute}-key`]
      && arr[index].attributes[`data-md-${attribute}-key`].value
  )

  getIncludesFirstCharacter = (str, char) =>
    str
      .charAt(0)
      .toLowerCase()
      .includes(char);

  setFocus = (items, index) => {
    this.setState(state => ({
      bgContext: {
        ...state.bgContext,
        focus: this.getValue(items, index, 'event'),
      }
    }));
  }

  setActiveAndFocus = (active, focus) => {
    const { type, highlightSelected } = this.props;
    this._needsRefocus = false;
      this.setState(state => ({
        bgContext: {
          ...state.bgContext,
          active: type === 'pill' ? false : highlightSelected && active,
          focus: active || focus,
        }
      }));
  }

  setFocusByFirstCharacter = (char, focusIdx, items, length) => {
    const { bgContext } = this.state;

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
    && bgContext.focus !== newIndex[0]
    && this.setState(state => ({
      bgContext: {
        ...state.bgContext,
        focus: newIndex[0],
      }
    }));
  }

  getFocusableItems = () => {
    if (!this.containerNode) return null;
    const { focusQuery } = this.props;

    const defaultItems = qsa(this.containerNode, `.md-button:not(.disabled):not(:disabled)`);
    const customItems = focusQuery && qsa(this.containerNode, focusQuery) || [];

    return customItems.length
      ? customItems.filter(item => customItems.indexOf(item) >= 0)
      : defaultItems;
  }

  handleKeyDown = e => {
    const { focus } = this.state.bgContext;
    let flag = false;
    const tgt = e.currentTarget;
    const char = e.key;
    const items = this.getFocusableItems();
    const focusIdx = focus && items.indexOf(this.containerNode.querySelector(`[data-md-event-key="${focus}"]`)) || 0;
    const length = items.length && items.length - 1 || 0;


    const isPrintableCharacter = str => {
      return str.length === 1 && str.match(/\S/);
    };

    switch (e.which) {
      case 38:
      case 37:
        this.getNextFocusedChild(items, tgt, -1);
        this._needsRefocus = true;
        flag = true;
        break;

      case 39:
      case 40:
        this.getNextFocusedChild(items, tgt, 1);
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
      ariaLabel,
      children,
      className,
      justified,
      theme,
      type,
      ...props
     } = this.props;
    const { bgContext, selectContext } = this.state;

    const otherProps = omit({...props}, [
      'active',
      'focusOnLoad',
      'focusFirstQuery',
      'focusQuery',
      'highlightSelected',
      'onSelect',
      'pillWidth',
    ]);

    return (
      <SelectableContext.Provider value={selectContext}>
        <div
          aria-label={ariaLabel}
          className={
            'md-button-group' +
            `${(theme && ` md-button-group--${theme}`) || ''}` +
            `${(justified && ` md-button-group--justified`) || ''}` +
            `${(type && ` md-button-group--${type}` || '')}` +
            `${(className && ` ${className}`) || ''}`
          }
          role="group"
          ref={ref => this.containerNode = ref}
          {...otherProps}
        >
          <UIDReset>
            <ButtonGroupContext.Provider value={bgContext}>
              {children}
            </ButtonGroupContext.Provider>
          </UIDReset>
        </div>
      </SelectableContext.Provider>
    );
  }
}

ButtonGroup.propTypes = {
  /** @prop Sets initial active Button by index | null */
  active: PropTypes.string,
  /** @prop Text to display for blindness accessibility features | '' */
  ariaLabel: PropTypes.string,
  /** @prop Children nodes to render inside ButtonGroup | null */
  children: PropTypes.node,
  /** @prop Optional css class string | '' */
  className: PropTypes.string,
  /** @prop Set focus to ButtonGroup when page is loaded | false */
  focusOnLoad: PropTypes.bool,
  /** @prop Queries children to find matching item to have focus | '' */
  focusFirstQuery: PropTypes.string,
  /** @prop Additional elements that can be focused by selector | '' */
  focusQuery: PropTypes.string,
  /** @prop Highlights the selected button within group | true */
  highlightSelected: PropTypes.bool,
  /** @prop Optional text-justified css styling | true */
  justified: PropTypes.bool,
  /** @prop Handler to be called when the user selects ButtonGroup | null */
  onSelect: PropTypes.func,
  /** @prop Sets width of a pill Button | '60px' */
  pillWidth: PropTypes.string,
  /** @prop Optional Button color theme for ButtonGroup | '' */
  theme: PropTypes.oneOf(['', 'dark']),
  /** @prop Optional Button type for ButtonGroup | '' */
  type: PropTypes.oneOf(['', 'pill']),
};

ButtonGroup.defaultProps = {
  active: '',
  ariaLabel: '',
  children: null,
  className: '',
  focusOnLoad: false,
  focusFirstQuery: '',
  focusQuery: '',
  highlightSelected: true,
  justified: true,
  onSelect: null,
  pillWidth: '60px',
  theme: '',
  type:'',
};

ButtonGroup.displayName = 'ButtonGroup';

export default ButtonGroup;
