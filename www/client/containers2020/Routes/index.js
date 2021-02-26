import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Route, withRouter, Switch } from 'react-router-dom';

import fetchRoutes from './actions';
import Home from '../../containers2020/Home';
import System from '../../containers2020/System';
import Components from '../ComponentOverview';
import Icons from '../../containers2020/Icons';
import Tokens from '../../containers2020/Tokens';
import Personality from '../../containers2020/Personality';
import Feedback from '../../containers2020/Feedback';
import NotFound from '../../components2020/NotFound';

class Routes extends React.Component {
  componentDidMount() {
    this.props.fetchRoutes();
  }

  render() {
    return (
      <Switch>
        <Route path='/' exact component={Home} />
        <Route path='/home' exact component={Home} />
        <Route path='/system' exact component={System} />
        <Route path='/components' component={Components} />
        <Route path='/icons' exact component={Icons} />
        <Route path='/tokens' component={Tokens} />
        <Route path='/personality' exact component={Personality} />
        {/* <Route path='/feedback' exact component={Feedback} /> */}
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
