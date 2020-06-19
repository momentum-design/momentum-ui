"use strict";

exports.__esModule = true;
exports.default = void 0;

var _react = _interopRequireDefault(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/** @component accordion */
var AccordionContent = function AccordionContent(props) {
  var children = props.children,
      className = props.className;
  return /*#__PURE__*/_react.default.createElement("div", {
    className: "md-accordion__content" + ("" + (className && " " + className || ''))
  }, children);
};

AccordionContent.displayName = 'AccordionContent';
AccordionContent.propTypes = {
  /** @prop Children nodes to render inside AccordionContent | null */
  children: _propTypes.default.node,

  /** @prop Optional css class string | ''  */
  className: _propTypes.default.string
};
AccordionContent.defaultProps = {
  children: null,
  className: ''
};
var _default = AccordionContent;
exports.default = _default;