import React from 'react';
import PropTypes from 'prop-types';
import { AlertCall } from '@collab-ui/react';
import {
  bind,
  reject,
  uniqueId
} from 'lodash';

class AlertCallContainer extends React.Component {
  static displayName = 'AlertCallContainer';

  state = {
    alertList: []
  }

  callAlert = (
    title,
    caller,
    deviceListHeader,
    devices,
    onReject,
    onAnswerVoice,
    onAnswerVideo,
    onDeviceSelect
  ) => {
    this.handleCallAlert(
      title,
      caller,
      deviceListHeader,
      devices,
      onReject,
      onAnswerVoice,
      onAnswerVideo,
      onDeviceSelect
    );
  }

  handleCallAlert = (
    title,
    caller,
    deviceListHeader,
    devices,
    onReject,
    onAnswerVoice,
    onAnswerVideo,
    onDeviceSelect
  ) => {
    const key = uniqueId('call_alert_');
    const nextAlert = {
      key,
      caller: caller,
      deviceListHeader: deviceListHeader,
      devices: devices,
      show: true,
      title: title,
      onReject: bind(this.handleOnReject, this, key, onReject),
      onAnswerVoice: onAnswerVoice && bind(this.handleOnAnswerVoice, this, key, onAnswerVoice),
      onAnswerVideo: bind(this.handleOnAnswerVideo, this, key, onAnswerVideo),
      onDeviceSelect: onDeviceSelect
    };
    if (this.state.alertList.length < 2) {
      this.setState(state => ({
        alertList: [...state.alertList, nextAlert]
      }));
    }
  }

  handleOnReject = (key, onReject, e) => {
    this.setState(state => {
      onReject && onReject(e);
      return { alertList: reject(state.alertList, {key}) };
    })
  }

  handleOnAnswerVoice = (key, onAnswerVoice, e) => {
    this.setState(state => {
      onAnswerVoice && onAnswerVoice(e);
      return { alertList: reject(state.alertList, {key}) };
    })
  }

  handleOnAnswerVideo = (key, onAnswerVideo, e) => {
    this.setState(state => {
      onAnswerVideo && onAnswerVideo(e);
      return { alertList: reject(state.alertList, {key}) };
    })
  }

  render() {
    return (
      <div className='cui-alert__container cui-alert__container--call'>
        {
          this.state.alertList.map(alert => (
            <AlertCall
              key={alert.key}
              title={alert.title}
              caller={alert.caller}
              deviceListHeader={alert.deviceListHeader}
              devices={alert.devices}
              show={alert.show}
              onReject={alert.onReject}
              onAnswerVoice={alert.onAnswerVoice}
              onAnswerVideo={alert.onAnswerVideo}
              onDeviceSelect={alert.onDeviceSelect}
            />
          ))
        }
      </div>
    );
  }
}

export default AlertCallContainer;
