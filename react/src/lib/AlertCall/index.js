/** @component alert-call */
import React from 'react';
import PropTypes from 'prop-types';
import DeviceListCall from '../DeviceListCall';
import { UIDReset } from 'react-uid';
import {
  Avatar,
  Button,
  Icon
} from '@collab-ui/react';

const AlertCall = props => {
  const {
    avatar,
    caller,
    defaultSelectedDevice,
    deviceListHeader,
    devices,
    onAnswerShare,
    onAnswerVideo,
    onAnswerVoice,
    onDeviceSelect,
    onReject,
    rejectAriaLabel,
    shareAriaLabel,
    show,
    title,
    videoAriaLabel,
    voiceAriaLabel,
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
        defaultSelected={defaultSelectedDevice}
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
        <UIDReset>
          {getDeviceList()}
        </UIDReset>
        <div className='cui-alert--call--buttons'>
          {onAnswerShare &&
            <Button
              children={<Icon name='share-screen_24'/>}
              onClick={onAnswerShare}
              ariaLabel={shareAriaLabel}
              color='blue'
              circle
              size={44}
            />
          }
          {onAnswerVideo &&
            <Button
              children={<Icon name='camera_24'/>}
              onClick={onAnswerVideo}
              ariaLabel={videoAriaLabel}
              color='green'
              circle
              size={44}
            />
          }
          {onAnswerVoice &&
            <Button
              children={<Icon name='handset_24'/>}
              onClick={onAnswerVoice}
              ariaLabel={voiceAriaLabel}
              color='green'
              circle
              size={44}
            />
          }
          <Button
            children={<Icon name='cancel_24'/>}
            onClick={onReject}
            ariaLabel={rejectAriaLabel}
            color='red'
            circle
            size={44}
          />
        </div>
      </div>
    )
  );
};

AlertCall.defaultProps = {
  avatar: null,
  caller: null,
  defaultSelectedDevice: 0,
  deviceListHeader: 'Device selection',
  devices: [],
  onAnswerShare: null,
  onAnswerVideo: null,
  onAnswerVoice: null,
  onDeviceSelect: null,
  onReject: null,
  rejectAriaLabel: 'reject call',
  shareAriaLabel: 'answer call with share',
  title: '',
  videoAriaLabel: 'answer call with video',
  voiceAriaLabel: 'answer call with voice',
};

AlertCall.propTypes = {
  /** @prop Optional avatar prop | null */
  avatar: PropTypes.node,
  /** @prop Required caller object */
  caller: PropTypes.shape({
    title: PropTypes.string.isRequired,
    alt: PropTypes.string,
    src: PropTypes.string,
    type: PropTypes.oneOf(['', 'number', 'device']),
  }).isRequired,
  /** @prop Optional default selected device by index value or eventKey | 0 */
  defaultSelectedDevice: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  /** @prop Optional header string for device selection list | "Device selection" */
  deviceListHeader: PropTypes.string,
  /** @prop Optional list of devices to answer call with | [] */
  devices: PropTypes.array,
  /** @prop Callback function invoked when the share button is clicked | null */
  onAnswerShare: PropTypes.func,
  /** @prop Callback function invoked when the video button is clicked | null */
  onAnswerVideo: PropTypes.func,
  /** @prop Callback function invoked when the handset button is clicked | null */
  onAnswerVoice: PropTypes.func,
  /** @prop Optional callback function when device is selected | null */
  onDeviceSelect: PropTypes.func,
  /** @prop Callback function invoked when the reject button is clicked | null */
  onReject: PropTypes.func,
  /** @prop Optional aria-label reject message | 'reject call' */
  rejectAriaLabel: PropTypes.string,
  /** @prop Optional aria-label share | 'answer call with share' */
  shareAriaLabel: PropTypes.string,
  /** @prop Required AlertCall visitibility setting */
  show: PropTypes.bool.isRequired,
  /** @prop Optional title of AlertCall | '' */
  title: PropTypes.string,
  /** @prop Optional aria-label video | 'answer call with video' */
  videoAriaLabel: PropTypes.string,
  /** @prop Optional aria-label voice | 'answer call with voice only' */
  voiceAriaLabel: PropTypes.string,
};

AlertCall.displayName = 'AlertCall';

export default AlertCall;
