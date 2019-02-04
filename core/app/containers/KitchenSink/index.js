import React from 'react';
import { NavLink, Route, Switch } from 'react-router-dom';
import {
  List,
  ListItem,
  ListItemSection,
  SideNav,
} from '@collab-ui/react';
import Example from '../Example'
import components from '../../../data/data.json';

class KitchenSink extends React.Component {
  state = {
    currentComponent: ''
  };

  createNavLinks = components.map((item, idx) => {
    return (
      <ListItem
        key={`${item.id}-${idx}`}
        customAnchorNode={
          <NavLink activeClassName='cui-active-nav' to={`/${item.name}`} />
        }
        className='cui-list-item--primary'
      >
        <h5 className='cui-font-color--alternate'>
          {item.name}
        </h5>
      </ListItem>
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
          <SideNav className="docs-container__side-nav">
            <List>{this.createNavLinks}</List>
          </SideNav>
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
