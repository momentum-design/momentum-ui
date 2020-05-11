"use strict";

exports.__esModule = true;
exports.default = void 0;

var _react = _interopRequireDefault(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _ = require("./..");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }

var AlertMeeting = function AlertMeeting(props) {
  var attendees = props.attendees,
      avatar = props.avatar,
      className = props.className,
      closeAriaLabel = props.closeAriaLabel,
      closeBtnProps = props.closeBtnProps,
      message = props.message,
      onClick = props.onClick,
      onKeyDown = props.onKeyDown,
      onHide = props.onHide,
      onSnooze = props.onSnooze,
      remindAriaLabel = props.remindAriaLabel,
      show = props.show,
      snoozeBtnProps = props.snoozeBtnProps,
      status = props.status,
      title = props.title,
      otherProps = _objectWithoutPropertiesLoose(props, ["attendees", "avatar", "className", "closeAriaLabel", "closeBtnProps", "message", "onClick", "onKeyDown", "onHide", "onSnooze", "remindAriaLabel", "show", "snoozeBtnProps", "status", "title"]);

  var renderAvatar = function renderAvatar() {
    if (avatar) {
      return avatar;
    } else {
      if (attendees.length >= 2) {
        return _react.default.createElement(_.CompositeAvatar, null, _react.default.createElement(_.Avatar, _extends({
          alt: attendees[0].alt,
          src: attendees[0].src,
          title: attendees[0].title
        }, attendees[0].props)), _react.default.createElement(_.Avatar, _extends({
          alt: attendees[1].alt,
          src: attendees[1].src,
          title: attendees[1].title
        }, attendees[1].props)));
      } else if (attendees.length === 1) {
        return _react.default.createElement(_.Avatar, _extends({
          alt: attendees[0].alt,
          src: attendees[0].src,
          title: attendees[0].title
        }, attendees[0].props));
      } else {
        throw new Error('AlertMeeting needs at least one attendee to render an avatar.');
      }
    }
  };

  var handleKeyDown = function handleKeyDown(e) {
    if (e.which === 32 || e.which === 13 || e.charCode === 32 || e.charCode === 13) {
      onClick && onClick(e);
      e.preventDefault();
    }

    onKeyDown && onKeyDown(e);
  };

  return show && _react.default.createElement("div", _extends({
    className: 'md-alert md-alert--meeting' + ("" + (className && " " + className || ''))
  }, onClick && {
    onClick: onClick
  }, (onClick || onKeyDown) && {
    onKeyDown: function onKeyDown(e) {
      return handleKeyDown(e);
    },
    role: 'button'
  }, otherProps), renderAvatar(), _react.default.createElement("div", {
    className: 'md-alert__content' + ("" + (onSnooze ? '' : ' md-alert__content--wide'))
  }, _react.default.createElement("div", {
    className: "md-alert__title",
    title: title
  }, title), _react.default.createElement("div", {
    className: "md-alert__status"
  }, status), _react.default.createElement("div", {
    className: "md-alert__message",
    title: message
  }, message)), onSnooze && _react.default.createElement("div", {
    className: "md-alert__button"
  }, _react.default.createElement(_.Button, _extends({
    ariaLabel: remindAriaLabel,
    circle: true,
    onClick: onSnooze,
    size: 44
  }, snoozeBtnProps), _react.default.createElement(_.Icon, {
    name: "alarm_16"
  }))), _react.default.createElement("div", {
    className: "md-alert__button"
  }, _react.default.createElement(_.Button, _extends({
    ariaLabel: closeAriaLabel,
    circle: true,
    onClick: onHide,
    size: 44
  }, closeBtnProps), _react.default.createElement(_.Icon, {
    name: "cancel_16"
  }))));
};

AlertMeeting.defaultProps = {
  attendees: [],
  avatar: null,
  className: '',
  closeAriaLabel: 'close',
  closeBtnProps: null,
  message: '',
  onClick: null,
  onKeyDown: null,
  onHide: null,
  onSnooze: null,
  remindAriaLabel: 'snooze',
  snoozeBtnProps: null,
  status: '',
  title: ''
};
AlertMeeting.propTypes = {
  /** @prop Optional avatar prop | null */
  avatar: _propTypes.default.node,

  /** @prop Optional attendee array. If more than one attendee, a Composite Avatar with only the first 2 attendees is created. | null */
  attendees: _propTypes.default.arrayOf(_propTypes.default.shape({
    title: _propTypes.default.string.isRequired,
    alt: _propTypes.default.string,
    src: _propTypes.default.string
  })),

  /** @prop Optional css class string | '' */
  className: _propTypes.default.string,

  /** @prop Optional aria label for the close button | 'close' */
  closeAriaLabel: _propTypes.default.string,

  /** @prop Props to be passed to close button | null */
  closeBtnProps: _propTypes.default.object,

  /** @prop Optional callback function invoked on click of alert | null */
  onClick: _propTypes.default.func,

  /** @prop Optional callback function invoked on keydown on alert | null */
  onKeyDown: _propTypes.default.func,

  /** @prop Mandatory handler invoked when the user presses on the Alert's close button or hit's the esc key | null */
  onHide: _propTypes.default.func,

  /** @prop Optional callback function invoked when the snooze button is clicked | null */
  onSnooze: _propTypes.default.func,

  /** @prop Optional AlertMeeting Message | '' */
  message: _propTypes.default.string,

  /** @prop Optional aria label for snooze buton | 'snooze' */
  remindAriaLabel: _propTypes.default.string,

  /** @prop Set AlertMeeting visibility */
  show: _propTypes.default.bool.isRequired,

  /** @prop Props to be passed to snooze button | null */
  snoozeBtnProps: _propTypes.default.object,

  /** @prop Optional AlertMeeting status | '' */
  status: _propTypes.default.string,

  /** @prop Optional AlertMeeting title | '' */
  title: _propTypes.default.string
};
AlertMeeting.displayName = 'AlertMeeting';
var _default = AlertMeeting;
exports.default = _default;