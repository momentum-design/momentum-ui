import React from 'react';
import { List, ListItem } from '@collab-ui/react';
import { NavLink } from 'react-router-dom';
export default class CustomLinkExample extends React.PureComponent {
  render() {
    const anchorNode = <NavLink to='/containers/list-item' />;
    return(
      <div className="medium-4 columns">
        <List>
          <ListItem label='Custom Anchor' customRefProp='innerRef' customAnchorNode={anchorNode}/>
        </List>
      </div>
    );
  }
}