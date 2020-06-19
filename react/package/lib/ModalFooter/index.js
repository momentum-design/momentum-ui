"use strict";

exports.__esModule = true;
exports.default = void 0;

var _react = _interopRequireDefault(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/** @component modal */
var ModalFooter = function ModalFooter(props) {
  var className = props.className,
      children = props.children;
  return /*#__PURE__*/_react.default.createElement("div", {
    className: 'md-modal__footer' + ("" + (className && " " + className || ''))
  }, children);
};

ModalFooter.propTypes = {
  /** @prop Children nodes to render inside of ModalFooter | null */
  children: _propTypes.default.node,

  /** @prop Optional css class names | '' */
  className: _propTypes.default.string
};
ModalFooter.defaultProps = {
  children: null,
  className: ''
};
ModalFooter.displayName = 'ModalFooter';
var _default = ModalFooter;
exports.default = _default;