import React from 'react';
import PropTypes from 'prop-types';
import {
  Button,
  Icon,
} from '@collab-ui/react';

/**
 * @category communication
 * @component alert
 * @variations collab-ui-react
 */

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
      <div className={`cui-alert cui-alert--${type}`}>
        <div className='cui-alert__icon' />
        <div className={'cui-alert__content'}>
          <div className='cui-alert__title'>{title}</div>
          <div className='cui-alert__message'>{message}</div>
        </div>
        {closable &&
          <div className='cui-alert__button'>
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

/**
* @component alert
* @section default
*
* @react

import {
  Alert,
  AlertContainer,
  Button
} from '@collab-ui/react';

export default class Default extends React.PureComponent {
  state = {
    alertMessage: 'Who\'s awesome?  You are!'
  }

  render() {
    let alertContainer;
    return (
      <section>
        <div>
          <div className='row'>
            <Button
              ariaLabel='Click to Open'
              onClick={() => alertContainer.info(
                'Alert',
                this.state.alertMessage,
                () => console.log('onHide info'),
                { ariaLabel: 'Close Alert' }
              )}
              children='Info/Default'
              color='primary'
            />
          </div>
        </div>
        <br />
        <AlertContainer
          ref={ref => alertContainer = ref}
          orderNewest={false}
        />
      </section>
    );
  }
}

**/

/**
* @component alert
* @section success
*
* @react

import {
  Alert,
  AlertContainer,
  Button
} from '@collab-ui/react';

export default class Default extends React.PureComponent {
  state = {
    alertMessage: 'Who\'s awesome?  You are!'
  }

  render() {
    let alertContainer;
    return (
      <section>
        <div>
          <div className='row'>
            <br />
            <Button
              ariaLabel='Click to Open'
              onClick={() => alertContainer.success(
                'Alert',
                this.state.alertMessage,
                () => console.log('onHide info'),
                { ariaLabel: 'Close Alert' }
              )}
              children='Success'
              color='primary'
            />
          </div>
        </div>
        <br />
        <AlertContainer
          ref={ref => alertContainer = ref}
          orderNewest={false}
        />
      </section>
    );
  }
}

**/

/**
* @component alert
* @section warning
*
* @react

import {
  Alert,
  AlertContainer,
  Button
} from '@collab-ui/react';

export default class Default extends React.PureComponent {
  state = {
    alertMessage: 'Who\'s awesome?  You are!'
  }

  render() {
    let alertContainer;
    return (
      <section>
        <div>
          <div className='row'>
            <br />
            <Button
              ariaLabel='Click to Open'
              onClick={() => alertContainer.warning(
                'Alert',
                this.state.alertMessage,
                () => console.log('onHide info'),
                { ariaLabel: 'Close Alert' }
              )}
              children='Warning'
              color='primary'
            />
          </div>
        </div>
        <br />
        <AlertContainer
          ref={ref => alertContainer = ref}
          orderNewest={false}
        />
      </section>
    );
  }
}

**/

/**
* @component alert
* @section error
*
* @react

import {
  Alert,
  AlertContainer,
  Button
} from '@collab-ui/react';

export default class Default extends React.PureComponent {
  state = {
    alertMessage: 'Who\'s awesome?  You are!'
  }

  render() {
    let alertContainer;
    return (
      <section>
        <div>
          <div className='row'>
            <br />
            <Button
              ariaLabel='Click to Open'
              onClick={() => alertContainer.error(
                'Alert',
                this.state.alertMessage,
                () => console.log('onHide info'),
                { ariaLabel: 'Close Alert' }
              )}
              children='Error'
              color='primary'
            />
          </div>
        </div>
        <br />
        <AlertContainer
          ref={ref => alertContainer = ref}
          orderNewest={false}
        />
      </section>
    );
  }
}

**/
