import React from 'react';
import { List, ListItem, SideNav } from '@collab-ui/react';
import { NavLink } from 'react-router-dom'
export default class SideNavExpand extends React.PureComponent {
  render() {
    const anchorNode = <NavLink to='/containers/list-item' />;
    return (
      <div className='row' style={{marginBottom: '1rem'}}>
        <SideNav navSectionTitle='Guides' expandable expanded={false}>
          <List>
            <ListItem label='Authentication' customAnchorNode={anchorNode} />
            <ListItem label='Admin API' customAnchorNode={anchorNode} />
            <ListItem label='Webhooks' customAnchorNode={anchorNode} />
            <ListItem label='Compliance' customAnchorNode={anchorNode} />
          </List>
        </SideNav>
      </div>
    );
  }
}