import React from 'react';
import PropTypes from 'prop-types';
import { isEqual } from 'lodash';
import { EventOverlay } from '@collab-ui/react';

/**
 * Menu is container component which contains MenuItems
 * @component Menu
 * @variations collab-ui-react
 */

export default class Menu extends React.Component {
  static displayName = 'Menu';
  
  static childContextTypes = {
    handleClick: PropTypes.func,
    handleKeyDown: PropTypes.func
  };

  state = {
    menuIndex: [],
  };

  getChildContext = () => {
    return {
      handleClick: (menuItemIndex, menuItem, e) => this.handleClick(menuItemIndex, menuItem, e),
      handleKeyDown: (menuItemIndex, menuItem, e) => this.handleKeyDown(menuItemIndex, menuItem, e),
    };
  };

  componentWillMount() {
    const { children } = this.props;
    this.setState({
      menuIndex: [this.getNewIndex(-1, 1, React.Children.toArray(children))],
    });
  }

  handleClick = (menuItemIndex, menuItem, e) => {
    const { onSelect } = this.context;
    const { children } = menuItem.props;

    this.setState({
      menuIndex: children ?
        menuItemIndex.concat(
          this.getNewIndex(-1, 1, React.Children.toArray(children))
        ) :
        [menuItemIndex[0]],
    }, () => onSelect && onSelect(e, menuItemIndex, menuItem));
  };

  getNewIndex = (currentIndex, change, siblings) => {
    const getPossibleIndex = () => {
      const length = siblings.length - 1;
      if (currentIndex + change < 0) {
        return length;
      } else if (currentIndex + change > length) {
        return 0;
      }

      return currentIndex + change;
    };

    const possibleIndex = getPossibleIndex();
    const potentialTarget = React.Children.toArray(siblings)[possibleIndex];

    return (potentialTarget.props.disabled || potentialTarget.props.isHeader)
      ? this.getNewIndex(possibleIndex, change, siblings)
      : possibleIndex;
  };

  setFocusInCurrentMenu = newIndex => {
    const { menuIndex } = this.state;
    const clonedIndex = [...menuIndex];
    clonedIndex[clonedIndex.length - 1] = newIndex;
    this.setState({
      menuIndex: clonedIndex,
    });
  };

  handleKeyDown = (selectedIndex, menuItem, e) => {

    const { menuIndex } = this.state;
    const { children } = this.props;
    const { onSelect } = this.context;

    const subMenu = menuItem.props.children;

    const getSiblings = (idx, menuItems = children) => {
      if(idx.length === 1) {
        return menuItems;
      }
      return getSiblings(idx.slice(1), React.Children.toArray(menuItems[idx[0]].props.children));
    };

    const getIncludesFirstCharacter = (str, char) =>
      str
      .charAt(0)
      .toLowerCase()
      .includes(char);

    const setFocusByFirstCharacter = (char, currentIdx) => {
      const siblings = getSiblings(currentIdx);
      const length = siblings.length - 1;
      const indexInSubmenu = currentIdx[currentIdx.length - 1]
      const newIndex = React.Children
        .toArray(siblings)
        .reduce((agg, child, idx, arr) => {

          const index = indexInSubmenu + idx + 1 > length
            ? Math.abs(indexInSubmenu + idx - length)
            : indexInSubmenu + idx + 1;

          const label = arr[index].props.label;
          return (
            !agg.length
            && !arr[index].props.disabled
            && !arr[index].props.isReadOnly
            && getIncludesFirstCharacter(label, char)
          )
            ? agg.concat(index)
            : agg;
          },
          []
      );

      !isNaN(newIndex[0]) && this.setFocusInCurrentMenu(newIndex[0]);
    };

    const isPrintableCharacter = str => {
      return str.length === 1 && str.match(/\S/);
    };
    let flag = false;
    const char = e.key;

    switch (e.which) {
      case 38:
        this.setFocusInCurrentMenu(
          this.getNewIndex(selectedIndex[selectedIndex.length - 1], -1, getSiblings(selectedIndex))
        );
        flag = true;
        break;

      case 40:
        this.setFocusInCurrentMenu(
          this.getNewIndex(selectedIndex[selectedIndex.length - 1], 1, getSiblings(selectedIndex))
        );
        flag = true;
        break;

      case 39: //right
        subMenu && this.setState({
          menuIndex: menuIndex.concat(this.getNewIndex(-1, 1, React.Children.toArray(subMenu))),
        }, () => onSelect && onSelect(e, menuIndex, menuItem));

        flag = true;
        break;

      case 37: //left
        (menuIndex.length - 1) && this.setState({
          menuIndex: menuIndex.slice(0, menuIndex.length - 1),
        });
        flag = true;
        break;

      default:
        if (isPrintableCharacter(char)) {
          setFocusByFirstCharacter(char, selectedIndex);
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
    const { children, className, ariaLabel } = this.props;
    const { menuIndex } = this.state;

    const setMenuItems = (menuList, currentItemIndex = []) => {
      return React.Children.toArray(menuList).map((child, idx) => {

        if(!child.type || child.type.displayName !== 'MenuItem') {
          throw new Error('children of Menu/MenuItem should be of type MenuItem');
        }

        const menuItemIndex = currentItemIndex.concat(idx);
        const menuItems = child.props.children;

        const focus = isEqual(menuIndex, menuItemIndex);
        const isOpen = isEqual(menuIndex.slice(0, menuItemIndex.length), menuItemIndex) &&
          menuIndex.length !== menuItemIndex.length;

        return React.cloneElement(child, {
          children: (
            menuItems
            && setMenuItems(React.Children.toArray(menuItems), menuItemIndex)
          ),
          index: menuItemIndex,
          focus,
          isOpen,
        });
      });
    };

    return (
      <div
        className={
          'cui-menu' +
          ' cui-menu-item-container' +
          `${(className && ` ${className}`) || ''}`
        }
        aria-label={ariaLabel}
        role="menubar"
      >
        {setMenuItems(children)}
      </div>
    );
  }
}

Menu.propTypes = {
  children: PropTypes.node,
  className: PropTypes.string,
  ariaLabel: PropTypes.string,
  content: PropTypes.element,
};

Menu.contextTypes = {
  onSelect: PropTypes.func,
};

Menu.defaultProps = {
  children: null,
  className: '',
  ariaLabel: '',
  content: null,
};
