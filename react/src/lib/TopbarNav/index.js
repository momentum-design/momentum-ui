/** @component topbar */

import React from 'react';
import PropTypes from 'prop-types';
import { List } from '@momentum-ui/react';
import { prefix } from '../utils/index';

class TopbarNav extends React.Component {
  render() {
    const {
      children,
      className,
      ...otherProps
    } = this.props;

    return (
      <nav
        className={
          `${prefix}-top-bar__nav` +
          `${className && ` ${className}` || ''}`
        }
        {...otherProps}
      >
        <List tabType='horizontal'>{children}</List>
      </nav>
    );
  }
}

TopbarNav.propTypes = {
  /** @prop Children node to render inside of TopbarNav | null */
  children: PropTypes.node,
  /** @prop Optional CSS class string | '' */
  className: PropTypes.string,
};

TopbarNav.defaultProps = {
  children: null,
  className: '',
};

TopbarNav.displayName = 'TopbarNav';

export default TopbarNav;
