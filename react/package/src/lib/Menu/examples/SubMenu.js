import React from 'react';
import {
  Button,
  Menu,
  MenuItem,
  MenuOverlay,
  SubMenu
} from '@momentum-ui/react';
export default class MenuOverlaySubMenu extends React.PureComponent {
  onClick(event, value) {
    alert(`${value} clicked`);
  }
  render() {
    return(
      <MenuOverlay
        menuTrigger={
          <Button id='submenu' ariaLabel='Show Menu'>Show Menu</Button>
        }
      >
        <Menu>
          <SubMenu
            selectedValue="English"
            label="Language"
          >
            <MenuItem label="English" />
            <MenuItem label="Spanish" />
          </SubMenu>
        </Menu>
      </MenuOverlay>
    );
  }
}
