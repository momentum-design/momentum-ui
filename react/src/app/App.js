import React from 'react';
import { Switch, Route } from 'react-router-dom';
import Playground from './containers/Playground';
import EventOverlay from './containers/EventOverlay';

const App = () => {
  return (
    <div
      style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
      <main>
        <Switch>
          <Route key={'Playground'} path="/playground" component={Playground} />
          <Route key={'EventOverlay'} path="/event-overlay" component={EventOverlay} />
          <Route component={Playground} />
        </Switch>
      </main>
    </div>
  );
};

export default App;