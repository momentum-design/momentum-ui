import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import fetchIcons from './actions/icons_fetch';
import PropTypes from 'prop-types';
import IconsContainer from './components/IconsContainer';
import GettingStarted from './components/GettingStarted';
import Accessibility from './components/Accessibility';
import KitchenSink from './components/KitchenSink';
import Usage from './components/Usage';
import ReactGA from 'react-ga';
// import logo from '@collab-ui/core/images/spark-logo.svg';
import { Route, NavLink, withRouter, Switch, Redirect } from 'react-router-dom';
import {
  // Icon,
  ListItem,
  Topbar,
  TopbarNav,
  TopbarMobile,
  TopbarRight,
} from '@collab-ui/react';

class App extends Component {
  constructor() {
    super();
    ReactGA.initialize('UA-110792431-4');
    ReactGA.pageview(window.location.pathname);
  }

  componentDidMount() {
    this.props.fetchIcons();
  }

  render() {
    const logoIcon = <i className="icon icon-cisco-logo" />;
    const navItems = (
      <Fragment>
        <ListItem
          customRefProp="innerRef"
          customAnchorNode={
            <NavLink to={'/icons'} activeClassName={'active'}>
              Icons
            </NavLink>
          }
        />
        <ListItem
          customRefProp="innerRef"
          customAnchorNode={
            <NavLink to={'/getting-started'} activeClassName={'active'}>
              Installation
            </NavLink>
          }
        />
        <ListItem
          customRefProp="innerRef"
          customAnchorNode={
            <NavLink to={'/usage'} activeClassName={'active'}>
              Usage
            </NavLink>
          }
        />
        <ListItem
          customRefProp="innerRef"
          customAnchorNode={
            <NavLink to={'/accessibility'} activeClassName={'active'}>
              Accessibility
            </NavLink>
          }
        />
      </Fragment>
    );

    return (
      <div id="docs" className={`i-docs`}>
        <Topbar
          title="Collab UI Icons"
          color="light"
          image={logoIcon} fixed
          brandAnchorElement={<NavLink to={`/`} activeClassName={'active'} />}
        >
          <TopbarNav>{navItems}</TopbarNav>
          <TopbarRight><div /></TopbarRight>
          <TopbarMobile>{navItems}</TopbarMobile>
        </Topbar>
        <main>
          <Switch>
            <Route path="/icons" component={IconsContainer} />
            <Route path="/usage" component={Usage} />
            <Route path="/getting-started" component={GettingStarted} />
            <Route path="/accessibility" component={Accessibility} />
            <Route path="/kitchen-sink" component={KitchenSink} />
            <Route exact path="/">
              <Redirect to="/icons" />
            </Route>
          </Switch>
        </main>
        <footer className="footer">
          <p className="small text-center">
            ©2018 Cisco and/or its affiliates. All rights reserved.
          </p>
        </footer>
      </div>
    );
  }
}

App.propTypes = {
  fetchIcons: PropTypes.func,
};

export default withRouter(connect(null, { fetchIcons })(App));
