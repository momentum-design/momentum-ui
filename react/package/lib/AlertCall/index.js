"use strict";

exports.__esModule = true;
exports.default = void 0;

var _react = _interopRequireDefault(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _reactUid = require("react-uid");

var _DeviceListCall = _interopRequireDefault(require("../DeviceListCall"));

var _ = require("./..");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }

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
          return /*#__PURE__*/_react.default.createElement(_.Avatar, _extends({
            alt: caller.title,
            size: "xlarge",
            title: "#"
          }, avatarProps));

        case 'device':
          return /*#__PURE__*/_react.default.createElement(_.Avatar, _extends({
            alt: caller.title,
            icon: /*#__PURE__*/_react.default.createElement(_.Icon, {
              name: "spark-board_32"
            }),
            size: "xlarge"
          }, avatarProps));

        default:
          return /*#__PURE__*/_react.default.createElement(_.Avatar, _extends({
            alt: caller.title,
            size: "xlarge",
            title: caller.title
          }, avatarProps));
      }
    }
  };

  var getDeviceList = function getDeviceList() {
    return devices.length > 0 && /*#__PURE__*/_react.default.createElement(_DeviceListCall.default, _extends({
      defaultSelected: defaultSelectedDevice,
      devices: devices,
      header: deviceListHeader,
      onSelect: onDeviceSelect
    }, deviceListProps));
  };

  return show && /*#__PURE__*/_react.default.createElement("div", _extends({
    className: "md-alert md-alert--call"
  }, otherProps), /*#__PURE__*/_react.default.createElement("div", {
    className: "md-alert__title"
  }, title), /*#__PURE__*/_react.default.createElement("div", {
    className: "md-alert__caller"
  }, getAvatar(), /*#__PURE__*/_react.default.createElement("div", {
    className: "md-alert__caller-title"
  }, caller.title), /*#__PURE__*/_react.default.createElement("div", {
    className: "md-alert__caller-subtitle"
  }, caller.alt)), /*#__PURE__*/_react.default.createElement(_reactUid.UIDReset, null, getDeviceList()), /*#__PURE__*/_react.default.createElement("div", {
    className: "md-alert--call--buttons"
  }, onAnswerShare && /*#__PURE__*/_react.default.createElement(_.Button, _extends({
    ariaLabel: shareAriaLabel,
    circle: true,
    color: "blue",
    onClick: onAnswerShare,
    size: 44
  }, shareBtnProps), /*#__PURE__*/_react.default.createElement(_.Icon, {
    name: "share-screen_24"
  })), onAnswerVideo && /*#__PURE__*/_react.default.createElement(_.Button, _extends({
    ariaLabel: videoAriaLabel,
    circle: true,
    color: "green",
    onClick: onAnswerVideo,
    size: 44
  }, videoBtnProps), /*#__PURE__*/_react.default.createElement(_.Icon, {
    name: "camera_24"
  })), onAnswerVoice && /*#__PURE__*/_react.default.createElement(_.Button, _extends({
    ariaLabel: voiceAriaLabel,
    circle: true,
    color: "green",
    onClick: onAnswerVoice,
    size: 44
  }, voiceBtnProps), /*#__PURE__*/_react.default.createElement(_.Icon, {
    name: "handset_24"
  })), /*#__PURE__*/_react.default.createElement(_.Button, _extends({
    ariaLabel: rejectAriaLabel,
    circle: true,
    color: "red",
    onClick: onReject,
    size: 44
  }, rejectBtnProps), /*#__PURE__*/_react.default.createElement(_.Icon, {
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
  avatar: _propTypes.default.node,

  /** @prop Props to be passed to avatar | null */
  avatarProps: _propTypes.default.object,

  /** @prop Required caller object */
  caller: _propTypes.default.shape({
    title: _propTypes.default.string.isRequired,
    alt: _propTypes.default.string,
    src: _propTypes.default.string,
    type: _propTypes.default.oneOf(['', 'number', 'device'])
  }).isRequired,

  /** @prop Optional default selected device by index value or eventKey | 0 */
  defaultSelectedDevice: _propTypes.default.oneOfType([_propTypes.default.number, _propTypes.default.string]),

  /** @prop Props to be passed to device button | null */
  deviceBtnProps: _propTypes.default.object,

  /** @prop Optional header string for device selection list | 'Device selection' */
  deviceListHeader: _propTypes.default.string,

  /** @prop Optional list of devices to answer call with | [] */
  devices: _propTypes.default.array,

  /** @prop Callback function invoked when the share button is clicked | null */
  onAnswerShare: _propTypes.default.func,

  /** @prop Callback function invoked when the video button is clicked | null */
  onAnswerVideo: _propTypes.default.func,

  /** @prop Callback function invoked when the handset button is clicked | null */
  onAnswerVoice: _propTypes.default.func,

  /** @prop Optional callback function when device is selected | null */
  onDeviceSelect: _propTypes.default.func,

  /** @prop Callback function invoked when the reject button is clicked | null */
  onReject: _propTypes.default.func,

  /** @prop Optional aria-label reject message | 'reject call' */
  rejectAriaLabel: _propTypes.default.string,

  /** @prop Props to be passed to reject button | null */
  rejectBtnProps: _propTypes.default.object,

  /** @prop Optional aria-label share | 'answer call with share' */
  shareAriaLabel: _propTypes.default.string,

  /** @prop Props to be passed to share button | null */
  shareBtnProps: _propTypes.default.object,

  /** @prop Required AlertCall visitibility setting */
  show: _propTypes.default.bool.isRequired,

  /** @prop Optional title of AlertCall | '' */
  title: _propTypes.default.string,

  /** @prop Optional aria-label video | 'answer call with video' */
  videoAriaLabel: _propTypes.default.string,

  /** @prop Props to be passed to video button | null */
  videoBtnProps: _propTypes.default.object,

  /** @prop Optional aria-label voice | 'answer call with voice only' */
  voiceAriaLabel: _propTypes.default.string,

  /** @prop Props to be passed to voice button | null */
  voiceBtnProps: _propTypes.default.object
};
AlertCall.displayName = 'AlertCall';
var _default = AlertCall;
exports.default = _default;