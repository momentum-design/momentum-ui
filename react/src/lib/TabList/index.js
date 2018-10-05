import React from 'react';
import PropTypes from 'prop-types';

/**
 * Tab is supplemental, non-clickable component used to help bring attention to an item or object.
 * @param props
 * @returns {XML}
 * @constructor
 */
class TabList extends React.Component {

  componentDidMount() {
    this.determineInitialFocus();
  }

  determineInitialFocus = () => {
    const { children } = this.props;
    const { focus } = this.context;
    const childrenList = React.Children.toArray(children);

    if (focus > childrenList.length - 1 || focus < 0) {
      throw new Error(`focusIndex ${focus} is out of bound.`);
    }

    const focusIndex = !childrenList[focus].props.disabled ? focus : null;

    this.setFocus(focusIndex);
    this.context.onActivate(focusIndex);
  };

  setFocus = index => {
    // Update state with selected index
    return this.context.onFocus(index);
  };

  handleClick = (event, index, disabled) => {
    if(disabled) {
      event.preventDefault();
      event.stopPropagation();
    }
    this.setFocus(index);
    return this.context.onActivate(index);
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
        const index =
          currentIdx + idx + 1 > length
            ? Math.abs(currentIdx + idx - length)
            : currentIdx + idx + 1;
        const label =
          arr[index].props.role === 'menuItem'
            ? arr[index].props.label
            : arr[index].props.heading;

        return !agg.length && !arr[index].props.disabled && this.getIncludesFirstCharacter(label, char)
          ? agg.concat(index)
          : agg;
      },
      []
    );

    this.setFocus(newIndex[0]);
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
        // console.log('leftarrow');
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
    const { children, role } = this.props;
    const { activeIndex, focus } = this.context;

    const setTabs = () =>
      React.Children.map(children, (child, idx) => {
        let arrLength = children.length - 1;
        const disabled = child.props.disabled;
        return React.cloneElement(child, {
          active: activeIndex === idx,
          focus: focus === idx,
          onPress: (e) => this.handleClick(e, idx, disabled),
          onKeyDown: e => this.handleListKeyPress(e, idx, arrLength, disabled),
          refName: 'navLink',
        });
      });

    return (
      <ul
        className='cui-tab__list'
        role={role}
        >
        {setTabs()}
      </ul>
    );
  }
}

TabList.propTypes = {
  /** @prop Children nodes to render inside TabList | null */
  children: PropTypes.node,
  /**
   * @prop ARIA role for the Nav, in the context of a TabContainer, the default will
   * be set to "tablist", but can be overridden by the Nav when set explicitly.
   *
   * When the role is set to "tablist" NavItem focus is managed according to
   * the ARIA authoring practices for tabs:
   * https://www.w3.org/TR/2013/WD-wai-aria-practices-20130307/#tabpanel | 'TabList'
   */
  role: PropTypes.string
};

TabList.defaultProps = {
  children: null,
  role: 'tablist'
};

TabList.contextTypes = {
  onFocus: PropTypes.func,
  focus: PropTypes.number,
  activeIndex: PropTypes.number,
  onActivate: PropTypes.func,
};

TabList.displayName = 'TabList';

export default TabList;