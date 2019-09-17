import React from 'react';
import { NavLink, Route, Switch } from 'react-router-dom';
import {
  Sidebar,
  SidebarBody,
  SidebarNav,
  SidebarNavItem,
} from '@momentum-ui/react';
import CheckboxKitchenSink from '../../../lib/Checkbox/examples/KitchenSink';
import InputKitchenSink from '../../../lib/Input/examples/KitchenSink';
import RadioKitchenSink from '../../../lib/Radio/examples/KitchenSink';
import EventOverlay from '../EventOverlay';

export default class KitchenSink extends React.PureComponent {
  render() {
    return (
      <>
      <div className="docs-container--with-side-nav">
        <Sidebar
          className="docs-container__side-nav"
          isPageLevel
          withIcons={false}
        >
            <SidebarBody>
              <SidebarNav>
                <SidebarNavItem
                  customAnchorNode={<NavLink activeClassName="md-active-nav" to={`/playground`} />}
                  keyboardKey="p"
                  title="Playground"
                />
                <SidebarNavItem keyboardKey="k" title="Kitchen Sink">
                  <SidebarNavItem
                    key={`CheckboxKitchenSink`}
                    customAnchorNode={<NavLink activeClassName="md-active-nav" to={`/checkbox`} />}
                    className="md-list-item--primary"
                    keyboardKey="checkbox"
                    title="checkbox"
                  />
                  <SidebarNavItem
                    key={`InputKitchenSink`}
                    customAnchorNode={<NavLink activeClassName="md-active-nav" to={`/input`} />}
                    className="md-list-item--primary"
                    keyboardKey="input"
                    title="input"
                  />
                  <SidebarNavItem
                    key={`RadioKitchenSink`}
                    customAnchorNode={<NavLink activeClassName="md-active-nav" to={`/radio`} />}
                    className="md-list-item--primary"
                    keyboardKey="radio"
                    title="radio"
                  />
                  <SidebarNavItem
                    key={`EventOverlay`}
                    customAnchorNode={
                      <NavLink activeClassName="md-active-nav" to={`/event-overlay`} />
                    }
                    className="md-list-item--primary"
                    keyboardKey="event overlay"
                    title="event overlay"
                  />
                </SidebarNavItem>
              </SidebarNav>
            </SidebarBody>
          </Sidebar>
          <div className="docs-container__content">
            <h1>Kitchen Sink</h1>
            <Switch>
              <Route
                key={`CheckboxKitchenSink`}
                exact
                path={`/checkbox`}
                render={() => <CheckboxKitchenSink />}
              />
              <Route
                key={`InputKitchenSink`}
                exact
                path={`/input`}
                render={() => <InputKitchenSink />}
              />
              <Route
                key={`RadioKitchenSink`}
                exact
                path={`/radio`}
                render={() => <RadioKitchenSink />}
              />
              <Route
                key={`EventOverlay`}
                exact
                path={`/event-overlay`}
                render={() => <EventOverlay />}
              />
            </Switch>
          </div>
        </div>
      </>
    );
  }
}
