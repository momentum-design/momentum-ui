import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Route, withRouter, Switch } from 'react-router-dom';

import fetchRoutes from './actions';
import Changelog from '../../containers/Changelog';
import ComponentOverview from '../../containers/ComponentOverview';
import ComponentStatus from '../../containers/ComponentStatus';
import Feedback from '../../containers/Feedback';
import Home from '../../containers/Home';
import Login from '../../containers/Login';
import NotFound from '../../components/NotFound';
import RouteContainer from './RouteContainer';
import SearchResults from '../../containers/SearchResults';
// import getAuthorization from '../../services/user/actions';
// import PrivateRoute from './PrivateRoute';

class Routes extends React.Component {
  componentDidMount() {
    this.props.fetchRoutes();
  }

  render() {
    return (
      <Switch>
        <Route path='/' exact component={Home} />
        <Route path='/components' exact component={ComponentOverview} />
        <Route path='/components/component-status' exact component={ComponentStatus} />
        <Route path='/guidelines/:section/:subSection' exact component={props => <RouteContainer {...props} />} />
        <Route path='/changelog' component={Changelog} />
        <Route path='/feedback' exact component={Feedback} />
        <Route path='/login' component={Login} />
        <Route path='/search' component={SearchResults} />
        <Route path='/:category' exact render={props => <RouteContainer {...props} />} />
        <Route path='/:category/:section' render={props => <RouteContainer {...props} />} />
        <Route component={NotFound} />
      </Switch>
    );
  }
}

Routes.propTypes = {
  fetchRoutes: PropTypes.func.isRequired,
};

Routes.displayName = 'Routes';

export default withRouter(
  connect(
    null,
    { fetchRoutes }
  )(Routes)
);
