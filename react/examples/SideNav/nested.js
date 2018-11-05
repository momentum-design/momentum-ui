import React from 'react';
import { List, ListItem, SideNav } from '@collab-ui/react';
import { NavLink } from 'react-router-dom'
export default class SideNavNested extends React.PureComponent {
  render() {
    const anchorNode = <NavLink to='/containers/list-item' />;
    return (
      <div className='row' style={{marginBottom: '1rem'}}>
        <SideNav navSectionTitle='Reference' expandable expanded={false}>
          <List>
            <ListItem label='Admins' customAnchorNode={anchorNode} />
            <ListItem label='Devices' customAnchorNode={anchorNode} />
            <ListItem label='Licenses' customAnchorNode={anchorNode} />
            <SideNav navSectionTitle='Messages' className='cui-side-nav__reference' expandable expanded={false}>
              <List>
                <ListItem label='List Messages' customAnchorNode={anchorNode} />
                <ListItem label='Create a Messages' customAnchorNode={anchorNode} />
                <ListItem label='Get Message Details' customAnchorNode={anchorNode} />
                <ListItem label='Delete a Message' customAnchorNode={anchorNode} />
              </List>
            </SideNav>
          </List>
        </SideNav>
      </div>
    );
  }
}