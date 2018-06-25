import React from 'react';
import PropTypes from 'prop-types';
import { clone, take, isEqual, set, dropRight, concat, last, tail } from 'lodash';

/**
 * Menu is container component which contains MenuItems
 * @category containers
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
  }

  componentWillMount() {
    const { children } = this.props;
    this.setState({
      menuIndex: [this.getNewIndex(-1, 1, React.Children.toArray(children))],
    });
  }

  handleClick = (menuItemIndex, menuItem, e) => {
    const { onSelect } = this.props;
    if(onSelect) {
      onSelect(e, menuItemIndex, menuItem);
    }
    this.setState({
      menuIndex: menuItem.props.subMenu ?
        concat(menuItemIndex, this.getNewIndex(-1, 1, menuItem.props.subMenu)) : [menuItemIndex[0]],
    });
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

  handleKeyDown = (idx, menuItem, e) => {

    const { menuIndex } = this.state;
    const { subMenu } = menuItem.props;
    const { children, onSelect } = this.props;

    const getSiblings = (idx, menuItems = children) => {
      if(idx.length === 1) {
        return menuItems;
      }
      return getSiblings(tail(idx), menuItems[idx[0]].props.subMenu);
    };

    let clickEvent;
    const tgt = e.currentTarget;
    let flag = false;
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
        this.setState({
          menuIndex:
            set(clone(menuIndex), menuIndex.length - 1, this.getNewIndex(last(idx), -1, getSiblings(idx))),
        });
        flag = true;
        break;

      case 40:
        this.setState({
          menuIndex:
            set(clone(menuIndex), menuIndex.length - 1, this.getNewIndex(last(idx), 1, getSiblings(idx))),
        });
        flag = true;
        break;

      case 39: //right
        subMenu && this.setState({
          menuIndex: concat(menuIndex, this.getNewIndex(-1, 1, subMenu)),
        }, () => onSelect && onSelect(e, menuIndex, menuItem));

        flag = true;
        break;

      case 37: //left
        (menuIndex.length - 1) && this.setState({
          menuIndex: dropRight(menuIndex),
        });
        flag = true;
        break;

      default:
        break;
    }

    if (flag) {
      e.stopPropagation();
      e.preventDefault();
    }
  };

  render() {
    const { children, className, ariaLabel } = this.props;
    const setMenuItems = (menuList, currentItemIndex = []) => {
      const menuItems = React.Children.toArray(menuList).map((child, idx) => {
        if(child.type.displayName !== 'MenuItem') {
          throw new Error('child elements and subMenu items should be MenuItem');
        }
        const menuItemIndex = currentItemIndex.concat(idx);
        const { subMenu } = child.props;
        const { menuIndex } = this.state;

        const focus = isEqual(menuIndex, menuItemIndex);
        const isOpen = isEqual(take(menuIndex, menuItemIndex.length), menuItemIndex) &&
            menuIndex.length !== menuItemIndex.length;

        return React.cloneElement(child, {
          subMenu: subMenu && setMenuItems(subMenu, menuItemIndex),
          index: menuItemIndex,
          focus,
          isOpen,
        });
      });
      return menuItems;
    };

    return (
      <div
        className={
          'cui-menu' +
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
  onSelect: PropTypes.func,
  ariaLabel: PropTypes.string,
};

Menu.defaultProps = {
  children: null,
  className: '',
  onSelect: null,
  ariaLabel: '',
};

/**
* @name Menu with Popover
*
* @category containers
* @component menu
* @section default
*
* @js
*
import { MenuItem, Button, Popover } from '@collab-ui/react';

export default class MenuDefault extends React.PureComponent {
  render() {
    const submenu1 = [
      <MenuItem key="0" isHeader>Set Do Not Disturb:</MenuItem>,
      <MenuItem key="1" disabled>1 hour</MenuItem>,
      <MenuItem key="2">5 hour</MenuItem>,
      <MenuItem key="3">8 hour</MenuItem>
    ];
    const submenu2 = [<MenuItem key="0">English</MenuItem>, <MenuItem key="1">Spanish</MenuItem>];
    const popoverContent = (
      <Menu>
        <MenuItem
          key="0"
          selectedValue="Out of office until 2:00pm"
          subMenu={submenu1}
        >
          Status
        </MenuItem>
        <MenuItem
          key="1"
          subMenu={submenu2}
          selectedValue="English"
        >
          Language
        </MenuItem>
        <MenuItem key="2">
          Settings
        </MenuItem>
      </Menu>
    );
    return(
      <Popover content={popoverContent} popoverTrigger="Click" direction="bottom-center">
        <Button>Show Menu</Button>
      </Popover>
    );
  }
}
**/

/**
* @name Customized menu with EventOverlay
*
* @category containers
* @component menu
* @section custom-menu
*
* @js
*
 import { MenuItem, Button, EventOverlay } from '@collab-ui/react';

 export default class CustomMenu extends React.PureComponent {
  state = {
    isOpen: false
  };

  onSelect = (e, idx, menuItem) => {
    if(menuItem.props.shouldCloseMenu) {
      this.setState({ isOpen: false });
    }
  };

  render() {
    const { isOpen } = this.state;
    const submenu1 = [
      <MenuItem key="0" isHeader>Set Do Not Disturb:</MenuItem>,
      <MenuItem key="1" disabled>1 hour</MenuItem>,
      <MenuItem key="2">5 hour</MenuItem>,
      <MenuItem key="3">8 hour</MenuItem>
    ];
    const submenu2 = [<MenuItem key="0" shouldCloseMenu>English</MenuItem>, <MenuItem key="1" shouldCloseMenu>Spanish</MenuItem>];
    const popoverContent = (
      <Menu onSelect={this.onSelect}>
        <MenuItem key="0" subMenu={submenu1}>
          Status
        </MenuItem>
        <MenuItem key="1" subMenu={submenu2}>
          Language
        </MenuItem>
        <MenuItem key="2" shouldCloseMenu>
          Settings
        </MenuItem>
      </Menu>
    );
    return(
      <div>
        <Button
          onClick={() => this.setState({ isOpen: !this.state.isOpen})}
          ref={ref => this.anchor = ref}
        >
          Show Menu
        </Button>
        <EventOverlay
          allowClickAway
          isOpen={isOpen}
          showArrow
          close={(e) => this.setState({ isOpen: false })}
          anchorNode={this.anchor}
        >
          {popoverContent}
        </EventOverlay>
        <br></br>
        <br></br>
        <br></br>
        <br></br>
      </div>
    );
  }
}
 **/
