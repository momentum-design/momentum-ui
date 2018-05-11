import React from 'react';
import PropTypes from 'prop-types';
import { AlertContainer, Avatar, Button, Icon } from '@collab-ui/react';

/**
 * @category communication
 * @component alert-call
 * @variations collab-ui-react
 */

const AlertCall = props => {
  const { caller, onAnswerVideo, onAnswerVoice, onReject, show, title } = props;

  const getAvatar = () => {
    switch(caller.type) {
      case 'number': return <Avatar title='#' alt={caller.title} size='xlarge'/>;
      case 'device': return <Avatar icon={<Icon name='spark-board_32' />} alt={caller.title} size='xlarge'/>;
      default: return <Avatar title={caller.title} alt={caller.title} size='xlarge'/> ;
    }
  };

  return (
    show && (
      <AlertContainer className='cui-alert--call'>
        <div className='cui-alert__title'>
          {title}
        </div>
        <div className='cui-alert__caller'>
          {getAvatar()}
          <div className='cui-alert__caller-title'>
            {caller.title}
          </div>
          <div className='cui-alert__caller-subtitle'>
            {caller.alt}
          </div>
        </div>
        <div className='cui-alert--call--buttons'>
          <Button
            children={<Icon name='camera_24'/>}
            onClick={onAnswerVideo}
            ariaLabel='answer call with voice and video'
            color='green'
            circle
            large
          />
          <Button
            children={<Icon name='handset_24'/>}
            onClick={onAnswerVoice}
            ariaLabel='answer call with voice only'
            color='green'
            circle
            large
          />
          <Button
            children={<Icon name='cancel_24'/>}
            onClick={onReject}
            ariaLabel='reject call'
            color='red'
            circle
            large
          />
        </div>
      </AlertContainer>
    )
  );
};

AlertCall.defaultProps = {
  caller: null,
  title: '',
  onRejectCall: null,
  onVoiceCall: null,
  onVideoCall: null,
};

AlertCall.propTypes = {
  /**
   * required caller object
   */
  caller: PropTypes.shape({
    title: PropTypes.string.isRequired,
    alt: PropTypes.string,
    src: PropTypes.string,
    type: PropTypes.oneOf(['', 'number', 'device']),
  }).isRequired,
  /**
   * callback function invoked when the reject button is clicked.
   */
  onRejectCall: PropTypes.func,
  /**
   * callback function invoked when the handset button is clicked.
   */
  onAnswerVoice: PropTypes.func,
  /**
   * callback function invoked when the video button is clicked.
   */
  onAnswerVideo: PropTypes.func,
  /**
   * required show/hide AlertCall.
   */
  show: PropTypes.bool.isRequired,
  /**
   * optional title of AlertCall
   */
  title: PropTypes.string,
};

AlertCall.displayName = 'AlertCall';

export default AlertCall;

/**
* @name Call
* @description Control the avatar type by passing in the type of caller to the caller.type prop.
*
* @category communication
* @component alert
* @section call
*
* @js

import {
  Button,
  AlertCall
} from '@collab-ui/react';

export default class Default extends React.PureComponent {
  state = {
    showAlert: false,
    caller: {title: 'Jefe Guadelupe', alt: '+ 1 972-555-1212'}
  }

  render() {
    return (
      <section>
        <div>
          <div className='row'>
            <Button
              ariaLabel='Click to Open'
              onClick={() => this.setState({ showAlert: true, caller: {title: 'Jefe Guadelupe', alt: '+ 1 972-555-1212'} })}
              children='Person Caller'
              color='primary'
              size='large'
            />
          </div>
          <div className='row'>
            <br />
            <Button
              ariaLabel='Click to Open'
              onClick={() => this.setState({ showAlert: true, caller: {title: 'SJC21-Babelfish', alt: '+ 1 408-555-1212', type: 'device'} })}
              children='Device Caller'
              color='primary'
              size='large'
            />
          </div>
          <div className='row'>
            <br />
            <Button
              ariaLabel='Click to Open'
              onClick={() => this.setState({ showAlert: true, caller: {title: '+ 1 408-555-1212', type: 'number'} })}
              children='Number Only Caller'
              color='primary'
              size='large'
            />
          </div>
          <br />
          <AlertCall
            title='Incoming call'
            caller={this.state.caller}
            show={this.state.showAlert}
            onReject={() => this.setState({ showAlert: false})}
            onAnswerVoice={() => this.setState({ showAlert: false})}
            onAnswerVideo={() => this.setState({ showAlert: false})}
          />
        </div>
      </section>
    );
  }
}

**/
