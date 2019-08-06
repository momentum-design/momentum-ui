import React from 'react';
import { Switch, Route } from 'react-router-dom';
import Playground from './containers/Playground';
import EventOverlay from './containers/EventOverlay';
import KitchenSink from './containers/KitchenSink';

const App = () => {
  return (
    <div
      style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
      <main>
        <Switch>
          <Route key={'Playground'} path="/playground" component={Playground} />
          <Route key={'EventOverlay'} path="/event-overlay" component={EventOverlay} />
          <Route key={'KitchenSink'} path="/kitchen-sink" component={KitchenSink} />
          <Route component={Playground} />
        </Switch>
      </main>
    </div>
  );
};

export default App;
