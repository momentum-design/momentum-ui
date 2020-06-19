"use strict";

exports.__esModule = true;
exports.default = void 0;

var _react = _interopRequireDefault(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _index = require("../utils/index");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }

var ListSeparator = function ListSeparator(props) {
  var children = props.children,
      className = props.className,
      lineColor = props.lineColor,
      margin = props.margin,
      textColor = props.textColor,
      text = props.text,
      textPadding = props.textPadding,
      otherProps = _objectWithoutPropertiesLoose(props, ["children", "className", "lineColor", "margin", "textColor", "text", "textPadding"]);

  var lsClass = _index.prefix + "-list-separator";
  return /*#__PURE__*/_react.default.createElement("div", _extends({
    className: "" + lsClass + ("" + (className && " " + className || '')),
    style: _extends({}, lineColor && {
      color: lineColor
    }, margin && {
      margin: margin
    })
  }, otherProps), /*#__PURE__*/_react.default.createElement("span", {
    className: lsClass + "__container"
  }, children || text && /*#__PURE__*/_react.default.createElement("span", {
    className: lsClass + "__text",
    style: _extends({}, textColor && {
      color: textColor
    }, textPadding && {
      padding: textPadding
    })
  }, children ? children : text)));
};

ListSeparator.propTypes = {
  /** @prop Children nodes to render inside ListSeparator | null */
  children: _propTypes.default.node,

  /** @prop Optional css class name | null */
  className: _propTypes.default.string,

  /** @prop Color of the ListSeparator line | null */
  lineColor: _propTypes.default.string,

  /** @prop Margin of the ListSeparator | null */
  margin: _propTypes.default.string,

  /** @prop Text of the ListSeparator | null */
  text: _propTypes.default.string,

  /** @prop TextColor of the ListSeparator | null */
  textColor: _propTypes.default.string,

  /** @prop Padding around text of the ListSeparator | null */
  textPadding: _propTypes.default.string
};
ListSeparator.defaultProps = {
  children: null,
  className: null,
  lineColor: null,
  margin: null,
  text: null,
  textColor: null,
  textPadding: null
};
ListSeparator.displayName = 'ListSeparator';
var _default = ListSeparator;
exports.default = _default;