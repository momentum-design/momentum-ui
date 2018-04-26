import React from 'react';
import PropTypes from 'prop-types';
import List from '@collab-ui/react/List';

export default class TopbarNav extends React.Component {
  static displayName = 'TopbarNav';

  render() {
    const { children, className } = this.props;

    return (
      <nav
        className={
          `cui-top-bar__nav` +
          `${(className && ` ${className}`) || ''}`
        }>
        <List tabType='horizontal'>{children}</List>
      </nav>
    );
  }
}

TopbarNav.defaultProps = {
  children: null,
  className: '',
};

TopbarNav.propTypes = {
  /**
   * Children components
   */
  children: PropTypes.node,
  /**
   * CSS classnames
   */
  className: PropTypes.string,
};

