import React from 'react';
import PropTypes from 'prop-types';
import DeviceListCall from './DeviceListCall';
import {
  Avatar,
  Button,
  Icon
} from '@collab-ui/react';

/**
 * @category communication
 * @component alert-call
 * @variations collab-ui-react
 */

const AlertCall = props => {
  const {
    avatar,
    caller,
    deviceListHeader,
    devices,
    onAnswerVideo,
    onAnswerVoice,
    onDeviceSelect,
    onReject,
    show,
    title
  } = props;

  const getAvatar = () => {
    if (avatar) {
      return avatar;
    } else {
      switch(caller.type) {
        case 'number': return <Avatar title='#' alt={caller.title} size='xlarge'/>;
        case 'device': return <Avatar icon={<Icon name='spark-board_32' />} alt={caller.title} size='xlarge'/>;
        default: return <Avatar title={caller.title} alt={caller.title} size='xlarge'/> ;
      }
    }
  };

  const getDeviceList = () => {
    return devices.length > 0 && (
      <DeviceListCall
        devices={devices}
        header={deviceListHeader}
        onSelect={onDeviceSelect}
      />
    );
  };

  return (
    show && (
      <div className='cui-alert cui-alert--call'>
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
        {getDeviceList()}
        <div className='cui-alert--call--buttons'>
          <Button
            children={<Icon name='camera_24'/>}
            onClick={onAnswerVideo}
            ariaLabel='answer call with voice and video'
            color='green'
            circle
            large
          />
          {onAnswerVoice &&
            <Button
              children={<Icon name='handset_24'/>}
              onClick={onAnswerVoice}
              ariaLabel='answer call with voice only'
              color='green'
              circle
              large
            />
          }
          <Button
            children={<Icon name='cancel_24'/>}
            onClick={onReject}
            ariaLabel='reject call'
            color='red'
            circle
            large
          />
        </div>
      </div>
    )
  );
};

AlertCall.defaultProps = {
  avatar: null,
  caller: null,
  title: '',
  onRejectCall: null,
  onVoiceCall: null,
  onVideoCall: null,
  deviceListHeader: 'Device selection',
  devices: [],
  onDeviceSelect: null
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
  /**
   * optional header string for device selection list
   */
  deviceListHeader: PropTypes.string,
  /**
   * optional list of devices to answer call with.
   */
  devices: PropTypes.array,
  /**
   * optional avatar prop
   */
  avatar: PropTypes.node,
  /**
   * optional callback function when device is selected
   */
  onDeviceSelect: PropTypes.func
};

AlertCall.displayName = 'AlertCall';

export default AlertCall;

/**
* @name Call
* @description Control the avatar type by passing in the type of caller to the caller.type prop.  There can only be 2 Call Alerts active at one time.
*
* @category communication
* @component alert
* @section call
*
* @js

import {
  Button,
  AlertCallContainer
} from '@collab-ui/react';

export default class Default extends React.PureComponent {
  state = {
    showAlert: false,
    caller: {title: 'Jefe Guadelupe', alt: '+ 1 972-555-1212'},
    devices: [
      {name: 'SJC21-Babelfish', value: '1010101', type: 'device'},
      {name: 'Use my computer', value: '2020202'}
    ]
  }

  render() {
    let alertCallContainer;
    return (
      <section>
        <div>
          <div className='row'>
            <Button
              ariaLabel='Click to Open'
              onClick={() => alertCallContainer.callAlert(
                'IncomingCall',
                this.state.caller,
                undefined,
                undefined,
                () => console.log('onReject1'),
                () => console.log('onAnswerVoice1'),
                () => console.log('onAnswerVideo1'),
              )}
              children='Person Caller'
              color='primary'
              size='large'
            />
          </div>
          <div className='row'>
            <br />
            <Button
              ariaLabel='Click to Open'
              onClick={() => alertCallContainer.callAlert(
                'IncomingCall',
                {title: 'SJC21-Babelfish', alt: '+ 1 408-555-1212', type: 'device'},
                undefined,
                undefined,
                () => console.log('onReject2'),
                () => console.log('onAnswerVoice2'),
                () => console.log('onAnswerVideo2'),
              )}
              children='Device Caller'
              color='primary'
              size='large'
            />
          </div>
          <div className='row'>
            <br />
            <Button
              ariaLabel='Click to Open'
              onClick={() => alertCallContainer.callAlert(
                'IncomingCall',
                {title: '+ 1 408-555-1212', type: 'number'},
                undefined,
                undefined,
                () => console.log('onReject3'),
                () => console.log('onAnswerVoice3'),
                () => console.log('onAnswerVideo3'),
              )}
              children='Number Only Caller'
              color='primary'
              size='large'
            />
          </div>
          <div className='row'>
            <br />
            <Button
              ariaLabel='Click to Open'
              onClick={() => alertCallContainer.callAlert(
                'IncomingCall',
                {title: '+ 1 408-555-1212', type: 'number'},
                undefined,
                this.state.devices,
                () => console.log('onReject4'),
                () => console.log('onAnswerVoice4'),
                () => console.log('onAnswerVideo4'),
              )}
              children='Caller with Device List'
              color='primary'
              size='large'
            />
          </div>
          <br />
          <AlertCallContainer
            ref={ref => alertCallContainer = ref}
          />
        </div>
      </section>
    );
  }
}

**/
