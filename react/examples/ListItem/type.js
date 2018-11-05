import React from 'react';
import { List, ListItem } from '@collab-ui/react';
export default class ListItemType extends React.PureComponent {
  render() {
    return(
      <div className="medium-4 columns">
        <div>
          <List>
            <ListItem type='small' link='javascript:void(0)' label='Small List Item' />
            <ListItem link='javascript:void(0)' label='Regular List Item' />
            <ListItem type='large' link='javascript:void(0)' label='Large List Item' />
            <ListItem type='xlarge' link='javascript:void(0)' label='XLarge List Item' />
          </List>
        </div>
        <div className="cui--contrast">
          <List>
            <ListItem type='small' link='javascript:void(0)' label='Small List Item (with Contrast)' />
            <ListItem link='javascript:void(0)' label='Regular List Item (with Contrast)' />
            <ListItem type='large' link='javascript:void(0)' label='Large List Item (with Contrast)' />
            <ListItem type='xlarge' link='javascript:void(0)' label='XLarge List Item (with Contrast)' />
          </List>
        </div>
      </div>
    );
  }
}