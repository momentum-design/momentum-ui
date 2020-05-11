/** @component alert-call */

import React from 'react';
import PropTypes from 'prop-types';
import { UIDReset } from 'react-uid';
import DeviceListCall from '../DeviceListCall';
import {
  Avatar,
  Button,
  Icon
} from '@momentum-ui/react';

const AlertCall = props => {
  const {
    avatar,
    avatarProps,
    caller,
    defaultSelectedDevice,
    deviceListHeader,
    deviceListProps,
    devices,
    onAnswerShare,
    onAnswerVideo,
    onAnswerVoice,
    onDeviceSelect,
    onReject,
    rejectAriaLabel,
    rejectBtnProps,
    shareAriaLabel,
    shareBtnProps,
    show,
    title,
    videoAriaLabel,
    videoBtnProps,
    voiceAriaLabel,
    voiceBtnProps,
    ...otherProps
  } = props;

  const getAvatar = () => {
    if (avatar) {
      return avatar;
    } else {
      switch(caller.type) {
        case 'number': 
          return (
            <Avatar
              alt={caller.title}
              size='xlarge'
              title='#'
              {...avatarProps}
            />
          );
        case 'device':
          return (
            <Avatar
              alt={caller.title}
              icon={<Icon name='spark-board_32' />}
              size='xlarge'
              {...avatarProps}
            />
          );
        default: 
          return (
            <Avatar
              alt={caller.title}
              size='xlarge'
              title={caller.title}
              {...avatarProps}
            />
          );
      }
    }
  };

  const getDeviceList = () => {
    return devices.length > 0 && (
      <DeviceListCall
        defaultSelected={defaultSelectedDevice}
        devices={devices}
        header={deviceListHeader}
        onSelect={onDeviceSelect}
        {...deviceListProps}
      />
    );
  };

  return (
    show && (
      <div 
        className='md-alert md-alert--call'
        {...otherProps}
      >
        <div className='md-alert__title'>
          {title}
        </div>
        <div className='md-alert__caller'>
          {getAvatar()}
          <div className='md-alert__caller-title'>
            {caller.title}
          </div>
          <div className='md-alert__caller-subtitle'>
            {caller.alt}
          </div>
        </div>
        <UIDReset>
          {getDeviceList()}
        </UIDReset>
        <div className='md-alert--call--buttons'>
          {onAnswerShare &&
            <Button
              ariaLabel={shareAriaLabel}
              circle
              color='blue'
              onClick={onAnswerShare}
              size={44}
              {...shareBtnProps}
            >
              <Icon name='share-screen_24'/>
            </Button>
          }
          {onAnswerVideo &&
            <Button
              ariaLabel={videoAriaLabel}
              circle
              color='green'
              onClick={onAnswerVideo}
              size={44}
              {...videoBtnProps}
            >
              <Icon name='camera_24'/>
            </Button>
          }
          {onAnswerVoice &&
            <Button
              ariaLabel={voiceAriaLabel}
              circle
              color='green'
              onClick={onAnswerVoice}
              size={44}
              {...voiceBtnProps}
            >
              <Icon name='handset_24'/>
            </Button>
          }
          <Button
            ariaLabel={rejectAriaLabel}
            circle
            color='red'
            onClick={onReject}
            size={44}
            {...rejectBtnProps}
          >
            <Icon name='cancel_24'/>
          </Button>
        </div>
      </div>
    )
  );
};

AlertCall.defaultProps = {
  avatar: null,
  avatarProps: null,
  caller: null,
  defaultSelectedDevice: 0,
  deviceListHeader: 'Device selection',
  deviceListProps: null,
  devices: [],
  onAnswerShare: null,
  onAnswerVideo: null,
  onAnswerVoice: null,
  onDeviceSelect: null,
  onReject: null,
  rejectAriaLabel: 'reject call',
  rejectBtnProps: null,
  shareAriaLabel: 'answer call with share',
  shareBtnProps: null,
  title: '',
  videoAriaLabel: 'answer call with video',
  videoBtnProps: null,
  voiceAriaLabel: 'answer call with voice',
  voiceBtnProps: null,
};

AlertCall.propTypes = {
  /** @prop Optional avatar prop | null */
  avatar: PropTypes.node,
  /** @prop Props to be passed to avatar | null */
  avatarProps: PropTypes.object,
  /** @prop Required caller object */
  caller: PropTypes.shape({
    title: PropTypes.string.isRequired,
    alt: PropTypes.string,
    src: PropTypes.string,
    type: PropTypes.oneOf(['', 'number', 'device']),
  }).isRequired,
  /** @prop Optional default selected device by index value or eventKey | 0 */
  defaultSelectedDevice: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  /** @prop Props to be passed to device button | null */
  deviceBtnProps: PropTypes.object,
  /** @prop Optional header string for device selection list | 'Device selection' */
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
  /** @prop Props to be passed to reject button | null */
  rejectBtnProps: PropTypes.object,
  /** @prop Optional aria-label share | 'answer call with share' */
  shareAriaLabel: PropTypes.string,
  /** @prop Props to be passed to share button | null */
  shareBtnProps: PropTypes.object,
  /** @prop Required AlertCall visitibility setting */
  show: PropTypes.bool.isRequired,
  /** @prop Optional title of AlertCall | '' */
  title: PropTypes.string,
  /** @prop Optional aria-label video | 'answer call with video' */
  videoAriaLabel: PropTypes.string,
  /** @prop Props to be passed to video button | null */
  videoBtnProps: PropTypes.object,
  /** @prop Optional aria-label voice | 'answer call with voice only' */
  voiceAriaLabel: PropTypes.string,
  /** @prop Props to be passed to voice button | null */
  voiceBtnProps: PropTypes.object,
};

AlertCall.displayName = 'AlertCall';

export default AlertCall;
