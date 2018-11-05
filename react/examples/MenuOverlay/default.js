import React from 'react';
import {
  Button,
  EditableTextfield,
  Icon,
  ListItemSection,
  Menu,
  MenuContent,
  MenuItem,
  MenuOverlay,
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