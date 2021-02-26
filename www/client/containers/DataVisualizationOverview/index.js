import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Spinner } from '@momentum-ui/react';
import { fetchAllComponentData, filterComponentsData } from './actions';
import PageHeader from '../../momentum-ui/PageHeader';
import Media from 'react-media';
import AsyncComponent from '../../components/AsyncComponent';

const List_GetStart = ['yourFirstChart', 'addMoreCharts', 'useMomentumColors', 'axisAndScale',
  'makeLegends', 'addAnimation', 'responsiveDesign'];

class ComponentOverviewPage extends React.Component {
  componentDidMount() {
    const { components, fetchAllComponentData } = this.props;

    if (!components) {
      fetchAllComponentData();
    }
  }

  componentDidUpdate(prevProps) {
    const { components, fetchAllComponentData } = this.props;

    if (prevProps.components !== components && !components) {
      fetchAllComponentData();
    }
  }

  handleSearchInput = e => {
    const value = e.target.value;
    this.props.filterComponentsData(value);
  };

  render() {
    const { components, loading } = this.props;

    return (
      <React.Fragment>
        {
          components && (
            <Media query="(min-width: 1025px)">
              {isDesktop => (
                <PageHeader
                  title={'Data Visualization' || components.displayName}
                  lead={components.description}
                  textAlign="left"
                  collapse={isDesktop}
                />
              )
              }
            </Media>
          )
        }
        <div className="docs-content-area docs-component-overview">
          {loading ? (
            <div className="docs-component-overview__spinner">
              <Spinner />
            </div>
          ) : (
              <React.Fragment>
                {List_GetStart.map((fileName) =>
                  (<AsyncComponent key={fileName}
                    loader={() => import(`../../generated/markdown/getting_started/${fileName}.js`)}
                    Placeholder=''
                  />))
                }
              </React.Fragment>
            )}
        </div>
      </React.Fragment>
    );
  }
}

const mapStateToProps = state => {
  return {
    ...state.componentOverviewReducer,
  };
};

ComponentOverviewPage.propTypes = {
  keyword: PropTypes.string,
  components: PropTypes.object,
  error: PropTypes.string,
  fetchAllComponentData: PropTypes.func.isRequired,
  filterComponentsData: PropTypes.func.isRequired,
  loading: PropTypes.bool,
};

ComponentOverviewPage.defaultProps = {
  error: null,
  loading: false,
};

ComponentOverviewPage.displayName = 'ComponentOverviewPage';

export default connect(
  mapStateToProps,
  { fetchAllComponentData, filterComponentsData }
)(ComponentOverviewPage);
