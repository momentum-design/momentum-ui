import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Route, Redirect } from 'react-router-dom';

const userAuth = true;

const PrivateRoute = ({ component: Component, ...rest }) => (
  <Route
    {...rest}
    render={props =>
      userAuth ? (
        <Component {...props} />
      ) : (
        <Redirect
          to={{
            pathname: '/login',
            state: { from: props.location },
          }}
        />
      )
    }
  />
);

const mapStateToProps = state => ({
  user: state.user,
});

PrivateRoute.propTypes = {
  component: PropTypes.func.isRequired,
  location: PropTypes.object.isRequired,
};

export default connect(mapStateToProps)(PrivateRoute);
