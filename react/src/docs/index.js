import React from 'react';
import { render } from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { AppContainer } from 'react-hot-loader';

import Routes from './routes';
import configureStore from './store/configureStore';

import './styles.scss';
// require('./favicon.ico'); // Tell webpack to load favicon.ico

const store = configureStore();

render(
  <AppContainer>
    <BrowserRouter>
      <Provider store={store}>
        <Routes />
      </Provider>
    </BrowserRouter>
  </AppContainer>,
  document.getElementById('app')
);

if (module.hot) {
  module.hot.accept('./routes', () => {
    const NewRoutes = require('./routes').default;
    render(
      <AppContainer>
        <BrowserRouter>
          <Provider store={store}>
            <NewRoutes />
          </Provider>
        </BrowserRouter>
      </AppContainer>,
      document.getElementById('app')
    );
  });
}
