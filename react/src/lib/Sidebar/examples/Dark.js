import React from 'react';
import {
  Sidebar,
  SidebarBody,
  SidebarNav,
  SidebarNavItem
} from '@collab-ui/react';

export default class DefaultSidebar extends React.PureComponent {
  render() {
    return (
      <Sidebar theme='dark' withIcons={false}>
        <SidebarBody>
          <SidebarNav>
            <SidebarNavItem
              title='Level 1'
            />
            <SidebarNavItem
              title='Level 1 + Sub'
            >
              <SidebarNavItem title='Level 2' />
              <SidebarNavItem title='Level 2' />
              <SidebarNavItem title='Level 2 + Sub'>
                <SidebarNavItem title='Level 3' />
                <SidebarNavItem title='Level 3' />
                <SidebarNavItem title='Level 3' />
              </SidebarNavItem>
            </SidebarNavItem>
          </SidebarNav>
          <SidebarNav title='section title'>
            <SidebarNavItem
              title='Level 1'
            />
          </SidebarNav>
        </SidebarBody>
      </Sidebar>
    );
  }
}