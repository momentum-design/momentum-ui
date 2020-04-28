function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }

/** @component alert-call */
import React from 'react';
import PropTypes from 'prop-types';
import { UIDReset } from 'react-uid';
import DeviceListCall from "../DeviceListCall";
import { Avatar, Button, Icon } from "./..";

var AlertCall = function AlertCall(props) {
  var avatar = props.avatar,
      avatarProps = props.avatarProps,
      caller = props.caller,
      defaultSelectedDevice = props.defaultSelectedDevice,
      deviceListHeader = props.deviceListHeader,
      deviceListProps = props.deviceListProps,
      devices = props.devices,
      onAnswerShare = props.onAnswerShare,
      onAnswerVideo = props.onAnswerVideo,
      onAnswerVoice = props.onAnswerVoice,
      onDeviceSelect = props.onDeviceSelect,
      onReject = props.onReject,
      rejectAriaLabel = props.rejectAriaLabel,
      rejectBtnProps = props.rejectBtnProps,
      shareAriaLabel = props.shareAriaLabel,
      shareBtnProps = props.shareBtnProps,
      show = props.show,
      title = props.title,
      videoAriaLabel = props.videoAriaLabel,
      videoBtnProps = props.videoBtnProps,
      voiceAriaLabel = props.voiceAriaLabel,
      voiceBtnProps = props.voiceBtnProps,
      otherProps = _objectWithoutPropertiesLoose(props, ["avatar", "avatarProps", "caller", "defaultSelectedDevice", "deviceListHeader", "deviceListProps", "devices", "onAnswerShare", "onAnswerVideo", "onAnswerVoice", "onDeviceSelect", "onReject", "rejectAriaLabel", "rejectBtnProps", "shareAriaLabel", "shareBtnProps", "show", "title", "videoAriaLabel", "videoBtnProps", "voiceAriaLabel", "voiceBtnProps"]);

  var getAvatar = function getAvatar() {
    if (avatar) {
      return avatar;
    } else {
      switch (caller.type) {
        case 'number':
          return React.createElement(Avatar, _extends({
            alt: caller.title,
            size: "xlarge",
            title: "#"
          }, avatarProps));

        case 'device':
          return React.createElement(Avatar, _extends({
            alt: caller.title,
            icon: React.createElement(Icon, {
              name: "spark-board_32"
            }),
            size: "xlarge"
          }, avatarProps));

        default:
          return React.createElement(Avatar, _extends({
            alt: caller.title,
            size: "xlarge",
            title: caller.title
          }, avatarProps));
      }
    }
  };

  var getDeviceList = function getDeviceList() {
    return devices.length > 0 && React.createElement(DeviceListCall, _extends({
      defaultSelected: defaultSelectedDevice,
      devices: devices,
      header: deviceListHeader,
      onSelect: onDeviceSelect
    }, deviceListProps));
  };

  return show && React.createElement("div", _extends({
    className: "md-alert md-alert--call"
  }, otherProps), React.createElement("div", {
    className: "md-alert__title"
  }, title), React.createElement("div", {
    className: "md-alert__caller"
  }, getAvatar(), React.createElement("div", {
    className: "md-alert__caller-title"
  }, caller.title), React.createElement("div", {
    className: "md-alert__caller-subtitle"
  }, caller.alt)), React.createElement(UIDReset, null, getDeviceList()), React.createElement("div", {
    className: "md-alert--call--buttons"
  }, onAnswerShare && React.createElement(Button, _extends({
    ariaLabel: shareAriaLabel,
    circle: true,
    color: "blue",
    onClick: onAnswerShare,
    size: 44
  }, shareBtnProps), React.createElement(Icon, {
    name: "share-screen_24"
  })), onAnswerVideo && React.createElement(Button, _extends({
    ariaLabel: videoAriaLabel,
    circle: true,
    color: "green",
    onClick: onAnswerVideo,
    size: 44
  }, videoBtnProps), React.createElement(Icon, {
    name: "camera_24"
  })), onAnswerVoice && React.createElement(Button, _extends({
    ariaLabel: voiceAriaLabel,
    circle: true,
    color: "green",
    onClick: onAnswerVoice,
    size: 44
  }, voiceBtnProps), React.createElement(Icon, {
    name: "handset_24"
  })), React.createElement(Button, _extends({
    ariaLabel: rejectAriaLabel,
    circle: true,
    color: "red",
    onClick: onReject,
    size: 44
  }, rejectBtnProps), React.createElement(Icon, {
    name: "cancel_24"
  }))));
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
  voiceBtnProps: null
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
    type: PropTypes.oneOf(['', 'number', 'device'])
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
  voiceBtnProps: PropTypes.object
};
AlertCall.displayName = 'AlertCall';
export default AlertCall;