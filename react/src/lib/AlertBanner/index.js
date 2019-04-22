/** @component alert-banner */

import React from 'react';
import PropTypes from 'prop-types';
import { Icon } from '@collab-ui/react';

const AlertBanner = props => {
  const { show, type, closable, children, onHide } = props;

  const handleKeyPress = e => {
    e.preventDefault();
    if (e.which === 32 || e.which === 13) {
      return onHide(e);
    } else if (e.charCode === 32 || e.charCode === 13) {
      return onHide(e);
    }
  };

  return (
    show && (
      <div type={type}>
        <div className={`md-alert-banner ` + `md-alert-banner--${type}`}>
            <div className="md-alert-banner__text">{children}</div>
          {closable && (
            <div
              className="md-alert-banner__close"
              onClick={onHide}
              tabIndex={0}
              onKeyPress={handleKeyPress}
              role={'button'}
            >
              <Icon name="cancel_16"/>
            </div>
          )}
        </div>
      </div>
    )
  );
};

AlertBanner.defaultProps = {
  children: null,
  type: 'info',
  closable: false,
  onHide: () => {},
};

AlertBanner.propTypes = {
  /** @prop Set AlertBanner visibility */
  show: PropTypes.bool.isRequired,
  /** @prop Children nodes to render inside AccordionHeader | null  */
  children: PropTypes.node,
  /** @prop Sets the AlertBanner type | 'info' */
  type: PropTypes.oneOf(['info', 'warning', 'error']),
  /** @prop Mandatory handler invoked when the user presses on the AlertBanner's close button or hit's the esc key | () => {} */
  onHide: PropTypes.func,
  /** @prop Sets the visibility of AlertBanner's close button | false */
  closable: PropTypes.bool,
};

AlertBanner.displayName = 'AlertBanner';

export default AlertBanner;
