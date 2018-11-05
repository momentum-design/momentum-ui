import React from 'react';
import { List, ListItem, SideNav } from '@collab-ui/react';
import { NavLink } from 'react-router-dom'
export default class SideNavFull extends React.PureComponent {
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
        <div style={{marginBottom: '1rem'}}></div>
        <SideNav navSectionTitle='REST API' topMenu>
          <List>
            <ListItem label='Basics' customAnchorNode={anchorNode} />
            <SideNav navSectionTitle='Guides' expandable expanded={false}>
              <List className='cui-submenu'>
                <ListItem label='Authentication' customAnchorNode={anchorNode} />
                <ListItem label='Admin API' customAnchorNode={anchorNode} />
                <ListItem label='Webhooks' customAnchorNode={anchorNode} />
                <ListItem label='Compliance' customAnchorNode={anchorNode} />
                <ListItem label='Metrics and Reporting' customAnchorNode={anchorNode} />
              </List>
            </SideNav>
            <SideNav navSectionTitle='Reference' className='cui-side-nav__reference-container' expandable expanded={false}>
              <List className='cui-submenu'>
                <SideNav navSectionTitle='Admins' />
                <SideNav navSectionTitle='Devices' />
                <SideNav navSectionTitle='Licenses' />
                <SideNav navSectionTitle='Memberships' />
                <SideNav navSectionTitle='Messages' className='cui-side-nav__reference'>
                  <List>
                    <ListItem label='List Messages' customAnchorNode={anchorNode} />
                    <ListItem label='Create a Messages' customAnchorNode={anchorNode} />
                    <ListItem label='Get Message Details' customAnchorNode={anchorNode} />
                    <ListItem label='Delete a Message' customAnchorNode={anchorNode} />
                  </List>
                </SideNav>
                <SideNav navSectionTitle='Organizations' />
                <SideNav navSectionTitle='People' />
                <SideNav navSectionTitle='Policies' />
                <SideNav navSectionTitle='Roles' />
                <SideNav navSectionTitle='Rooms' />
                <SideNav navSectionTitle='Teams' />
                <SideNav navSectionTitle='Team Memberships' />
              </List>
            </SideNav>
          </List>
        </SideNav>
        <div style={{marginBottom: '1rem'}}></div>
        <SideNav navSectionTitle='SDKS' topMenu>
          <List>
            <ListItem label='iOS' customAnchorNode={anchorNode} />
            <ListItem label='Android' customAnchorNode={anchorNode} />
            <ListItem label='Widgets' customAnchorNode={anchorNode} />
            <ListItem label='Windows' customAnchorNode={anchorNode} />
            <ListItem label='Community' customAnchorNode={anchorNode} />
          </List>
        </SideNav>
      </div>
    );
  }
}