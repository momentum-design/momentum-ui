import PropTypes from 'prop-types';
import React from 'react';
import { Button } from '@momentum-ui/react';
import { connect } from 'react-redux';
import { InputSearch, Spinner } from '@momentum-ui/react';
import ComponentItem from '../../components/ComponentItem';
import { fetchAllComponentData, filterComponentsData } from './actions';
import SectionHeader from '../../components2020/SectionHeader';
import PageHero from '../../components2020/PageHero';

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

      return components.children.reduce((agg, itm, idx) => {
        const name = itm.displayName.toLowerCase();
        const reg = new RegExp(keyword);
        if (keyword == '' || reg.test(name)) {
          return [
            ...agg,
            <li
              key={idx}
            >
              <ComponentItem
                route={itm.path}
                thumbnail={itm.thumbnailImage}
                title={itm.displayName}
              />
            </li>
          ];
        } else return agg;
      }, []);
    };

    return (
      <div className="site-con">
        <PageHero
          backgroundColor='#BCF7BF'
          backgroundImage='/assets/2020/banner-components.svg'
          backgroundSize='700px'
          figmaURL='https://www.figma.com/file/FKFSq0HQpjp8wYHnQDBRum/Web?node-id=0%3A1'
          githubURL='https://github.com/momentum-design/momentum-ui/tree/master/react/src/lib'
          heroTitle='Components'
        />
        <div className='site-warp'>
          <SectionHeader
            title="Components"
            leadStr="Our components library helps designers and developers build consistent, accessible, and universal experiences. Using our components frees you up to focus on solving collaboration challenges without having to reinvent element after element.

            The components below are a selection of our most used elements from across the Webex system. Find your platform’s full library in Figma."
          />

          <div className="docs-component-overview">
            {loading ? (
              <div className="docs-component-overview__spinner">
                <Spinner />
              </div>
            ) : (
              <React.Fragment>
                {/* Uncomment for the filter bar */}
                {/* <div className="docs-component-overview__top">
                  <InputSearch
                    clear
                    name="filterSearchInput"
                    htmlId="filterSearchInput"
                    shape="pill"
                    onChange={this.handleSearchInput}
                    value={keyword}
                  />
                </div> */}
                <ul className="docs-component-overview__component-list">
                  {renderComponentItems()}
                </ul>
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
