"use strict";

exports.__esModule = true;
exports.default = void 0;

var _react = _interopRequireDefault(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/** @component sidebar */
var SidebarBody = function SidebarBody(props) {
  var children = props.children,
      className = props.className;
  return _react.default.createElement("div", {
    className: "md-sidebar__body" + ("" + (className && " " + className || ''))
  }, children);
};

SidebarBody.displayName = 'SidebarBody';
SidebarBody.propTypes = {
  /** @prop Children nodes to render inside SidebarBody | null */
  children: _propTypes.default.node,

  /** @prop Optional css class string | ''  */
  className: _propTypes.default.string
};
SidebarBody.defaultProps = {
  children: null,
  className: ''
};
var _default = SidebarBody;
exports.default = _default;