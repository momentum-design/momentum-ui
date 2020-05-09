import React from 'react';
import {
  Sidebar,
  SidebarBody,
  SidebarNav,
  SidebarNavItem
} from '@momentum-ui/react';

export default class PageLevelSidebar extends React.PureComponent {
  render() {
    return (
      <Sidebar isPageLevel={true}>
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
