"use strict";

exports.__esModule = true;
exports.default = void 0;

var _propTypes = _interopRequireDefault(require("prop-types"));

var _react = _interopRequireDefault(require("react"));

var _ = require("./..");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/** @component radio */
var Radio = function Radio(props) {
  var checked = props.checked,
      children = props.children,
      className = props.className,
      disabled = props.disabled,
      htmlId = props.htmlId,
      inputRef = props.inputRef,
      label = props.label,
      name = props.name,
      nestedLevel = props.nestedLevel,
      onChange = props.onChange,
      required = props.required,
      tabIndex = props.tabIndex,
      value = props.value;
  return _react.default.createElement("div", {
    className: 'md-input-container md-radio' + ("" + (nestedLevel && " md-input--nested-" + nestedLevel || '')) + (" " + className)
  }, _react.default.createElement("input", {
    className: 'md-input md-radio__input',
    type: "radio",
    ref: inputRef,
    disabled: disabled,
    checked: checked,
    required: required,
    name: name,
    value: value,
    id: htmlId,
    onChange: onChange,
    tabIndex: tabIndex
  }), _react.default.createElement(_.Label, {
    className: "md-radio__label",
    label: label,
    htmlFor: htmlId
  }), children);
};

Radio.propTypes = {
  /** @prop Boolean for whether the Radio button is checked | false */
  checked: _propTypes.default.bool,

  /** @prop Children nodes to render insdie Radio component | null */
  children: _propTypes.default.node,

  /** @prop Optional CSS class name | '' */
  className: _propTypes.default.string,

  /** @prop Sets the attribute disabled to the Radio | false */
  disabled: _propTypes.default.bool,

  /** @prop Unique HTML ID used for tying label to HTML input for automated testing */
  htmlId: _propTypes.default.string.isRequired,

  /** @prop Optional ref attribute for Radio input element | null */
  inputRef: _propTypes.default.func,

  /** @prop Radio label text | '' */
  label: _propTypes.default.string,

  /** @prop Radio name string | '' */
  name: _propTypes.default.string,

  /** @prop Set the level of nested Radios | 0 */
  nestedLevel: _propTypes.default.number,

  /** @prop Callback function invoked when user makes a change with the Radio button | null */
  onChange: _propTypes.default.func,

  /** @prop Requires the user to populate the Radio input | false */
  required: _propTypes.default.bool,

  /** @prop Set the tabIndex of radio | 0 */
  tabIndex: _propTypes.default.number,

  /** @prop String value that corresponds with Radio button | '' */
  value: _propTypes.default.string
};
Radio.defaultProps = {
  checked: false,
  children: null,
  className: '',
  disabled: false,
  inputRef: null,
  label: '',
  name: '',
  nestedLevel: 0,
  onChange: function onChange() {},
  required: false,
  tabIndex: 0,
  value: ''
};
Radio.displayName = 'Radio';
var _default = Radio;
exports.default = _default;