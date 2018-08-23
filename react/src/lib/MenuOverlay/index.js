import React from 'react';
import PropTypes from 'prop-types';
import { omit } from 'lodash';
import { EventOverlay } from '@collab-ui/react';

/**
 * @category containers
 * @component menu-overlay
 * @variations collab-ui-react
 */

class MenuOverlay extends React.Component {
  static displayName = 'MenuOverlay';

  static childContextTypes = {
    onSelect: PropTypes.func,
  };

  state = {
    isOpen: false,
  };

  getChildContext = () => {
    return {
      onSelect: this.onSelect,
    };
  };

  componentWillMount () {
    this.verifyChildren();
  }

  verifyChildren = () => {
    const { children } = this.props;
    const status = React.Children.toArray(children).reduce((status, child) => {
      return (
        status
        && child.type
        && (child.type.displayName === 'MenuContent'
          || child.type.displayName === 'Menu')
      );
    }, true);

    if(!status) {
      throw new Error('MenuOverlay should only contain Menu or MenuContent as children');
    }
  };

  onSelect = (e, menuIndex, menuItem) => {
    const { onSelect } = this.props;
    const { keepMenuOpen } = menuItem.props;

    onSelect && onSelect(e, menuIndex, menuItem);
    menuItem.constructor.displayName !== 'SubMenu' && !keepMenuOpen && this.handleClose();
  };

  handleClose = () => {
    this.setState({ isOpen: false });
  };

  render() {
    const {
      children,
      className,
      menuTrigger,
      showArrow,
      ...props
    } = this.props;

    const { isOpen } = this.state;

    const otherProps = omit({...props}, ['onSelect']);

    const setMenuTrigger = () => React.cloneElement(menuTrigger, {
      onClick: () => this.setState({ isOpen: !isOpen }),
      ref: ref => this.anchorNode = ref,
    });

    return (
      <div
        className={
          'cui-menu-overlay-wrapper' +
          `${(className && ` ${className}`) || ''}`
        }
      >
        {setMenuTrigger()}
        <EventOverlay
          allowClickAway
          anchorNode={this.anchorNode}
          className='cui-menu-overlay'
          close={this.handleClose}
          isOpen={isOpen}
          showArrow={showArrow}
          {...otherProps}
        >
          {children}
        </EventOverlay>
      </div>
    );
  }
}

MenuOverlay.propTypes = {
  children: PropTypes.node,
  className: PropTypes.string,
  menuTrigger: PropTypes.element.isRequired,
  onSelect: PropTypes.func,
  showArrow: PropTypes.bool,
};

MenuOverlay.defaultProps = {
  children: null,
  className: '',
  onSelect: null,
  showArrow: true,
};

export default MenuOverlay;

/**
* @name Menu Overlay
*
* @category containers
* @component menu-overlay
* @section default
*
* @js
*

import {
  Button,
  EditableTextfield,
  Icon,
  ListItemSection,
  Menu,
  MenuContent,
  MenuItem,
  SubMenu
} from '@collab-ui/react';

export default class MenuOverlayDefault extends React.PureComponent {
  onClick(event, value) {
    alert(`${value} clicked`);
  }

  render() {
    return(
      <div className='row'>

        <div className="docs-example docs-example--spacing">
          <MenuOverlay
            menuTrigger={
              <Button ariaLabel='Show Menu'>Show Menu</Button>
            }
          >
            <MenuContent>
              <EditableTextfield inputText='Content Area'/>
            </MenuContent>
            <Menu>
              <SubMenu
                selectedValue="Out of office until 2:00pm"
                label="Status"
              >
                <MenuItem isHeader label="Set Do Not Disturb:"/>
                <MenuItem disabled label="1 hour" onClick={this.onClick} value="1 hour"/>
                <MenuItem keepMenuOpen label="5 hour" onClick={this.onClick} value="5 hour"/>
                <MenuItem keepMenuOpen label="8 hour"/>
              </SubMenu>
              <SubMenu
                selectedValue="English"
                label="Language"
              >
                <MenuItem label="English"/>
                <MenuItem label="Spanish"/>
              </SubMenu>
              <MenuItem
                label="Settings"
              />
            </Menu>
          </MenuOverlay>
        </div>

        <div className="docs-example docs-example--spacing">

          <h3>
            <p><code className="small">direction=(top-center)</code></p>
          </h3>
          <MenuOverlay
            menuTrigger={
              <Button ariaLabel='Show Custom Menu'>Show Customized MenuItems</Button>
            }
            direction='top-center'
          >
            <MenuContent>Content</MenuContent>
            <Menu>
              <MenuItem>
                <ListItemSection position="left">
                  <Icon name='edit_20'/>
                </ListItemSection>
                <ListItemSection position="center">
                  Edit space settings
                </ListItemSection>
              </MenuItem>
              <MenuItem keepMenuOpen>
                <ListItemSection position="left">
                  <Icon name='favorite_20'/>
                </ListItemSection>
                <ListItemSection position="center">
                  Add to favorites
                </ListItemSection>
              </MenuItem>
              <MenuItem>
                <ListItemSection position="left">
                  <Icon name='alert_20'/>
                </ListItemSection>
                <ListItemSection position="center">
                  Notifications
                </ListItemSection>
              </MenuItem>
              <MenuItem>
                <ListItemSection position="left">
                  <Icon name='accessories_20'/>
                </ListItemSection>
                <ListItemSection position="center">
                  Add Integrations & Bots
                </ListItemSection>
              </MenuItem>
              <MenuItem>
              <ListItemSection position="left">
                  <Icon name='stored-info_20'/>
                </ListItemSection>
                <ListItemSection position="center">
                  View space policy
                </ListItemSection>
              </MenuItem>
              <MenuItem keepMenuOpen>
                <ListItemSection position="left">
                  <Icon name='archive_20'/>
                </ListItemSection>
                <ListItemSection position="center">
                  Archive space
                </ListItemSection>
              </MenuItem>
              <MenuItem keepMenuOpen>
                <ListItemSection position="left">
                  <Icon name='cancel_20'/>
                </ListItemSection>
                <ListItemSection position="center">
                  Remove space from team
                </ListItemSection>
              </MenuItem>
              <MenuItem>
                <ListItemSection position="left">
                  <Icon name='exit-room_20'/>
                </ListItemSection>
                <ListItemSection position="center">
                  Leave space
                </ListItemSection>
              </MenuItem>
            </Menu>
          </MenuOverlay>
        </div>

      </div>
    );
  }
}
**/
