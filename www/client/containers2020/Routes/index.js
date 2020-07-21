import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Route, withRouter, Switch } from 'react-router-dom';

import fetchRoutes from './actions';
import Home from '../../containers2020/Home';
import System from '../../containers2020/System';
import Components2020 from '../../containers2020/Components';
import Icons from '../../containers2020/Icons';
import Color from '../../containers2020/Color';

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
        <Route path='/2020/components' exact component={Components2020} />
        <Route path='/2020/icons' exact component={Icons} />
        <Route path='/2020/tokens' exact component={Color} />
        <Route path='/2020/color' exact component={Color} />
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
