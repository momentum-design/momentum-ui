"use strict";

exports.__esModule = true;
exports.default = void 0;

var _react = _interopRequireDefault(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/** @component form */

/**
 * FormContent helps organize the content within a form section and provides a S wrapper;
 **/
var FormContent = function FormContent(props) {
  var children = props.children;
  return /*#__PURE__*/_react.default.createElement("div", {
    className: "section__content"
  }, children);
};

FormContent.propTypes = {
  /** @prop Children node to render inside FormContent | null */
  children: _propTypes.default.node
};
FormContent.deafultProps = {
  children: null
};
FormContent.displayName = 'FormContent';
var _default = FormContent;
exports.default = _default;