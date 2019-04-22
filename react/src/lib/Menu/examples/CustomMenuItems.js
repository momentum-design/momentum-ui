import React from 'react';
import {
  Button,
  Icon,
  ListItemSection,
  Menu,
  MenuContent,
  MenuItem,
  MenuOverlay,
} from '@momentum-ui/react';
export default class CustomMenuItems extends React.PureComponent {
  onClick(event, value) {
    alert(`${value} clicked`);
  }
  render() {
    return(
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
              <Icon name='edit_20' />
            </ListItemSection>
            <ListItemSection position="center">
              Edit space settings
          </ListItemSection>
          </MenuItem>
          <MenuItem keepMenuOpen>
            <ListItemSection position="left">
              <Icon name='favorite_20' />
            </ListItemSection>
            <ListItemSection position="center">
              Add to favorites
          </ListItemSection>
          </MenuItem>
          <MenuItem>
            <ListItemSection position="left">
              <Icon name='alert_20' />
            </ListItemSection>
            <ListItemSection position="center">
              Notifications
          </ListItemSection>
          </MenuItem>
          <MenuItem>
            <ListItemSection position="left">
              <Icon name='accessories_20' />
            </ListItemSection>
            <ListItemSection position="center">
              Add Integrations & Bots
          </ListItemSection>
          </MenuItem>
          <MenuItem>
            <ListItemSection position="left">
              <Icon name='stored-info_20' />
            </ListItemSection>
            <ListItemSection position="center">
              View space policy
          </ListItemSection>
          </MenuItem>
          <MenuItem keepMenuOpen>
            <ListItemSection position="left">
              <Icon name='archive_20' />
            </ListItemSection>
            <ListItemSection position="center">
              Archive space
          </ListItemSection>
          </MenuItem>
          <MenuItem keepMenuOpen>
            <ListItemSection position="left">
              <Icon name='cancel_20' />
            </ListItemSection>
            <ListItemSection position="center">
              Remove space from team
          </ListItemSection>
          </MenuItem>
          <MenuItem>
            <ListItemSection position="left">
              <Icon name='exit-room_20' />
            </ListItemSection>
            <ListItemSection position="center">
              Leave space
          </ListItemSection>
          </MenuItem>
        </Menu>
      </MenuOverlay>
    );
  }
}
