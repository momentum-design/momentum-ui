/** @component alert */

import React from 'react';
import PropTypes from 'prop-types';
import {
  Button,
  Icon,
} from '@momentum-ui/react';

const Alert = props => {
  const {
    closable,
    message,
    onHide,
    show,
    title,
    type,
    ...otherProps
  } = props;

  return (
    show && (
      <div className={`md-alert md-alert--${type}`}>
        <div className='md-alert__icon' />
        <div className={'md-alert__content'}>
          <div className='md-alert__title'>{title}</div>
          <div className='md-alert__message'>{message}</div>
        </div>
        {closable &&
          <div className='md-alert__button'>
            <Button
              circle
              onClick={onHide}
              size={44}
              {...otherProps}
            >
              <Icon name='cancel_16' />
            </Button>
          </div>
        }
      </div>
    )
  );
};

Alert.defaultProps = {
  closable: false,
  message: '',
  onHide: null,
  title: '',
  type: 'info',
};

Alert.propTypes = {
  /** @prop To show/hide Close button of the Alert | false */
  closable: PropTypes.bool,
  /** @prop Optional Alert message | '' */
  message: PropTypes.string,
  /** @prop Mandatory handler invoked when the user presses on the Alert's close button or hit's the esc key | null */
  onHide: PropTypes.func,
  /** @prop Set Alert visibility */
  show: PropTypes.bool.isRequired,
  /** @prop Optional Alert title | '' */
  title: PropTypes.string,
  /** @prop Sets the type of the Alert | 'info' */
  type: PropTypes.oneOf(['info', 'success', 'warning', 'error']),
};

Alert.displayName = 'Alert';

export default Alert;
