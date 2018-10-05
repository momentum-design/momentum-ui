import React from 'react';
import PropTypes from 'prop-types';
import { isEqual } from 'lodash';

/**
 * Menu is container component which contains MenuItems
 * @component Menu
 * @variations collab-ui-react
 */

export default class Menu extends React.Component {

  state = {
    menuIndex: []
  };

  getChildContext = () => {
    return {
      handleClick: this.handleClick,
      handleKeyDown: this.handleKeyDown,
    };
  };

  componentWillMount() {
    const { children } = this.props;
    const initialIndex = this.getNewIndex(-1, 1, React.Children.toArray(children));

    this.setState({
      menuIndex: [initialIndex]
    });
  }

  handleClick = (e, menuItemIndex, menuItem) => {
    const { onSelect } = this.context;
    const { children } = menuItem.props;
    const selectedChildIndex =
      children && this.getNewIndex(-1, 1, React.Children.toArray(children));

    this.setState(
      {
        menuIndex: children
          ? menuItemIndex.concat(selectedChildIndex)
          : [menuItemIndex[0]]
      },
      () => onSelect && onSelect(e, menuItemIndex, menuItem)
    );
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

    return potentialTarget.props.disabled || potentialTarget.props.isHeader
      ? this.getNewIndex(possibleIndex, change, siblings)
      : possibleIndex;
  };

  setFocusInCurrentMenu = newIndex => {
    const { menuIndex } = this.state;
    const clonedIndex = !menuIndex.length
      ? [...newIndex]
      : [...menuIndex.slice(0, menuIndex.length - 1), newIndex];

    this.setState({
      menuIndex: clonedIndex
    });
  };

  handleKeyDown = (e, selectedIndex, menuItem) => {
    const { menuIndex } = this.state;
    const { children } = this.props;
    const { onSelect } = this.context;

    const subMenu = menuItem.props.children;
    const subMenuIndex = subMenu && this.getNewIndex(-1, 1, React.Children.toArray(subMenu));
    const originIndex = selectedIndex[selectedIndex.length - 1];

    const getSiblings = (idx, menuItems = children) => {
      if (idx.length === 1) {
        return menuItems;
      }
      return getSiblings(
        idx.slice(1),
        React.Children.toArray(menuItems[idx[0]].props.children)
      );
    };

    const getIncludesFirstCharacter = (str, char) =>
      str
        .charAt(0)
        .toLowerCase()
        .includes(char);

    const setFocusByFirstCharacter = (char, currentIdx) => {
      const siblings = getSiblings(currentIdx);
      const length = siblings.length - 1;
      const indexInSubmenu = currentIdx[currentIdx.length - 1];

      const newIndex = React.Children.toArray(siblings).reduce(
        (agg, child, idx, arr) => {
          const index =
            indexInSubmenu + idx + 1 > length
              ? Math.abs(indexInSubmenu + idx - length)
              : indexInSubmenu + idx + 1;

          const label = arr[index].props.label;

          return !agg.length
            && !arr[index].props.disabled
            && !arr[index].props.isReadOnly
            && getIncludesFirstCharacter(label, char)
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
          this.getNewIndex(
            originIndex,
            -1,
            getSiblings(selectedIndex)
          )
        );
        flag = true;
        break;

      case 40:
        this.setFocusInCurrentMenu(
          this.getNewIndex(
            originIndex,
            1,
            getSiblings(selectedIndex)
          )
        );
        flag = true;
        break;

      case 39: //right
        subMenu &&
          this.setState(
            {
              menuIndex: menuIndex.concat(subMenuIndex)
            },
            () => onSelect && onSelect(e, menuIndex, menuItem)
          );

        flag = true;
        break;

      case 37: //left
        menuIndex.length - 1 &&
          this.setState({
            menuIndex: menuIndex.slice(0, menuIndex.length - 1)
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
    const {
      ariaLabel,
      children,
      className,
      ...props
    } = this.props;
    const { menuIndex } = this.state;

    const setMenuItems = (menuList, currentItemIndex = []) => {
      return React.Children.toArray(menuList).map((child, idx) => {
        if (
          !child.type
            ||
          !['MenuItem', 'SubMenu'].includes(child.type.displayName)
        ) {
          throw new Error(
            '[@collab-ui/react] Menu: children of Menu should be of type MenuItem or SubMenu'
          );
        }

        const menuItemIndex = currentItemIndex.concat(idx);
        const menuItems = child.props.children;

        const focus = isEqual(menuIndex, menuItemIndex);
        const isOpen = isEqual(menuIndex.slice(0, menuItemIndex.length), menuItemIndex)
          && menuIndex.length !== menuItemIndex.length;

        return React.cloneElement(child, {
          index: menuItemIndex,
          focus,
          isOpen,
          ...child.type.displayName === 'SubMenu' && {
            children: menuItems && setMenuItems(React.Children.toArray(menuItems), menuItemIndex),
          },
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
        {...props}
      >
        {setMenuItems(children)}
      </div>
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
};

Menu.defaultProps = {
  ariaLabel: '',
  children: null,
  className: '',
};

Menu.contextTypes = {
  onSelect: PropTypes.func,
};

Menu.childContextTypes = {
  handleClick: PropTypes.func,
  handleKeyDown: PropTypes.func
};

Menu.displayName = 'Menu';
