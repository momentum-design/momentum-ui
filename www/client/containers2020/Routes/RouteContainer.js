import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Route } from 'react-router-dom';
import { Spinner } from '@momentum-ui/react';
import Home from '../Home';
import NotFound from '../../components/NotFound';

class RouteContainer extends React.Component {

  render() {
    const {
      error,
      loading,
      match,
      routes,
      ...props
    } = this.props;

    console.log(match);

    const getComponent = () => {
      return <Home child={child} match={match} {...props} />;
    };

    return (
      loading
        ? <Spinner />
        : (
          !error &&
          routes &&
          routes.length &&
          matchPathToRoute() &&
          getComponent()
          ||
          <Route component={NotFoundPage} />
        )
    );
  }
}

const mapStateToProps = state => ({
  routes: state.routesReducer.routes,
  error: state.routesReducer.error,
  loading: state.routesReducer.loading
});

RouteContainer.propTypes = {
  routes: PropTypes.array.isRequired,
  error: PropTypes.bool.isRequired,
  loading: PropTypes.bool.isRequired
};

RouteContainer.displayName = 'RouteContainer';

export default connect(mapStateToProps)(RouteContainer);


