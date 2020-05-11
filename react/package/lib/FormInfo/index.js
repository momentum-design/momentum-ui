"use strict";

exports.__esModule = true;
exports.default = void 0;

var _react = _interopRequireDefault(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/** @component form */

/**
 * FormInfo is supplemental, organizational component used to help divide form
 **/
var FormInfo = function FormInfo(props) {
  var title = props.title,
      description = props.description;
  return _react.default.createElement("div", {
    className: "section__info"
  }, _react.default.createElement("h4", {
    className: "section__title"
  }, title), description && _react.default.createElement("p", {
    className: "section__description"
  }, description));
};

FormInfo.propTypes = {
  /** @prop Optional FormInfo description text | '' */
  description: _propTypes.default.string,

  /** @prop Optional FormInfo title | '' */
  title: _propTypes.default.string
};
FormInfo.defaultProps = {
  description: '',
  title: ''
};
FormInfo.displayName = 'FormInfo';
var _default = FormInfo;
exports.default = _default;