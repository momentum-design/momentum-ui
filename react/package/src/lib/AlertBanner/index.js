/** @component alert-banner */

import React from 'react';
import PropTypes from 'prop-types';
import { Icon } from '@momentum-ui/react';

const AlertBanner = props => {
  const {
    className,
    closable,
    closeBtnProps,
    children,
    onHide,
    onKeyDownClose,
    show,
    type,
    ...otherProps
  } = props;

  const handleKeyDown = e => {
    if (
      e.which === 32 
      || e.charCode === 32 
      || e.which === 13
      || e.charCode === 13
      ) {
      onHide && onHide(e);
      e.preventDefault();
    }

    onKeyDownClose && onKeyDownClose(e);
  };

  return (
    show && (
      <div 
        className={
          `md-alert-banner` +
          ` md-alert-banner--${type}` +
          `${(className && ` ${className}`) || ''}`
        }
        {...otherProps}
      >
        <div className='md-alert-banner__text'>
          {children}
        </div>
        {closable && (
          <div
            className='md-alert-banner__close'
            {...onHide && { onClick: e => onHide(e) }}
            {...(onHide || onKeyDownClose) && {
              onKeyDown: e => handleKeyDown(e),
              role: 'button',
              tabIndex: 0
            }}
            {...closeBtnProps}
          >
            <Icon name='cancel_16'/>
          </div>
        )}
      </div>
    )
  );
};

AlertBanner.defaultProps = {
  children: null,
  className: '',
  closable: false,
  closeBtnProps: null,
  onKeyDownClose: null,
  onHide: null,
  type: 'info',
};

AlertBanner.propTypes = {
  /** @prop Optional css class string | '' */
  className: PropTypes.string,
  /** @prop Sets the visibility of AlertBanner's close button | false */
  closable: PropTypes.bool,
  /** @prop Props to be passed to close button | null */
  closeBtnProps: PropTypes.object,
  /** @prop Children nodes to render inside AccordionHeader | null  */
  children: PropTypes.node,
  /** @prop Invoked when the user presses on the AlertBanner's close button | null */
  onHide: PropTypes.func,
  /** @prop Optional callback function invoked on keydown of close button | null */
  onKeyDownClose: PropTypes.func,
  /** @prop Set AlertBanner visibility */
  show: PropTypes.bool.isRequired,
  /** @prop Sets the AlertBanner type | 'info' */
  type: PropTypes.oneOf(['info', 'warning', 'error']),
};

AlertBanner.displayName = 'AlertBanner';

export default AlertBanner;
