import React from 'react';
import PropTypes from 'prop-types';
import { Alert } from '@collab-ui/react';
import {
  bind,
  reject,
  uniqueId
} from 'lodash';

class AlertContainer extends React.Component {
  static displayName = 'AlertContainer';

  state = {
    alertList: []
  }

  info = (title, message, onHide, otherProps) => {
    this.handleAlert(
      title,
      message,
      onHide,
      'info',
      otherProps
    );
  }

  success = (title, message, onHide, otherProps) => {
    this.handleAlert(
      title,
      message,
      onHide,
      'success',
      otherProps
    );
  }

  warning = (title, message, onHide, otherProps) => {
    this.handleAlert(
      title,
      message,
      onHide,
      'warning',
      otherProps
    );
  }

  error = (title, message, onHide, otherProps) => {
    this.handleAlert(
      title,
      message,
      onHide,
      'error',
      otherProps
    );
  }

  handleAlert = (title, message, onHide, type, otherProps) => {
    const { orderNewest } = this.props;
    const key = uniqueId('alert_');
    const nextAlert = {
      key,
      title: title,
      message: message,
      onHide: bind(this.handleOnHide, this, key, onHide),
      type: type,
      show: true,
      closable: true,
      otherProps
    };

    this.setState(state => ({
      alertList: orderNewest
        ? [nextAlert, ...state.alertList]
        : [...state.alertList, nextAlert]
    }));
  }

  handleOnHide = (key, onHide, e) => {
    this.setState(state => {
      onHide && onHide(e);
      return { alertList: reject(state.alertList, {key}) };
    });
  }

  render() {
    const { position } = this.props;
    return (
      <div className={`cui-alert__container cui-alert__container--${position}`} role='alert'>
        {
          this.state.alertList.map(alert => (
            <Alert
              key={alert.key}
              title={alert.title}
              message={alert.message}
              type={alert.type}
              show={alert.show}
              closable={alert.closable}
              onHide={alert.onHide}
              {...alert.otherProps}
            />
          ))
        }
      </div>
    );
  }
}

AlertContainer.defaultProps = {
  orderNewest: true,
  position: 'bottom-right'
};

AlertContainer.propTypes = {
  /** @prop Display newest alert messages first | true */
  orderNewest: PropTypes.bool,
  /** @prop Define alert's position with css class name: 'bottom-right' */
  position: PropTypes.oneOf(['top-left', 'top-center', 'top-right', 'bottom-left', 'bottom-center', 'bottom-right'])
};

export default AlertContainer;
