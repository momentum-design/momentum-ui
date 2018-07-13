import React from 'react';
import PropTypes from 'prop-types';
import { Icon, ListSeparator } from '@collab-ui/react';

/**
 * Topbar Mobile
 * @param props
 */
class TopbarMobile extends React.Component {
  static displayName = 'TopbarMobile';

  state = {
    isMobileOpen: false,
  };

  handleClick = () => {
    this.setState({
      isMobileOpen: !this.state.isMobileOpen,
    });
  };

  handleKeyDown = e => {
    if (
      e.which === 32 
        || e.which === 13
        || e.charCode === 32
        || e.charCode === 13
      ) {
      this.handleClick();
      e.preventDefault();
    }
  };

  render() {
    const {
      brandNode,
      children,
      closeMenuAriaLabel,
      openMenuAriaLabel,
    } = this.props;
    const { isMobileOpen } = this.state;

    const mobileButton = (
      <Icon
        name='list-menu_20'
        buttonClassName='cui-top-bar__mobile-menu-button'
        onClick={this.handleClick}
        ariaLabel={openMenuAriaLabel}
        aria-pressed={isMobileOpen}
      />
    );

    return (
      <div>
        {!isMobileOpen && mobileButton}
        <div
          className={
            'cui-top-bar__mobile cui-tb-mobile' +
            `${isMobileOpen ? ' open' : ''}`
          }
          onClick={this.handleClick}
          onKeyDown={this.handleKeyDown}
          role='menu'
          tabIndex={0}
        >
          <Icon
            name='cancel_20'
            buttonClassName='cui-tb-mobile__close'
            aria-pressed={isMobileOpen}
            onClick={this.handleClick}
            ariaLabel={closeMenuAriaLabel}
          />
          {brandNode}
          <ListSeparator />
          <nav className='cui-tb-mobile__nav'>{children}</nav>
        </div>
        <div
          className={'cui-tb-mobile__mask' + `${isMobileOpen ? ' open' : ''}`}
          onClick={this.handleClick}
          role='none'
        />
      </div>
    );
  }
}

TopbarMobile.propTypes = {
  /** Brand Node */
  brandNode: PropTypes.node,
  /** Children components */
  children: PropTypes.node,
  /** Aria Label for close Button */
  closeMenuAriaLabel: PropTypes.string,
  /** Aria Label for open Button */
  openMenuAriaLabel: PropTypes.string,
};

TopbarMobile.defaultProps = {
  brandNode: null,
  children: null,
  closeMenuAriaLabel: 'Close Menu',
  openMenuAriaLabel: 'Open Menu',
};

export default TopbarMobile;