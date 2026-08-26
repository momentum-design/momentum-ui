import React from 'react';
import { createRoot } from 'react-dom/client';
import configureStore, { history } from './store/configureStore';
import Root from './Root';
import './styles/styles2020.scss';

const store = configureStore();

createRoot(document.getElementById('app')).render(
  <Root store={store} history={history} />
);
