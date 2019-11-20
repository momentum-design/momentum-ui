import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { 
  Badge,
  InputSearch,
  Spinner,
  Tab,
  TabContent,
  TabList,
  TabPane,
  Tabs } from '@momentum-ui/react';
import { fetchAllComponentData, filterComponentsData } from './actions';
import ComponentItem from '../../components/ComponentItem';
import PageHeader from '../../momentum-ui/PageHeader';
import Media from 'react-media';
import componentListCore from '../../data/component-list-core.json';
import componentListReact from '../../data/component-list-react.json';
import componentListAngular from '../../data/component-list-angular.json';
import componentListVue from '../../data/component-list-vue.json';

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

    const badge = availiable => {
      return availiable ? <Badge color="green-pastel">Stable</Badge> : '';
    };

    const row = () => {
      const { components } = this.props;
      return components.children.reduce((agg, itm, idx) => {
        return [
          ...agg,
          <tr key={idx}>
            <td>{itm.displayName}</td>
            <td>{badge(componentListCore.indexOf(itm.name) > -1)}</td>
            <td>{badge(componentListReact.indexOf(itm.name) > -1)}</td>
            <td>{badge(componentListAngular.indexOf(itm.name) > -1)}</td>
            <td>{badge(componentListVue.indexOf(itm.name) > -1)}</td>
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
                  title={components.displayName}
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
            <Tabs justified>
              <TabList>
                <Tab
                  heading='Overview'
                />
                <Tab
                  heading='Status'
                />
              </TabList>
              <TabContent>
                <TabPane>
                  <div className="docs-component-overview__top">
                    <InputSearch
                      clear
                      name="filterSearchInput"
                      htmlId="filterSearchInput"
                      shape="pill"
                      onChange={this.handleSearchInput}
                      value={keyword}
                    />
                  </div>
                  <ul className="docs-component-overview__component-list">
                    {renderComponentItems()}
                  </ul>
                </TabPane>
                <TabPane>
                  <table className="docs-component-overview__table">
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
                </TabPane>
              </TabContent>
            </Tabs>
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
