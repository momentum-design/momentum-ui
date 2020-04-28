"use strict";

exports.__esModule = true;
exports.default = void 0;

var _react = _interopRequireDefault(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _get = _interopRequireDefault(require("lodash/get"));

var _ = require("./..");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }

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
    icon = _react.default.createElement(_.Icon, {
      name: type + "_" + buttonToIconSizeMapping[size]
    });
  }

  return _react.default.createElement(_.Button, _extends({
    ariaLabel: ariaLabel || !type.icon && type || '',
    circle: true,
    className: 'md-activity' + ("" + (!type.icon && " md-activity__" + type || '')) + ("" + (className && " " + className || '')),
    color: (0, _get.default)(type, 'color'),
    containerLarge: size >= 84,
    disabled: disabled,
    onClick: onClick,
    size: size
  }, otherHTMLProps), icon);
};

ActivityButton.displayName = 'ActivityButton';
ActivityButton.propTypes = {
  /** @prop Text to display for blindness accessibility features | '' */
  ariaLabel: _propTypes.default.string,

  /** @prop Optional css class string | '' */
  className: _propTypes.default.string,

  /** @prop Sets the attribute disabled to the button | false */
  disabled: _propTypes.default.bool,

  /** @prop Handler to be called when the user taps the button | null */
  onClick: _propTypes.default.func,

  /** @prop Sets the button's size | '' */
  size: _propTypes.default.oneOf([56, 68, 84]),

  /** @prop Sets the button's activity type */
  type: _propTypes.default.oneOfType([_propTypes.default.oneOf(['chat', 'camera', 'contact-card', 'meetings', 'whiteboard', 'files', 'share-screen', 'tasks']), _propTypes.default.shape({
    color: _propTypes.default.string,
    icon: _propTypes.default.element.isRequired
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
var _default = ActivityButton;
exports.default = _default;