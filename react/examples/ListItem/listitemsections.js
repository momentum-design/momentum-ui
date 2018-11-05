import React from 'react';
import { List, ListItem, ListItemSection } from '@collab-ui/react';
export default class ListItemSectionExample extends React.PureComponent {
  render() {
    return(
      <div className="medium-4 columns">
        <List>
          <ListItem link='javascript:void(0)'>
            <ListItemSection position='left'>
              Left
              </ListItemSection>
              <ListItemSection position='right'>
                Right
              </ListItemSection>
          </ListItem>
          <ListItem link='javascript:void(0)'>
            <ListItemSection position='center'>
              Center
            </ListItemSection>
          </ListItem>
          <ListItem link='javascript:void(0)'>
            <ListItemSection position='center-align'>
              Center Align
            </ListItemSection>
          </ListItem>
          <ListItem link='javascript:void(0)'>
            <ListItemSection position='left'>
              Left
            </ListItemSection>
            <ListItemSection position='center'>
              Center
            </ListItemSection>
            <ListItemSection position='right'>
              Right
            </ListItemSection>
          </ListItem>
        </List>
      </div>
    );
  }
}