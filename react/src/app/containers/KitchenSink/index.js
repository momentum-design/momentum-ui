import React from 'react';
import { NavLink, Route, Switch } from 'react-router-dom';
import {
  Sidebar,
  SidebarBody,
  SidebarNav,
  SidebarNavItem,
} from '@momentum-ui/react';
import EventOverlay from '../EventOverlay';
import { snakeCase } from '../../../lib/utils';
import AsyncComponent from '../AsyncComponent';

const KitchenSinkComponents = [
  'Alert',
  'AlertBanner',
  'AlertCall',
  'AlertMeeting',
  'Avatar',
  'Badge',
  'Breadcrumbs',
  'Button',
  'ButtonGroup',
  'CallControl',
  'Card',
  'CardSection',
  'Checkbox',
  'Coachmark',
  'CollapseButton',
  'ComboBox',
  'ContentItem',
  'DatePicker',
  'Dialog',
  'EditableTextfield',
  'FormSection',
  'FormSubSection',
  'Icon',
  'Input',
  'InputHelper',
  'InputSearch',
  'Label',
  'Lightbox',
  'Link',
  'List',
  'ListItem',
  'ListItemHeader',
  'ListItemMeeting',
  'Loading',
  'Menu',
  'Modal',
  'ModalBody',
  'ModalFooter',
  'Popover',
  'ProgressBar',
  'Radio',
  'Select',
  'Sidebar',
  'Slider',
  'SocialList',
  'SpaceListItem',
  'Spinner',
  'Tabs',
  'TimePicker',
  'ToggleSwitch',
  'Tooltip',
];

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
                  {
                    KitchenSinkComponents.map(ele=> (
                      <SidebarNavItem
                        key={ele}
                        customAnchorNode={
                          <NavLink activeClassName="md-active-nav" to={`/${snakeCase(ele)}`} />
                        }
                        className="md-list-item--primary"
                        keyboardKey={`${snakeCase(ele)}`}
                        title={`${snakeCase(ele)}`}
                      />
                    ))
                  }
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
            <h1>React Kitchen Sink</h1>
            <Switch>
              {
                KitchenSinkComponents.map(ele=> (
                  <Route
                    key={ele}
                    exact
                    path={`/${snakeCase(ele)}`}
                    render={()=> (
                      <AsyncComponent
                        loader={() => import(`../../../lib/${ele}/examples/KitchenSink.js`)}
                      />
                    )}
                  />
                ))
              }
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
