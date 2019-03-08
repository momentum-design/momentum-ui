import {
  applyMiddleware,
  compose,
  createStore,
} from 'redux';
import reduxImmutableStateInvariant from 'redux-immutable-state-invariant';
import thunk from 'redux-thunk';
import createHistory from 'history/createBrowserHistory';
import { routerMiddleware } from 'connected-react-router';
import ReactGA from 'react-ga';
import createRootReducer from './combineReducers';
import config from '../config';

export const history = createHistory();

const configureStoreProd = initialState => {
  const reactRouterMiddleware = routerMiddleware(history);
  const middlewares = [
    // Add other middleware on this line...

    // thunk middleware can also accept an extra argument to be passed to each thunk action
    // https://github.com/reduxjs/redux-thunk#injecting-a-custom-argument
    thunk,
    reactRouterMiddleware,
  ];

  ReactGA.initialize(config.GA_TRACKING_ID);
  history.listen(location => ReactGA.pageview(location.pathname));

  return createStore(
    createRootReducer(history),
    initialState,
    compose(applyMiddleware(...middlewares))
  );
};

const configureStoreDev = initialState => {
  const reactRouterMiddleware = routerMiddleware(history);
  const middlewares = [
    // Add other middleware on this line...

    // Redux middleware that spits an error on you when you try to mutate your state either inside a dispatch or between dispatches.
    reduxImmutableStateInvariant(),

    // thunk middleware can also accept an extra argument to be passed to each thunk action
    // https://github.com/reduxjs/redux-thunk#injecting-a-custom-argument
    thunk,
    reactRouterMiddleware,
  ];

  const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose; // add support for Redux dev tools
  const store = createStore(
    createRootReducer(history),
    initialState,
    composeEnhancers(applyMiddleware(...middlewares))
  );

  if (module.hot) {
    // Enable Webpack hot module replacement for reducers
    module.hot.accept('./combineReducers', () => {
      store.replaceReducer(createRootReducer(history));
    });
  }

  return store;
};

const configureStore = process.env.NODE_ENV === 'production' ? configureStoreProd : configureStoreDev;

export default configureStore;
