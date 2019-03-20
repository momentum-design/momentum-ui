import React from 'react';
import { List, ListItem } from '@collab-ui/react';
export default class ListItemDefault extends React.PureComponent {
  render() {
    return(
      <div className="medium-4 columns">
        <div>
          <List>
            <ListItem label='Default List Item 1' />
            <ListItem label='Default List Item 2' />
          </List>
        </div>
        <div className="cui--contrast">
          <List>
            <ListItem label='List Item 1 (with Contrast)' />
            <ListItem label='List Item 2 (with Contrast)' />
          </List>
        </div>
      </div>
    );
  }
}