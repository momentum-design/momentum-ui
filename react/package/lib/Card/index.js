"use strict";

exports.__esModule = true;
exports.default = void 0;

var _react = _interopRequireDefault(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }

var Card = function Card(props) {
  var children = props.children,
      className = props.className,
      onClick = props.onClick,
      otherProps = _objectWithoutPropertiesLoose(props, ["children", "className", "onClick"]);

  var handleKeyDown = function handleKeyDown(e) {
    if (e.which === 32 || e.which === 13 || e.charCode === 32 || e.charCode === 13) {
      onClick && onClick(e);
      e.preventDefault();
    }
  };

  return /*#__PURE__*/_react.default.createElement("div", _extends({
    className: "md-card" + ("" + (onClick && " md-card--clickable" || '')) + ("" + (className && " " + className || '')),
    onClick: onClick,
    onKeyDown: handleKeyDown,
    role: "presentation"
  }, otherProps), children);
};

Card.propTypes = {
  /** @prop Children nodes to render inside of Card | null */
  children: _propTypes.default.node,

  /** @prop Optional CSS class names | '' */
  className: _propTypes.default.string,

  /** @prop Handler to be called when the card is clicked | '' */
  onClick: _propTypes.default.func
};
Card.defaultProps = {
  children: null,
  className: '',
  onClick: null
};
Card.displayName = 'Card';
var _default = Card;
exports.default = _default;