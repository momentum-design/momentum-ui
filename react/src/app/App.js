import React from 'react';
import { Switch, Route, NavLink } from 'react-router-dom';
import Playground from './containers/Playground';
import KitchenSink from './containers/KitchenSink';
import Sidebar from './containers/Sidebar';
import { Topbar } from '@momentum-ui/react';

import logo from '@momentum-ui/core/images/momentum/momentum-horiz-color.svg';

const App = () => {
  const wordMark = <img src={logo} alt="Momentum Design" />;

  return (
    <div
      style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}
    >
      <Topbar
        color="light"
        image={wordMark}
        brandAnchorElement={<NavLink to="/" />}
      />
      <main>
        <div className='docs-container--with-side-nav'>
          <Sidebar />
          <div className='docs-container__content'>
            <Switch>
              <Route key={'Playground'} path="/playground" component={Playground} />
              <Route component={KitchenSink} />
            </Switch>
          </div>
        </div>
      </main>
    </div>
  );
};

export default App;
