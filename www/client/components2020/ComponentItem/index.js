import React from 'react';
import PropTypes from 'prop-types';
import { NavLink } from 'react-router-dom';

class ComponentItem extends React.PureComponent {
  static displayName = 'ComponentItem';

  render() {
    const { route, thumbnail, title } = this.props;

    return (
      <NavLink to={route} className="site-component-item--link md-link">
        <div className="site-component-item">
          <div className="site-component-item--info">
            {title && (
              <h4 className="site-component-item--info__title">{title}</h4>
            )}
          </div>
          <div
            className="site-component-item--thumbnail"
            style={{
              backgroundImage: thumbnail && `url(${thumbnail})`,
            }}
          />
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
