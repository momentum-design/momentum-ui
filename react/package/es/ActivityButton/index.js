function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }

/** @component activity-button */
import React from 'react';
import PropTypes from 'prop-types';
import get from 'lodash/get';
import { Button, Icon } from "./..";

var ActivityButton = function ActivityButton(props) {
  var ariaLabel = props.ariaLabel,
      className = props.className,
      disabled = props.disabled,
      onClick = props.onClick,
      size = props.size,
      type = props.type,
      otherHTMLProps = _objectWithoutPropertiesLoose(props, ["ariaLabel", "className", "disabled", "onClick", "size", "type"]);

  var icon = type.icon;

  if (!icon) {
    var buttonToIconSizeMapping = {
      56: '24',
      68: '28',
      84: '36'
    };
    icon = React.createElement(Icon, {
      name: type + "_" + buttonToIconSizeMapping[size]
    });
  }

  return React.createElement(Button, _extends({
    ariaLabel: ariaLabel || !type.icon && type || '',
    circle: true,
    className: 'md-activity' + ("" + (!type.icon && " md-activity__" + type || '')) + ("" + (className && " " + className || '')),
    color: get(type, 'color'),
    containerLarge: size >= 84,
    disabled: disabled,
    onClick: onClick,
    size: size
  }, otherHTMLProps), icon);
};

ActivityButton.displayName = 'ActivityButton';
ActivityButton.propTypes = {
  /** @prop Text to display for blindness accessibility features | '' */
  ariaLabel: PropTypes.string,

  /** @prop Optional css class string | '' */
  className: PropTypes.string,

  /** @prop Sets the attribute disabled to the button | false */
  disabled: PropTypes.bool,

  /** @prop Handler to be called when the user taps the button | null */
  onClick: PropTypes.func,

  /** @prop Sets the button's size | '' */
  size: PropTypes.oneOf([56, 68, 84]),

  /** @prop Sets the button's activity type */
  type: PropTypes.oneOfType([PropTypes.oneOf(['chat', 'camera', 'contact-card', 'meetings', 'whiteboard', 'files', 'share-screen', 'tasks']), PropTypes.shape({
    color: PropTypes.string,
    icon: PropTypes.element.isRequired
  })]).isRequired
};
ActivityButton.defaultProps = {
  ariaLabel: '',
  className: '',
  disabled: false,
  size: 68,
  onClick: null,
  type: ''
};
export default ActivityButton;