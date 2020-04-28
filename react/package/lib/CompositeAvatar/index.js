"use strict";

exports.__esModule = true;
exports.default = void 0;

var _react = _interopRequireDefault(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/** @component avatar */
var CompositeAvatar = function CompositeAvatar(props) {
  var children = props.children,
      className = props.className,
      size = props.size;
  return _react.default.createElement("div", {
    className: 'md-composite-avatar' + ("" + (size && " md-composite-avatar--" + size || '')) + ("" + (className && " " + className || ''))
  }, children);
};

CompositeAvatar.displayName = 'CompositeAvatar';
CompositeAvatar.propTypes = {
  /** @prop Children nodes to render inside CompositeAvatar | null */
  children: _propTypes.default.node,

  /** @prop Optional css class string | '' */
  className: _propTypes.default.string,

  /** @prop Sets the size of the CompositeAvatar | 'medium' */
  size: _propTypes.default.oneOf(['small', 'medium', 'large', 28, 40, 84, 135])
};
CompositeAvatar.defaultProps = {
  className: '',
  size: 'medium',
  children: null
};
var _default = CompositeAvatar;
exports.default = _default;