import React from 'react';
import PropTypes from 'prop-types';
import { omit, uniqueId } from 'lodash';
/**
 * List is container component used to help group list items.
 * @category containers
 * @component list-item
 * @variations collab-ui-react
 */

class List extends React.Component {

  static childContextTypes = {
    setSelected: PropTypes.func,
    handleListKeyDown: PropTypes.func
  };

  state = {
    activeIndex: null,
    focus: null,
    id: this.props.id || uniqueId('cui-list-'),
    last: 0,
  };

  getChildContext = () => {
    return {
      setSelected: (e, idx, value, label) => this.setSelected(e, idx, value, label),
      handleListKeyDown: (e, idx) => this.handleListKeyDown(e, idx)
    };
  }

  componentDidMount() {
    const { focusFirst } =  this.props;

    focusFirst
      && this.determineInitialFocus();
  }

  determineInitialFocus = () => {
    const nonDisabledIndex = React.Children
      .toArray(this.props.children)
      .reduceRight((agg, child, idx) => (
        (!child.props.disabled && !child.props.isReadOnly)
          ? idx
          : agg
      ), null);

    this.setFocus(nonDisabledIndex);
  }

  setSelected = (e, index, value, label) => {
    const { children, onSelect } = this.props;
    const { activeIndex } = this.state;

    this.setFocus(index);
    // Don't do anything if onSelect Event Handler is present
    if (onSelect) {
      return onSelect(e, value, index, label);
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

  getIncludesFirstCharacter = (str, char) =>
    str
      .charAt(0)
      .toLowerCase()
      .includes(char);

  setFocusByFirstCharacter = (char, currentIdx, length) => {
    const { children } = this.props;

    const newIndex = React.Children
      .toArray(children)
      .reduce((agg, child, idx, arr) => {

        const index = currentIdx + idx + 1 > length
          ? Math.abs(currentIdx + idx - length)
          : currentIdx + idx + 1;

        const label = arr[index].props.role === 'listItem' || arr[index].type.displayName === 'SelectOption'
          ? arr[index].props.label
          : arr[index].props.header;

        return (
          !agg.length
          && !arr[index].props.disabled
          && !arr[index].props.isReadOnly
          && !['ListSeparator'].includes(arr[index].type.displayName)
          && this.getIncludesFirstCharacter(label, char)
        )
          ? agg.concat(index)
          : agg;
      },
      []
    );

    !isNaN(newIndex[0]) && this.setFocus(newIndex[0]);
  };

  handleListKeyDown = (e, idx) => {
    const {children} = this.props;
    let newIndex, clickEvent;
    const tgt = e.currentTarget;
    const char = e.key;
    let flag = false;
    const length = React.Children.toArray(children).length - 1;

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
      const potentialTarget = React.Children.toArray(this.props.children)[possibleIndex];

      return (potentialTarget.props.disabled || potentialTarget.props.isReadOnly || potentialTarget.type.displayName === "ListSeparator")
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
    const {
      active,
      children,
      className,
      isMulti,
      itemRole,
      role,
      tabType,
      type,
      wrap,
      ...props
    } = this.props;
    const {
      activeIndex,
      focus,
      id
    } = this.state;
    const { visibleClass } = this.context;

    const otherProps = omit({...props}, ['focusFirst']);

    const setListItems = React.Children.map(children, (child, idx) => {
      const activeIndicator = (typeof active === 'number' || Array.isArray(active)) ? active : activeIndex;

      switch (child.type.displayName) {
        case 'ListItem':
        case 'ListItemMeeting':
          return React.cloneElement(child, {
            active: idx === activeIndicator,
            ...type && {type: type},
            focus: focus === idx,
            itemIndex: idx,
            role: itemRole,
            id: `${id}__list-item`,
            ...focus === idx && { ref: ref => this.activeChild = ref }
          });
        case 'SpaceListItem':
          return React.cloneElement(child, {
            active: idx === activeIndicator,
            focus: focus === idx,
            itemIndex: idx,
            role: itemRole,
            id: `${id}__sl-item`,
            ...focus === idx && { ref: ref => this.activeChild = ref }
          });
        case 'SpaceListMeeting':
          return React.cloneElement(child, {
            active: idx === activeIndicator,
            focus: focus === idx,
            itemIndex: idx,
            role: itemRole,
            id: `${id}__sl-item`,
            ...focus === idx && { ref: ref => this.activeChild = ref }
          });
        case 'SelectOption':
          return React.cloneElement(child, {
            active: Array.isArray(activeIndicator) ? activeIndicator.includes(idx) : idx === activeIndicator,
            focus: focus === idx,
            itemIndex: idx,
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
          'cui-list' +
          ` cui-list${tabType && `--${tabType}` || ''}` +
          ` cui-list${wrap && `--wrap` || ''}` +
          `${(visibleClass && ` ${visibleClass}`) || ''}` +
          `${(className && ` ${className}`) || ''}`
        }
        role={role}
        aria-activedescendant={ActiveDescendantId}
        {...otherProps}
      >
        {setListItems}
      </div>
    );
    /* eslint-enable*/
  }
}

List.propTypes = {
  /** @prop Optional active prop to pass active prop to children | null */
  active: PropTypes.oneOfType([
    PropTypes.number,
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
  /** @prop Optional prop to know if multiple children can be active | false */
  isMulti: PropTypes.bool,
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
  isMulti: false,
  itemRole: 'listItem',
  focusFirst: true,
  onSelect: null,
  role: 'list',
  tabType: 'vertical',
  type: null,
  wrap: false,
};

List.contextTypes = {
  visibleClass: PropTypes.string
};

List.displayName = 'List';

export default List;
