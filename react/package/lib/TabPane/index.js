"use strict";

exports.__esModule = true;
exports.default = void 0;

var _react = _interopRequireDefault(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/** @component tabs */
var TabPane = function TabPane(props) {
  var children = props.children,
      active = props.active;
  return _react.default.createElement("div", {
    className: "md-tab__pane" + ("" + (active ? ' active' : ''))
  }, _react.default.createElement("div", {
    className: "md-tab__content"
  }, children));
};

TabPane.propTypes = {
  /** @prop Determines if TabPane is active | false */
  active: _propTypes.default.bool,

  /** @prop Children nodes to render inside TabPane | null */
  children: _propTypes.default.node
};
TabPane.defaultProps = {
  active: false,
  children: null
};
TabPane.displayName = 'TabPane';
var _default = TabPane;
exports.default = _default;