"use strict";

exports.__esModule = true;
exports.default = void 0;

var _react = _interopRequireDefault(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/** @component loading-spinner */
var Loading = function Loading(props) {
  var small = props.small;
  return /*#__PURE__*/_react.default.createElement("div", {
    className: "md-loading" + ("" + (small ? ' md-loading--small' : ''))
  }, /*#__PURE__*/_react.default.createElement("span", {
    className: "md-loading__icon"
  }), /*#__PURE__*/_react.default.createElement("span", {
    className: "md-loading__icon"
  }), /*#__PURE__*/_react.default.createElement("span", {
    className: "md-loading__icon"
  }));
};

Loading.propTypes = {
  /** @prop Prop to make the Loading animation small | false */
  small: _propTypes.default.bool
};
Loading.defaultProps = {
  small: false
};
Loading.displayName = 'Loading';
var _default = Loading;
exports.default = _default;