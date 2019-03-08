import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Spinner } from '@collab-ui/react';
import { fetchSearchResultsData } from './actions';
import SearchResultItem from '../../components/SearchResultItem';
import PageHeader from '../../collab-ui/PageHeader';
import _ from 'lodash';
import Media from 'react-media';

class SearchResults extends React.Component {
  componentDidMount() {
    this.props.fetchSearchResultsData();
  }

  renderSearchResultItems = () => {
    const { results } = this.props;

    return results.map((itm, idx) => {
      return (
        <SearchResultItem
          key={idx}
          displayName={itm.displayName}
          description={itm.description}
          path={itm.path}
          thumbnailImage={itm.thumbnailImage}
          url={itm.url}
        />
      );
    });
  };

  render() {
    const {
      results,
      loading,
      keyword,
    } = this.props;

    return (
      <React.Fragment>
        <Media query="(min-width: 1025px)">
          {isDesktop => (
              <PageHeader
                title={`Results for "${keyword}"`}
                textAlign="left"
                collapse={isDesktop}
              />
            )
          }
        </Media>
        <div className="docs-content-area docs-search-results">
          {loading ? (
            <div className="docs-search-results__spinner">
              <Spinner />
            </div>
          ) : (
            <React.Fragment>
              <div className="docs-search-results__count">
                {`Showing ${results.length} ${results.length > 1 ? 'results' : 'result'}`}
              </div>
              <div>
                {this.renderSearchResultItems()}
              </div>
            </React.Fragment>
          )}
        </div>
      </React.Fragment>
    );
  }
}

const mapStateToProps = state => {
  return {
    keyword: _.result(
      _.chain(state.router.location.search)
        .replace('?', '')
        .split('&')
        .map(_.partial(_.split, _, '=', 2))
        .fromPairs()
        .value(),
      'q',
      ''
    ),
    ...state.searchResultsReducer,
  };
};

SearchResults.propTypes = {
  keyword: PropTypes.string,
  results: PropTypes.array,
  error: PropTypes.string,
  fetchSearchResultsData: PropTypes.func.isRequired,
  loading: PropTypes.bool,
};

SearchResults.defaultProps = {
  error: null,
  loading: false,
};

SearchResults.displayName= 'SearchResults';

export default connect(
  mapStateToProps,
  { fetchSearchResultsData }
)(SearchResults);
