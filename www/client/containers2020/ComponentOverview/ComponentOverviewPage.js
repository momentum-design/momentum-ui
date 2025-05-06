import PropTypes from 'prop-types';
import React from 'react';
import { connect } from 'react-redux';
import { InputSearch, Spinner } from '@momentum-ui/react';
import ComponentItem from '../../components2020/ComponentItem';
import { fetchAllComponentData, filterComponentsData } from './actions';
import SectionHeader from '../../components2020/SectionHeader';
import locale from './locale';

class ComponentOverviewPage extends React.Component {
  componentDidMount() {
    const { components, fetchAllComponentData } = this.props;

    if(!components) {
      fetchAllComponentData();
    }
  }

  componentDidUpdate(prevProps) {
    const { components, fetchAllComponentData } = this.props;

    if(prevProps.components !== components && !components) {
      fetchAllComponentData();
    }
  }

  handleSearchInput = e => {
    const value = e.target.value;
    this.props.filterComponentsData(value);
  };

  render() {
    const { components, keyword, loading } = this.props;

    const componentsPath = '/2020/components';

    const renderComponentItems = () => {
      const { components, keyword } = this.props;

      if (!components ||!components.children) return (<div>There are no components</div>);

      return components.children.reduce((agg, itm, idx) => {
        const name = itm.displayName.toLowerCase();
        const reg = new RegExp(keyword);
        if (keyword == '' || reg.test(name)) {
          return [
            ...agg,
            <div
              key={idx}
            >
              <ComponentItem
                route={itm.path}
                thumbnail={itm.thumbnailImage}
                title={itm.displayName}
              />
            </div>
          ];
        } else return agg;
      }, []);
    };

    return (
      <div className="site-con page-body-buffer">
        <div className='site-warp'>
          <SectionHeader
            className="site-component-overview__section-header"
            titleElm={locale.sectionHeaders.components.title}
            leadElm={locale.sectionHeaders.components.body}
          />

          <div className="site-component-overview">
            {loading ? (
              <div className="site-component-overview__spinner">
                <Spinner />
              </div>
            ) : (
              <React.Fragment>
                <div className="site-component-overview__top">
                  <InputSearch
                    clear
                    name="filterSearchInput"
                    htmlId="filterSearchInput"
                    shape="pill"
                    onChange={this.handleSearchInput}
                    value={keyword}
                    placeholder="Search"
                  />
                </div>
                <div className="site-component-overview__component-list">
                  {renderComponentItems()}
                </div>
              </React.Fragment>
            )}
          </div>
        </div>
      </div>
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
