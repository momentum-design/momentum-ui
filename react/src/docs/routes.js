import React from 'react';
import { Switch, Route } from 'react-router-dom';
import docs from './data/docs';
import NavBar from './containers/NavBar';
import MainContainer from './containers/MainContainer';
import Overview from './containers/OverviewPage';
import Playground from './containers/Playground';
import ChildContainer from './containers/ChildContainer';
import NoMatch from './containers/NoMatch';

const createRoutes = () => {
  return Object.keys(docs).map((item, idx) => {
    if (idx === 0) {
      return (
        <Route
          exact
          path="/"
          key={'Exact0'}
          render={props => <Overview {...props} navData={docs[item]} />}
        />
      );
    }

    return [
      <Route
        key={`${item}${idx}`}
        exact
        path={`/${item}`}
        render={props => <MainContainer {...props} navData={docs[item]} />}
      />,
      docs[item].children && (
        <Route
          key={`${item}${idx}`}
          path={`/${item}/:subHeading`}
          render={props => (
            <ChildContainer
              {...props}
              category={item}
              docData={docs[item].children}
            />
          )}
        />
      )
    ];
  });
};

const Routes = () => {
  return (
    <div
      style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
      <NavBar navItems={docs} />
      <main>
        <Switch>
          {createRoutes()}
          <Route key={'Playground'} path="/playground" component={Playground} />
          <Route key={'NoMatch0'} component={NoMatch} />
        </Switch>
      </main>
      <footer className="footer">
        <p className="small text-center">
          ©2017 Cisco and/or its affiliates. All rights reserved.
        </p>
      </footer>
    </div>
  );
};

export default Routes;
