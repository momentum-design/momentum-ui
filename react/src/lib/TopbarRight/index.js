import React from 'react';
import PropTypes from 'prop-types';

/**
 * Topbar Right
 * @param props
 */
class TopbarRight extends React.PureComponent {

  render() {
    const { className, children } = this.props;
    return (
      <div
        className={
          `cui-top-bar__right` +
          `${(className && ` ${className}`) || ''}`
        }>
        {children}
      </div>
    );
  }
}

TopbarRight.propTypes = {
  /** @prop Children node to render inside of TopbarRight | null */
  children: PropTypes.node,
  /** @prop Optional CSS class string | '' */
  className: PropTypes.string,
};

TopbarRight.defaultProps = {
  children: null,
  className: '',
};

TopbarRight.displayName = 'TopbarRight';

export default TopbarRight;