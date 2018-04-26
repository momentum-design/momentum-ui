import React from 'react';
import PropTypes from 'prop-types';
import { Icon, ListSeparator } from '@collab-ui/react';

/**
 * Topbar Mobile
 * @param props
 */
export default class TopbarMobile extends React.Component {
  static displayName = 'TopbarMobile';

  state = {
    isMobileOpen: false,
  };

  handleClick = () => {
    this.setState({
      isMobileOpen: !this.state.isMobileOpen,
    });
  };

  render() {
    const { children, brandNode } = this.props;
    const { isMobileOpen } = this.state;
    const mobileButton = (
      <Icon
        name="list-menu_20"
        className={`cui-top-bar__mobile-menu-button`}
        onClick={() =>
          this.setState({
            isMobileOpen: !isMobileOpen,
          })
        }
        onKeyPress={this.handleKeyPress}
        tabIndex={0}
        aria-pressed={isMobileOpen}
        role="button"
      />
    );
    /* eslint-disable */
    return (
      <div>
        {!isMobileOpen && mobileButton}
        <div
          className={
            `cui-top-bar__mobile cui-tb-mobile` +
            `${isMobileOpen ? ' open' : ''}`
          }
          onClick={this.handleClick}>
          <Icon
            name="cancel_20"
            className="cui-tb-mobile__close"
            tabIndex={0}
            aria-pressed={isMobileOpen}
            role="button"
          />
          {brandNode}
          <ListSeparator />
          <nav className="cui-tb-mobile__nav">{children}</nav>
        </div>
        <div
          className={'cui-tb-mobile__mask' + `${isMobileOpen ? ' open' : ''}`}
          onClick={this.handleClick}
          role="none"
        />
      </div>
    );
  }
}
/* eslint-enable */

TopbarMobile.propTypes = {
  /**
   * Children components
   */
  children: PropTypes.node,
  /**
   * KeyPress Handler
   */
  brandNode: PropTypes.node,
};

TopbarMobile.defaultProps = {
  children: null,
  brandNode: null,
};
