/** @component menu */

import React from 'react';
import { findDOMNode } from 'react-dom';
import PropTypes from 'prop-types';
import omit from 'lodash/omit';
import { UIDReset } from 'react-uid';
import { EventOverlay } from '@momentum-ui/react';
import MenuContext from '../MenuContext';

class MenuOverlay extends React.Component {
  state = {
    isOpen: false,
  };

  componentDidUpdate(prevProps, prevState) {
    const { focusFirstQuery } = this.props;
    const { isOpen } = this.state;
    
    if(!prevState.isOpen && prevState !== isOpen && focusFirstQuery) {
      const overlay = findDOMNode(this.menuOverlay);
      const focusElement = overlay && overlay.querySelector(focusFirstQuery);
      
      focusElement
        && focusElement.focus();
    }
  }

  onSelect = (e, opts) => {
    const { onSelect } = this.props;
    const { eventKey, element } = opts;
    const { keepMenuOpen } = element.props;

    onSelect && onSelect(e, {eventKey, element});
    element.constructor.displayName !== 'SubMenu'
      && !keepMenuOpen
      && this.handleClose();
  };

  handleClose = () => {
    this.setState({ isOpen: false });
  };

  render() {
    const {
      children,
      className,
      menuTrigger,
      showArrow,
      ...props
    } = this.props;

    const { isOpen } = this.state;

    const otherProps = omit({...props}, [
      'focusFirstQuery',
      'onSelect'
    ]);

    const setMenuTrigger = () => React.cloneElement(menuTrigger, {
      onClick: () => this.setState({ isOpen: !isOpen }),
      ref: ref => this.anchorNode = ref,
    });

    return (
      <div
        className={
          'md-menu-overlay-wrapper' +
          `${(className && ` ${className}`) || ''}`
        }
      >
        {setMenuTrigger()}
        {
          isOpen &&
          <EventOverlay
            allowClickAway
            anchorNode={this.anchorNode}
            className='md-menu-overlay'
            close={this.handleClose}
            isOpen={isOpen}
            ref={ref => this.menuOverlay = ref}
            showArrow={showArrow}
            {...otherProps}
          >
            <MenuContext.Provider value={{ parentOnSelect: this.onSelect }}>
              <UIDReset>
                {children}
              </UIDReset>
            </MenuContext.Provider>
          </EventOverlay>
        }
      </div>
    );
  }
}

MenuOverlay.propTypes = {
  /** @prop Children nodes to render inside MenuOverlay | null */
  children: PropTypes.node,
  /** @prop Optional css class name | '' */
  className: PropTypes.string,
  /** @prop Queries children to find matching item to have focus | '' */
  focusFirstQuery: PropTypes.string,
  /** @prop HTML element that provides control to MenuOverlay user  */
  menuTrigger: PropTypes.element.isRequired,
  /** @prop Callback function invoked when user selects MenuOverlay | null */
  onSelect: PropTypes.func,
  /** @prop Determines if the MenuOverlay should show the open/close arrow | true */
  showArrow: PropTypes.bool,
};

MenuOverlay.defaultProps = {
  children: null,
  className: '',
  focusFirstQuery: '',
  onSelect: null,
  showArrow: true,
};

MenuOverlay.displayName = 'MenuOverlay';

export default MenuOverlay;
