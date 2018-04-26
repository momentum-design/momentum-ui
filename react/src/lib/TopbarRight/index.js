import React from 'react';
import PropTypes from 'prop-types';

/**
 * Topbar Right
 * @param props
 */
export default class TopbarRight extends React.PureComponent {
  static displayName = 'TopbarRight';

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

TopbarRight.defaultProps = {
  children: null,
  className: '',
};

TopbarRight.propTypes = {
  /**
   * Children components
   */
  children: PropTypes.node,
  /**
   * CSS classnames
   */
  className: PropTypes.string,
};
