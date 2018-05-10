import React from 'react';
import PropTypes from 'prop-types';
import { AlertContainer, Button, Icon } from '@collab-ui/react';

/**
 * @category communication
 * @component alert
 * @variations collab-ui-react
 */

const Alert = props => {
  const { show, onHide, type, closable,  title, message } = props;

  return (
    show && (
      <AlertContainer className={` cui-alert--${type}`}>
        <div className='cui-alert__icon' />
        <div className={'cui-alert__content'}>
          <div className='cui-alert__title'>{title}</div>
          <div className='cui-alert__message'>{message}</div>
        </div>
        {closable &&
          <div className='cui-alert__button'>
            <Button
              children={<Icon name='cancel_16' />}
              onClick={onHide}
              ariaLabel='close'
              circle
              large
            />
          </div>
        }
      </AlertContainer>
    )
  );
};

Alert.defaultProps = {
  title: '',
  message: '',
  type: 'info',
  closable: false,
  onHide: null,
};

Alert.propTypes = {
  /**
   * optional Alert Title
   */
  title: PropTypes.string,
  /**
   * optional Alert Message
   */
  message: PropTypes.string,
  /**
   * show/hide Alert.
   */
  show: PropTypes.bool.isRequired,
  /**
   * size of the Alert.
   */
  type: PropTypes.oneOf(['info', 'success', 'warning', 'error']),
  /**
   * callback function invoked on close of the Alert. Alert can be closed on click of cross button or esc key.
   * onHide is mandatory props, if not passed Alert can not be closed.
   */
  onHide: PropTypes.func,
  /**
   *  To show/hide Close CTA of the Alert.
   */
  closable: PropTypes.bool,
};

Alert.displayName = 'Alert';

export default Alert;

/**
* @name Alerts
* @description Create the type of Alert (info, success, warning, or error) by passing in the type prop.
*
* @category communication
* @component alert
* @section default
*
* @js

import {
  Button
} from '@collab-ui/react';

export default class Default extends React.PureComponent {
  state = {
    showAlert: false,
    alertType: 'info'
  }

  render() {
    return (
      <section>
        <div>
          <div className='row'>
            <Button
              ariaLabel='Click to Trigger'
              onClick={() => this.setState({ showAlert: true, alertType: 'info' })}
              children='Info/Default'
              ariaLabel='Open Modal'
              color='primary'
              size='large'
            />
          </div>
          <div className='row'>
            <br />
            <Button
              ariaLabel='Click to Trigger'
              onClick={() => this.setState({ showAlert: true, alertType: 'success' })}
              children='Success'
              ariaLabel='Open Modal'
              color='primary'
              size='large'
            />
          </div>
          <div className='row'>
            <br />
            <Button
              ariaLabel='Click to Trigger'
              onClick={() => this.setState({ showAlert: true, alertType: 'warning' })}
              children='Warning'
              ariaLabel='Open Modal'
              color='primary'
              size='large'
            />
          </div>
          <div className='row'>
            <br />
            <Button
              ariaLabel='Click to Trigger'
              onClick={() => this.setState({ showAlert: true, alertType: 'error' })}
              children='Error'
              ariaLabel='Open Modal'
              color='primary'
              size='large'
            />
          </div>
        </div>
        <br />
        <Alert
          type={this.state.alertType}
          show={this.state.showAlert}
          closable
          onHide={() => this.setState({ showAlert: false })}
          title='Alert'
          message={'I\'m an Alert'}
        />
      </section>
    );
  }
}

**/
