function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }

/** @component meeting-alert */
import React from 'react';
import PropTypes from 'prop-types';
import { Avatar, CompositeAvatar, Button, Icon } from "./..";

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
        return React.createElement(CompositeAvatar, null, React.createElement(Avatar, _extends({
          alt: attendees[0].alt,
          src: attendees[0].src,
          title: attendees[0].title
        }, attendees[0].props)), React.createElement(Avatar, _extends({
          alt: attendees[1].alt,
          src: attendees[1].src,
          title: attendees[1].title
        }, attendees[1].props)));
      } else if (attendees.length === 1) {
        return React.createElement(Avatar, _extends({
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

  return show && React.createElement("div", _extends({
    className: 'md-alert md-alert--meeting' + ("" + (className && " " + className || ''))
  }, onClick && {
    onClick: onClick
  }, (onClick || onKeyDown) && {
    onKeyDown: function onKeyDown(e) {
      return handleKeyDown(e);
    },
    role: 'button'
  }, otherProps), renderAvatar(), React.createElement("div", {
    className: 'md-alert__content' + ("" + (onSnooze ? '' : ' md-alert__content--wide'))
  }, React.createElement("div", {
    className: "md-alert__title",
    title: title
  }, title), React.createElement("div", {
    className: "md-alert__status"
  }, status), React.createElement("div", {
    className: "md-alert__message",
    title: message
  }, message)), onSnooze && React.createElement("div", {
    className: "md-alert__button"
  }, React.createElement(Button, _extends({
    ariaLabel: remindAriaLabel,
    circle: true,
    onClick: onSnooze,
    size: 44
  }, snoozeBtnProps), React.createElement(Icon, {
    name: "alarm_16"
  }))), React.createElement("div", {
    className: "md-alert__button"
  }, React.createElement(Button, _extends({
    ariaLabel: closeAriaLabel,
    circle: true,
    onClick: onHide,
    size: 44
  }, closeBtnProps), React.createElement(Icon, {
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
  avatar: PropTypes.node,

  /** @prop Optional attendee array. If more than one attendee, a Composite Avatar with only the first 2 attendees is created. | null */
  attendees: PropTypes.arrayOf(PropTypes.shape({
    title: PropTypes.string.isRequired,
    alt: PropTypes.string,
    src: PropTypes.string
  })),

  /** @prop Optional css class string | '' */
  className: PropTypes.string,

  /** @prop Optional aria label for the close button | 'close' */
  closeAriaLabel: PropTypes.string,

  /** @prop Props to be passed to close button | null */
  closeBtnProps: PropTypes.object,

  /** @prop Optional callback function invoked on click of alert | null */
  onClick: PropTypes.func,

  /** @prop Optional callback function invoked on keydown on alert | null */
  onKeyDown: PropTypes.func,

  /** @prop Mandatory handler invoked when the user presses on the Alert's close button or hit's the esc key | null */
  onHide: PropTypes.func,

  /** @prop Optional callback function invoked when the snooze button is clicked | null */
  onSnooze: PropTypes.func,

  /** @prop Optional AlertMeeting Message | '' */
  message: PropTypes.string,

  /** @prop Optional aria label for snooze buton | 'snooze' */
  remindAriaLabel: PropTypes.string,

  /** @prop Set AlertMeeting visibility */
  show: PropTypes.bool.isRequired,

  /** @prop Props to be passed to snooze button | null */
  snoozeBtnProps: PropTypes.object,

  /** @prop Optional AlertMeeting status | '' */
  status: PropTypes.string,

  /** @prop Optional AlertMeeting title | '' */
  title: PropTypes.string
};
AlertMeeting.displayName = 'AlertMeeting';
export default AlertMeeting;