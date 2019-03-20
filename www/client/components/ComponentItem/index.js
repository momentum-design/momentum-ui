import React from 'react';
import PropTypes from 'prop-types';
import { NavLink } from 'react-router-dom';

class ComponentItem extends React.PureComponent {
  static displayName = 'ComponentItem';

  render() {
    const { route, thumbnail, title } = this.props;

    return (
      <NavLink to={route} className="docs-component-item--link cui-link">
        <div className="docs-component-item">
          <div
            className="docs-component-item--thumbnail"
            style={{
              backgroundImage: thumbnail && `url(${thumbnail})`,
            }}
          />
          <div className="docs-component-item--info">
            {title && (
              <h5 className="docs-component-item--info__title">{title}</h5>
            )}
          </div>
        </div>
      </NavLink>
    );
  }
}

ComponentItem.defaultProps = {
  route: '',
  thumbnail: '',
  title: '',
};

ComponentItem.propTypes = {
  route: PropTypes.string,
  thumbnail: PropTypes.oneOfType([PropTypes.string, PropTypes.bool]),
  title: PropTypes.string.isRequired,
};

export default ComponentItem;