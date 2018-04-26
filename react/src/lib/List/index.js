import React from 'react';
import PropTypes from 'prop-types';
import _ from 'lodash';
/**
 * List is container component used to help group list items.
 * @category containers
 * @component list-item
 * @variations collab-ui-react
 */

export default class List extends React.Component {
  static displayName = 'List';

  state = {
    activeIndex: null,
    last: 0,
    focus: 0,
    id: this.props.id || _.uniqueId('cui-list-'),
  };

  componentDidMount() {
    this.determineInitialFocus();
  }

  determineInitialFocus = () => {
    const nonDisabledIndex = React.Children.toArray(this.props.children).reduceRight((agg, child, idx) => {
      return !child.props.disabled
        ? idx
        : agg;
    }, null);

    this.setFocus(nonDisabledIndex);
  }

  setSelected = (e, index, value) => {
    const { children, onSelect } = this.props;
    const { activeIndex } = this.state;
    // Don't do anything if onSelect Event Handler is present
    if (onSelect) {
      return onSelect(e, value, index);
    }
    // Don't do anything if index is the same or outside of the bounds
    if (
      index === activeIndex ||
      index < 0 ||
      index >= children.length
    )
    return;

    // Keep reference to last index for event handler
    const last = activeIndex;

    // Call change event handler
    this.setState({ activeIndex: index, last });
  };

  setFocus = index => {
    this.setState({ focus: index });
  };

  handleClick = (e, index, disabled, value) => {
    if(disabled) {
      e.preventDefault();
      e.stopPropagation();
    }

    this.setFocus(index);
    this.setSelected(e, index, value);
  };

  getIncludesFirstCharacter = (str, char) =>
    str
      .charAt(0)
      .toLowerCase()
      .includes(char);

  setFocusByFirstCharacter = (char, currentIdx, length) => {
    const { children } = this.props;

    const newIndex = React.Children.toArray(children).reduce(
      (agg, child, idx, arr) => {
        const index = currentIdx + idx + 1 > length
          ? Math.abs(currentIdx + idx - length)
          : currentIdx + idx + 1;
        const label =
          arr[index].props.role === 'listItem' || arr[index].props.role === 'option'
            ? arr[index].props.label
            : arr[index].props.header;

        return !agg.length && !arr[index].props.disabled && this.getIncludesFirstCharacter(label, char)
          ? agg.concat(index)
          : agg;
      },
      []
    );

    !isNaN(newIndex[0]) && this.setFocus(newIndex[0]);
  };

  handleListKeyPress = (e, idx, length, disabled) => {
    if(disabled) {
      e.preventDefault();
      e.stopPropagation();
    }

    let newIndex, clickEvent;
    const tgt = e.currentTarget;
    const char = e.key;
    let flag = false;

    const getNewIndex = (currentIndex, change) => {
      const getPossibleIndex = () => {
        if (currentIndex + change < 0) {
          return length;
        } else if (currentIndex + change > length) {
          return 0;
        }

        return currentIndex + change;
      };
      const possibleIndex = getPossibleIndex();
      return React.Children.toArray(this.props.children)[possibleIndex].props.disabled
        ? getNewIndex(possibleIndex, change)
        : possibleIndex;
    };

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
        newIndex = getNewIndex(idx, -1);
        this.setFocus(newIndex);
        flag = true;
        break;

      case 39:
      case 40:
        newIndex = getNewIndex(idx, 1);
        this.setFocus(newIndex);
        flag = true;
        break;

      case 33:
      case 36:
        this.setFocus(0);
        flag = true;
        break;

      case 34:
      case 35:
        this.setFocus(length);
        flag = true;
        break;
      default:
        if (isPrintableCharacter(char)) {
          this.setFocusByFirstCharacter(char, idx, length);
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
    const { children, tabType, role, className, type, itemRole, isMulti, active, ...props } = this.props;
    const { focus, activeIndex, id } = this.state;
    const { visibleClass } = this.context;

    const setListItems = React.Children.map(children, (child, idx) => {
      const arrLength = children.length - 1;
      const disabled = child.props.disabled;
      const value = child.props.value;
      const activeIndicator = (!isNaN(active) || Array.isArray(active)) ? active : activeIndex;

      switch (child.type.displayName) {
        case 'ListItem':
          return React.cloneElement(child, {
            active: idx === activeIndicator,
            type: type,
            focus: focus === idx,
            onClick: e => this.handleClick(e, idx, disabled, value),
            onKeyDown: e => this.handleListKeyPress(e, idx, arrLength, disabled),
            tabType: tabType,
            role: itemRole,
            id: `${id}__list-item`,
            ...focus === idx && { ref: ref => this.activeChild = ref }
          });
        case 'SpaceListItem':
          return React.cloneElement(child, {
            active: idx === activeIndicator,
            focus: focus === idx,
            onClick: e => this.handleClick(e, idx, disabled, value),
            onKeyDown: e => this.handleListKeyPress(e, idx, arrLength, disabled),
            tabType: tabType,
            role: itemRole,
            id: `${id}__sl-item`,
            ...focus === idx && { ref: ref => this.activeChild = ref }
          });
        case 'SelectOption':
          return React.cloneElement(child, {
            active: Array.isArray(activeIndicator) ? activeIndicator.includes(idx) : idx === activeIndicator,
            focus: focus === idx,
            onClick: e => this.handleClick(e, idx, disabled, value),
            onKeyDown: e => this.handleListKeyPress(e, idx, arrLength, disabled),
            tabType: tabType,
            role: itemRole,
            isMulti: isMulti,
            id: `${id}__so-item`,
            ...focus === idx && { ref: ref => this.activeChild = ref }
          });
        default:
          return child;
      }
    });

    const ActiveDescendantId = this.activeChild && this.activeChild.id;

    /* eslint-disable jsx-a11y/aria-activedescendant-has-tabindex */
    return (
      <div
        className={
          `cui-list${tabType && `--${tabType}` || ''}` +
          `${(visibleClass && ` ${visibleClass}`) || ''}` +
          `${(className && ` ${className}`) || ''}`
        }
        role={role}
        aria-activedescendant={ActiveDescendantId}
        {...props}
      >
        {setListItems}
      </div>
    );
    /* eslint-enable*/
  }
}

List.contextTypes = {
  /** optional visible class prop type */
  visibleClass: PropTypes.string
};

List.propTypes = {
  /** optional active prop to pass active prop to children */
  active: PropTypes.oneOfType([
    PropTypes.number,
    PropTypes.array
  ]),
  /** optional children prop type */
  children: PropTypes.node,
  /** optional className prop type */
  className: PropTypes.string,
  /** optional id prop */
  id: PropTypes.string,
  /** optional prop to know if multiple children can be active */
  isMulti: PropTypes.bool,
  /** optional tabType prop type to manually set child role */
  itemRole: PropTypes.string,
  /** optional onSelect prop type */
  onSelect: PropTypes.func,
  /** ListItem Size */
  type: PropTypes.oneOf(['small', 'large', 'space', 'xlarge']),
  /** optional tabType prop type defaults to horizontal */
  tabType: PropTypes.oneOf(['', 'horizontal']),
  /**
   * ARIA role for the Nav, in the context of a TabContainer, the default will
   * be set to "listItem", but can be overridden by the Nav when set explicitly.
   *
   * When the role is set to "listItem"
   */
  role: PropTypes.string
};

List.defaultProps = {
  active: null,
  children: null,
  className: '',
  id: null,
  isMulti: false,
  itemRole: 'listItem',
  onSelect: null,
  role: 'list',
  type: null,
  tabType: ''
};
