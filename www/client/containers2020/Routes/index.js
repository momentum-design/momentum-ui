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

class Routes extends React.Component {
  componentDidMount() {
    this.props.fetchRoutes();
  }

  render() {
    return (
      <Switch>
        <Route path='/2020' exact component={Home} />
        <Route path='/2020/home' exact component={Home} />
        <Route path='/2020/system' exact component={System} />
        <Route path='/2020/components' component={Components} />
        <Route path='/2020/icons' exact component={Icons} />
        <Route path='/2020/tokens' component={Tokens} />
        <Route path='/2020/personality' exact component={Personality} />
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
