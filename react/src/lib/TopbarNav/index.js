import React from 'react';
import PropTypes from 'prop-types';
import { List } from '@collab-ui/react';

class TopbarNav extends React.Component {

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