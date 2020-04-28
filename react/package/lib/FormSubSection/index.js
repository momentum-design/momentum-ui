"use strict";

exports.__esModule = true;
exports.default = void 0;

var _react = _interopRequireDefault(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/** @component form */
var FormSubSection = function FormSubSection(props) {
  var label = props.label,
      children = props.children,
      description = props.description;
  return _react.default.createElement("div", {
    className: "sub-section"
  }, label && _react.default.createElement("h5", {
    className: "sub-section__label"
  }, label), description && _react.default.createElement("p", {
    className: "sub-section__description"
  }, description), children);
};

FormSubSection.propTypes = {
  /** @prop Children node to render inside FormSubSection | null */
  children: _propTypes.default.node,

  /** @prop Optional FormSubSection description text | '' */
  description: _propTypes.default.string,

  /** @prop Optional FormSubSection label text | '' */
  label: _propTypes.default.string
};
FormSubSection.defaultProps = {
  children: null,
  description: '',
  label: ''
};
FormSubSection.displayName = 'FormSubSection';
var _default = FormSubSection;
exports.default = _default;