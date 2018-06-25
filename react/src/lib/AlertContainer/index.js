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

  info = (title, message, onHide) => {
    this.handleAlert(
      title,
      message,
      onHide,
      'info'
    );
  }

  success = (title, message, onHide) => {
    this.handleAlert(
      title,
      message,
      onHide,
      'success'
    );
  }

  warning = (title, message, onHide) => {
    this.handleAlert(
      title,
      message,
      onHide,
      'warning'
    );
  }

  error = (title, message, onHide) => {
    this.handleAlert(
      title,
      message,
      onHide,
      'error'
    );
  }

  handleAlert = (title, message, onHide, type) => {
    const { orderNewest } = this.props;
    const key = uniqueId('alert_');
    const nextAlert = {
      key,
      title: title,
      message: message,
      onHide: bind(this.handleOnHide, this, key, onHide),
      type: type,
      show: true,
      closable: true
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
  /** Display new alert messages at the top or bottom of the queue */
  orderNewest: PropTypes.bool,
  /** Position alert will display */
  position: PropTypes.oneOf(['top-left', 'top-center', 'top-right', 'bottom-left', 'bottom-center', 'bottom-right'])
};

export default AlertContainer;
