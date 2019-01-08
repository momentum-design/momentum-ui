import React from 'react';
import { render } from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import { AppContainer } from 'react-hot-loader';

import App from './App';

import './styles.scss';

render(
  <AppContainer>
    <BrowserRouter>
        <App />
    </BrowserRouter>
  </AppContainer>,
  document.getElementById('app')
);

if (module.hot) {
  module.hot.accept('./App', () => {
    const NewApp = require('./App').default;
    render(
      <AppContainer>
        <BrowserRouter>
            <NewApp />
        </BrowserRouter>
      </AppContainer>,
      document.getElementById('app')
    );
  });
}
