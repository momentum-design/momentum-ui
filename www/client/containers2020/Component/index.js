import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { fetchComponentData } from './actions';
import { withRouter } from 'react-router-dom';
import ComponentPage from './ComponentPage';
import Icon from '@momentum-ui/react/lib/Icon';

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
    return (
      <>
      {
        this.props.componentNotFound
          && <div className="site-warp component-does-not-exist"><Icon name="warning_72" /> This component does not exist</div>
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
