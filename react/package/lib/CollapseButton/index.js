"use strict";

exports.__esModule = true;
exports.default = void 0;

var _react = _interopRequireDefault(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _ = require("./..");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }

var CollapseButton = function CollapseButton(props) {
  var alignment = props.alignment,
      className = props.className,
      collapse = props.collapse,
      onClick = props.onClick,
      otherProps = _objectWithoutPropertiesLoose(props, ["alignment", "className", "collapse", "onClick"]);

  var handleClick = function handleClick() {
    onClick && onClick();
  };

  var getIconName = function getIconName() {
    return collapse ? 'panel-control-right_12' : 'panel-control-left_12';
  };

  return /*#__PURE__*/_react.default.createElement(_.Button, _extends({
    ariaLabel: collapse ? 'expand' : 'collapse',
    className: 'md-collapse-button' + (" md-collapse-button--" + alignment) + ("" + (className && " " + className || '')),
    children: /*#__PURE__*/_react.default.createElement(_.Icon, {
      name: getIconName()
    }),
    onClick: function onClick() {
      return handleClick();
    }
  }, otherProps));
};

CollapseButton.propTypes = {
  /** @prop Sets the positioning of the CollapseButton | 'left' */
  alignment: _propTypes.default.oneOf(['left', 'right', 'top', 'bottom']),

  /** @prop Optional css class string | '' */
  className: _propTypes.default.string,

  /** @prop Sets the collapse css styling | true */
  collapse: _propTypes.default.bool,

  /** @prop Handler to be called when the user taps the CollapseButton | null */
  onClick: _propTypes.default.func
};
CollapseButton.defaultProps = {
  alignment: 'left',
  className: '',
  collapse: true,
  onClick: null
};
CollapseButton.displayName = 'CollapseButton';
var _default = CollapseButton;
exports.default = _default;