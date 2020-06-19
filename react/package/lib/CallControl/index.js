"use strict";

exports.__esModule = true;
exports.default = void 0;

var _react = _interopRequireDefault(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _ = require("./..");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }

function _inheritsLoose(subClass, superClass) { subClass.prototype = Object.create(superClass.prototype); subClass.prototype.constructor = subClass; subClass.__proto__ = superClass; }

var CallControl = /*#__PURE__*/function (_React$PureComponent) {
  _inheritsLoose(CallControl, _React$PureComponent);

  function CallControl() {
    return _React$PureComponent.apply(this, arguments) || this;
  }

  var _proto = CallControl.prototype;

  _proto.render = function render() {
    var _this$props = this.props,
        active = _this$props.active,
        ariaLabel = _this$props.ariaLabel,
        className = _this$props.className,
        disabled = _this$props.disabled,
        iconColor = _this$props.iconColor,
        iconSize = _this$props.iconSize,
        onClick = _this$props.onClick,
        type = _this$props.type,
        otherHTMLProps = _objectWithoutPropertiesLoose(_this$props, ["active", "ariaLabel", "className", "disabled", "iconColor", "iconSize", "onClick", "type"]);

    var activeRed = ['camera-muted', 'cancel', 'microphone-muted', 'speaker'];
    var activeBlue = ['camera', 'participant-list', 'share-screen'];

    var getActiveColor = function getActiveColor() {
      switch (true) {
        case activeRed.includes(type):
          return 'red';

        case activeBlue.includes(type):
          return 'blue';

        default:
          return 'dark-gray';
      }
    };

    var getColor = function getColor() {
      return active ? getActiveColor() : 'dark-gray';
    };

    return /*#__PURE__*/_react.default.createElement(_.Button, _extends({
      ariaLabel: ariaLabel || type,
      circle: true,
      className: 'md-call-control' + ("" + (className && " " + className || '')),
      color: type === 'cancel' ? 'red' : getColor(),
      disabled: disabled,
      onClick: onClick
    }, otherHTMLProps), /*#__PURE__*/_react.default.createElement(_.Icon, _extends({
      name: type + "_" + iconSize
    }, iconColor && {
      color: iconColor
    })));
  };

  return CallControl;
}(_react.default.PureComponent);

CallControl.propTypes = {
  /** @prop Sets active css styling | false */
  active: _propTypes.default.bool,

  /** @prop Text to display for blindness accessibility features | '' */
  ariaLabel: _propTypes.default.string,

  /** @prop Optional css class string | '' */
  className: _propTypes.default.string,

  /** @prop Sets the attribute disabled to the CallControl button | false */
  disabled: _propTypes.default.bool,

  /** @prop Optional icon color prop | $md-white-100 */
  iconColor: _propTypes.default.string,

  /** @prop Optional numeric icon size prop | 24 */
  iconSize: _propTypes.default.number,

  /** @prop Handler to be called when the user taps the CallControl button | null */
  onClick: _propTypes.default.func,

  /** @prop Optional numeric size prop for CallControl button | 56 */
  size: _propTypes.default.oneOfType([_propTypes.default.number, _propTypes.default.string]),

  /** @prop Optional predefined CallControl prop type | '' */
  type: _propTypes.default.oneOf(['activities', 'camera', 'camera-muted', 'cancel', 'handset', 'microphone-muted', 'more', 'participant-list', 'share-screen', 'speaker', 'view-list'])
};
CallControl.defaultProps = {
  active: false,
  ariaLabel: '',
  className: '',
  disabled: false,
  iconColor: 'white-100',
  iconSize: 24,
  onClick: null,
  size: 56,
  type: ''
};
CallControl.displayName = 'CallControl';
var _default = CallControl;
exports.default = _default;