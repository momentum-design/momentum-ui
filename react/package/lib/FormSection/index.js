"use strict";

exports.__esModule = true;
exports.default = void 0;

var _react = _interopRequireDefault(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _ = require("./..");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/** @component form */
var FormSection = function FormSection(props) {
  var title = props.title,
      description = props.description,
      children = props.children;
  return /*#__PURE__*/_react.default.createElement("div", {
    className: "md-form__section"
  }, /*#__PURE__*/_react.default.createElement(_.FormInfo, {
    title: title,
    description: description
  }), /*#__PURE__*/_react.default.createElement(_.FormContent, null, children));
};

FormSection.propTypes = {
  /** @prop Children node to render inside FormSection | null */
  children: _propTypes.default.node,

  /** @prop Optional FormSection description | '' */
  description: _propTypes.default.string,

  /** @prop Optional FormSection title | null */
  title: _propTypes.default.string.isRequired
};
FormSection.defaultProps = {
  children: null,
  description: '',
  title: null
};
FormSection.displayName = 'FormSection';
var _default = FormSection;
exports.default = _default;