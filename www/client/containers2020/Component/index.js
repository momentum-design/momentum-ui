import React from 'react';
import PropTypes from 'prop-types';
import { NavLink } from 'react-router-dom';
import { connect } from 'react-redux';
import { fetchComponentData } from './actions';
import { withRouter } from 'react-router-dom';
import ComponentPage from './ComponentPage';
import {
  Button,
  Icon
} from '@momentum-ui/react';

class ComponentContainer extends React.Component {
  componentDidMount() {
    const {
      child,
      component,
      fetchComponentData,
      match
    } = this.props;
    if (Object.entries(component).length === 0) {
      fetchComponentData(match.params.component);
    }
  }

  componentDidUpdate(prevProps) {
    const {
      child,
      componentNotFound,
      component,
      fetchComponentData,
      match
    } = this.props;

    if(
      prevProps.component.name !== match.params.component
    ) {
      fetchComponentData(match.params.component);
    }
  }

  render() {
    const {
      match
    } = this.props;

    const componentNotFound = (
      <div className="site-warp component-does-not-exist"><Icon name="warning_72" />
        <h3>Can't find component '<span>{match.params.component}</span>'</h3>
        <p>There might be a typo in your search, or this component doesn't exist. If it doesn't exist, you can change that!</p>
        <div className="component-does-not-exist-buttons">
          <a href="https://github.com/momentum-design/momentum-ui/blob/main/core/README.md">
            <Button
              ariaLabel='Built with us'
              className="md-button--blue"
              size={52}
            >Built with us</Button>
          </a>
          <NavLink to="/components">
            <Button
              ariaLabel='components'
              className="md-button--blue"
              size={52}
            >Components</Button>
          </NavLink>
        </div>
      </div>
    );
    return (
      <>
      {
        this.props.componentNotFound
          && componentNotFound
          || <ComponentPage {...this.props} />
      }
      </>
    );
  }
}

const mapStateToProps = state => ({
  codePreference: state.componentsReducer2020.codePreference,
  componentNotFound: state.componentsReducer2020.componentNotFound,
  component: state.componentsReducer2020.component,
  error: state.componentsReducer2020.error,
  loading: state.componentsReducer2020.loading,
});

ComponentContainer.propTypes = {
  codePreference: PropTypes.string.isRequired,
  componentNotFound: PropTypes.bool.isRequired,
  component: PropTypes.object.isRequired,
  error: PropTypes.bool,
  fetchComponentData: PropTypes.func.isRequired,
  loading: PropTypes.bool,
};

ComponentContainer.defaultProps = {
  error: false,
  loading: false,
};

ComponentContainer.displayName = 'ComponentContainer';

export default withRouter(
  connect(
    mapStateToProps,
    { fetchComponentData }
  )(ComponentContainer)
);
