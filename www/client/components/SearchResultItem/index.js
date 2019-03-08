import React from 'react';
import PropTypes from 'prop-types';
import { NavLink } from 'react-router-dom';

class SearchResultItem extends React.PureComponent {
  static displayName = 'SearchResultItem';

  render() {
    const {
      displayName,
      description,
      path,
      thumbnailImage,
      url
    } = this.props;

    return (
      <div className="docs-search-result-item">
        {thumbnailImage && (
          <div
            className="docs-search-result-item--thumbnail"
            style={{ backgroundImage: `url(${thumbnailImage})` }}
          />
        )}
        <div>
          {displayName && <h5>{displayName}</h5>}
          <NavLink to={path} className="cui-link">
            {url}
          </NavLink>
          {description && <h6>{description}</h6>}
        </div>
      </div>
    );
  }
}

SearchResultItem.defaultProps = {
  displayName: '',
  description: '',
  path: '',
  thumbnailImage: false,
  url: '',
};

SearchResultItem.propTypes = {
  displayName: PropTypes.string,
  description: PropTypes.string,
  path: PropTypes.string.isRequired,
  thumbnailImage: PropTypes.oneOfType([PropTypes.string, PropTypes.bool]),
  url: PropTypes.string.isRequired,
};

export default SearchResultItem;