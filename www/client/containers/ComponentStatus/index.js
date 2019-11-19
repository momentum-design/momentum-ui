import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Badge, Icon, Spinner } from '@momentum-ui/react';
import { fetchAllComponentData, fetchComponentStatusData } from './actions';
import PageHeader from '../../momentum-ui/PageHeader';
import Media from 'react-media';

class ComponentStatusPage extends React.Component {
  componentDidMount() {
    const {
      components,
      componentStatus,
      fetchAllComponentData,
      fetchComponentStatusData
    } = this.props;

    if(!components) {
      fetchAllComponentData();
    }
    if(!componentStatus) {
      fetchComponentStatusData();
    }
  }

  componentDidUpdate(prevProps) {
    const {
      components,
      componentStatus,
      fetchAllComponentData,
      fetchComponentStatusData
    } = this.props;

    if(prevProps.components !== components && !components) {
      fetchAllComponentData();
    }
    if(prevProps.componentStatus !== componentStatus && !componentStatus) {
      fetchComponentStatusData();
    }
  }


  render() {
    const { components, loading } = this.props;

    const badge = availiable => {
      return availiable ? <Badge color="green-pastel">Stable</Badge> : '';
    }

    const row = () => {
      const { components, componentStatus } = this.props;
      const core = JSON.parse(componentStatus.core);
      const react = JSON.parse(componentStatus.react);
      const angular = JSON.parse(componentStatus.angular);
      const vue = JSON.parse(componentStatus.vue);

      return components.children.reduce((agg, itm, idx) => {
        return [
          ...agg,
          <tr key={idx}>
            <td>{itm.displayName}</td>
            <td>{badge(core.indexOf(itm.name) > -1)}</td>
            <td>{badge(react.indexOf(itm.name) > -1)}</td>
            <td>{badge(angular.indexOf(itm.name) > -1)}</td>
            <td>{badge(vue.indexOf(itm.name) > -1)}</td>
          </tr>
        ];
      }, []);
    };

    return (
      <React.Fragment>
        {
          components && (
            <Media query="(min-width: 1025px)">
              {isDesktop => (
                <PageHeader
                  title="Component status"
                  lead=""
                  textAlign="left"
                  collapse={isDesktop}
                />
              )
            }
          </Media>
          )
        }
        <div className="docs-content-area docs-component-status">
          {loading ? (
            <div className="docs-component-status__spinner">
              <Spinner />
            </div>
          ) : (
            <React.Fragment>
              <table className="docs-component-status__table">
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Core</th>
                        <th>React</th>
                        <th>Angular</th>
                        <th>Vue</th>
                    </tr>
                </thead>
                <tbody>
                  {row()}
                </tbody>
              </table>
            </React.Fragment>
          )}
        </div>
      </React.Fragment>
    );
  }
}

const mapStateToProps = state => {
  return {
    ...state.componentStatusReducer,
  };
};

ComponentStatusPage.propTypes = {
  components: PropTypes.object,
  componentStatus: PropTypes.object,
  error: PropTypes.string,
  fetchAllComponentData: PropTypes.func.isRequired,
  fetchComponentStatusData: PropTypes.func.isRequired,
  loading: PropTypes.bool,
};

ComponentStatusPage.defaultProps = {
  error: null,
  loading: false,
};

ComponentStatusPage.displayName = 'ComponentStatusPage';

export default connect(
  mapStateToProps,
  { fetchAllComponentData, fetchComponentStatusData }
)(ComponentStatusPage);
