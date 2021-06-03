import React from 'react';
import { NavLink } from 'react-router-dom';
import {
  Sidebar,
  SidebarBody,
  SidebarNav,
  SidebarNavItem,
} from '@momentum-ui/react';
import { snakeCase } from '../../../lib/utils';
import KitchenSinkComponents from '../../ComponentList';
import ThemeSelect from '../../ThemeSelect';

export default class KitchenSink extends React.PureComponent {
  render() {
    return (
      <Sidebar
        className='docs-container__side-nav'
        isPageLevel
        withIcons={false}
      >
        <SidebarBody>
          <ThemeSelect/>
          <SidebarNav>
            <SidebarNavItem
              customAnchorNode={<NavLink activeClassName='md-active-nav' to={`/playground`} />}
              keyboardKey='p'
              title='Playground'
            />
            <SidebarNavItem keyboardKey='k' title='Kitchen Sink'>
              {
                KitchenSinkComponents.map(ele=> (
                  <SidebarNavItem
                    key={ele}
                    customAnchorNode={
                      <NavLink activeClassName='md-active-nav' to={`/${snakeCase(ele)}`} />
                    }
                    className='md-list-item--primary'
                    keyboardKey={`${snakeCase(ele)}`}
                    title={`${snakeCase(ele)}`}
                  />
                ))
              }
            </SidebarNavItem>
          </SidebarNav>
        </SidebarBody>
      </Sidebar>
    );
  }
}
