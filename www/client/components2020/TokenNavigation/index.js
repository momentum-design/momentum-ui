import React from 'react';
import PropTypes from 'prop-types';
import Icon from '@momentum-ui/react/lib/Icon';

class TokenNavigation extends React.PureComponent {

  render() {
    const {
      leftNav,
      rightNav
    } = this.props;

    return (
      <div className="token-navigation-container">
        {leftNav && (
          <div className="token-navigation-container_left">
            <div className="token-navigation-container_left-label">
              Previous
            </div>
            <div>
              <a className="token-navigation-container_left-link" href={leftNav.url}><Icon name="icon-arrow-left_32" />{leftNav.label}</a>
            </div>
          </div>
        )}

        <div className="token-navigation-container_divider"></div>
        
        {rightNav && (
          <div className="token-navigation-container_right">
            <div className="token-navigation-container_right-label">
              Next
            </div>
            <div>
              <a className="token-navigation-container_right-link" href={rightNav.url}>{rightNav.label}<Icon name="icon-arrow-right_32" /></a>
            </div>
          </div>
        )}
      </div>
    );
  }

}

TokenNavigation.defaultProps = {
  leftNav: null,
  rightNav: null,
};

TokenNavigation.propTypes = {
  /** @prop The data points for the left navigation | null */
  leftNav: PropTypes.shape({
    label: PropTypes.string,
    url: PropTypes.string,
  }),
  /** @prop The datapoints for the right navigation | null */
  rightNav: PropTypes.shape({
    label: PropTypes.string,
    url: PropTypes.string,
  }),
};

TokenNavigation.displayName = 'TokenNavigation';

export default TokenNavigation;
