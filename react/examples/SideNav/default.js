import React from 'react';
import { List, ListItem, SideNav } from '@collab-ui/react';
import { NavLink } from 'react-router-dom'
export default class SideNavDefault extends React.PureComponent {
  render() {
    const anchorNode = <NavLink to='/containers/list-item' />;
    return (
      <div className='row' style={{marginBottom: '1rem'}}>
        <SideNav navSectionTitle='OVERVIEW' topMenu>
          <List>
            <ListItem label='Platform Introduction' customAnchorNode={anchorNode} />
            <ListItem label='Bots' customAnchorNode={anchorNode} />
            <ListItem label='Widgets' customAnchorNode={anchorNode} />
            <ListItem label='Integration' customAnchorNode={anchorNode} />
            <ListItem label='Guest Issuer' customAnchorNode={anchorNode} />
          </List>
        </SideNav>
      </div>
    );
  }
}