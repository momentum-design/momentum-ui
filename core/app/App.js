import React from 'react';
import { Switch, Route, NavLink } from 'react-router-dom';
import Playground from './containers/Playground';
import KitchenSink from './containers/KitchenSink';
import {
  ListItem,
  Topbar,
  TopbarNav,
} from '@momentum-ui/react';

import logo from '../images/momentum/momentum-horiz-color.svg';

const App = () => {
  const wordMark = <img src={logo} alt="Momentum Design" />;
  const navItems = (
    <React.Fragment>
      <ListItem
        customRefProp="innerRef"
        customAnchorNode={
          <NavLink exact to="/" activeClassName='active'>
            Kitchen Sink
          </NavLink>
        }
      />
      <ListItem
        customRefProp="innerRef"
        customAnchorNode={
          <NavLink exact to="/playground" activeClassName='active'>
            Playground
          </NavLink>
        }
      />
    </React.Fragment>
  );

  return (
    <div
      style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
      <Topbar color="light" image={wordMark} brandAnchorElement={<NavLink to="/" />}>
        <TopbarNav>{navItems}</TopbarNav>
      </Topbar>
      <main>
        <Switch>
          <Route path="/playground" component={Playground} />
          <Route component={KitchenSink} />
        </Switch>
      </main>
    </div>
  );
};

export default App;
