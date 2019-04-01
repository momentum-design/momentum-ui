import React from 'react';
import { NavLink, Route, Switch } from 'react-router-dom';
import {
  Sidebar,
  SidebarBody,
  SidebarNav,
  SidebarNavItem,
} from '@collab-ui/react';
import Example from '../Example'
import components from '../../../data/data.json';

class KitchenSink extends React.Component {
  state = {
    currentComponent: ''
  };

  createNavLinks = components.map((item, idx) => {
    return (
      <SidebarNavItem
        key={`${item.id}-${idx}`}
        customAnchorNode={
          <NavLink activeClassName='cui-active-nav' to={`/${item.name}`} />
        }
        className='cui-list-item--primary'
        key={`${item.id}-${idx}`}
        keyboardKey={item.name}
        title={item.name}
      />
    )
  });

  createRoutes = components.map((item, idx) => {
      return (
        <Route
          key={`${item.name}-${idx}`}
          exact
          path={`/${item.name}`}
          render={() => <Example item={item} />}
        />
      )
    });

  render () {

    return (
      <React.Fragment>
        <div className="docs-container--with-side-nav">
          <Sidebar
            className="docs-container__side-nav"
            expandable={false}
            withIcons={false}
            isPageLevel={true}
          >
            <SidebarBody>
              <SidebarNav>{this.createNavLinks}</SidebarNav>
            </SidebarBody>
          </Sidebar>
          <div className="docs-container__content">
            <h1>Kitchen Sink</h1>
            <Switch>
              {this.createRoutes}
            </Switch>
          </div>
        </div>
      </React.Fragment>
    );
  }
};

export default KitchenSink;
