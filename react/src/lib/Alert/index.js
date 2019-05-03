/** @component alert */

import React from 'react';
import PropTypes from 'prop-types';
import {
  Button,
  Icon,
} from '@momentum-ui/react';

class Alert extends React.PureComponent {
  render () {
    const {
      className,
      closable,
      dismissBtnProps,
      message,
      show,
      title,
      type,
      ...otherProps
    } = this.props;

    return (
      show && (
        <div 
          className={
            'md-alert' + 
            ` md-alert--${type}` +
            `${(className && ` ${className}`) || ''}`
          }
          {...otherProps}
        >
          <div className='md-alert__icon' />
          <div className='md-alert__content'>
            <div className='md-alert__title'>
              {title}
            </div>
            <div className='md-alert__message'>
              {message}
            </div>
          </div>
          {closable &&
            <div className='md-alert__button'>
              <Button
                circle
                size={44}
                {...dismissBtnProps}
              >
                <Icon name='cancel_16' />
              </Button>
            </div>
          }
        </div>
      )
    );

  }
}

Alert.defaultProps = {
  dismissBtnProps: null,
  closable: true,
  message: '',
  title: '',
  type: 'info',
};

Alert.propTypes = {
  /** @prop Props to be passed to dismiss button | null */
  dismissBtnProps: PropTypes.object,
  /** @prop Optional css class string | '' */
  className: PropTypes.string,
  /** @prop To show/hide Close button of the Alert | true */
  closable: PropTypes.bool,
  /** @prop Optional Alert message | '' */
  message: PropTypes.string,
  /** @prop Set Alert visibility */
  show: PropTypes.bool.isRequired,
  /** @prop Optional Alert title | '' */
  title: PropTypes.string,
  /** @prop Sets the type of the Alert | 'info' */
  type: PropTypes.oneOf(['info', 'success', 'warning', 'error']),
};

Alert.displayName = 'Alert';

export default Alert;
