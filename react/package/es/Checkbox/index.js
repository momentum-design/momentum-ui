function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }

/** @component checkbox */
import PropTypes from 'prop-types';
import React from 'react';
import { Label } from "./..";

var Checkbox = function Checkbox(props) {
  var checked = props.checked,
      children = props.children,
      className = props.className,
      disabled = props.disabled,
      htmlId = props.htmlId,
      indeterminate = props.indeterminate,
      inputRef = props.inputRef,
      label = props.label,
      name = props.name,
      nestedLevel = props.nestedLevel,
      onChange = props.onChange,
      required = props.required,
      value = props.value,
      otherProps = _objectWithoutPropertiesLoose(props, ["checked", "children", "className", "disabled", "htmlId", "indeterminate", "inputRef", "label", "name", "nestedLevel", "onChange", "required", "value"]);

  return React.createElement("div", {
    className: 'md-input-container md-checkbox' + ("" + (nestedLevel && " md-input--nested-" + nestedLevel || '')) + (" " + className)
  }, React.createElement("input", _extends({
    "aria-checked": checked,
    className: "md-input md-checkbox__input" + ("" + (indeterminate && ' indeterminate' || '')),
    type: "checkbox",
    ref: inputRef,
    disabled: disabled,
    checked: checked,
    required: required,
    name: name,
    value: value,
    onChange: onChange,
    tabIndex: 0,
    id: htmlId
  }, otherProps)), React.createElement(Label, {
    className: "md-checkbox__label",
    label: label,
    htmlFor: htmlId
  }), children);
};

Checkbox.propTypes = {
  /** @prop Sets Checkbox status as checked | false */
  checked: PropTypes.bool,

  /** @prop Child component to display next to the input | null */
  children: PropTypes.node,

  /** @prop Optional css class string | ''  */
  className: PropTypes.string,

  /** @prop Sets the attribute disabled to the Checkbox | false */
  disabled: PropTypes.bool,

  /** @prop Unique HTML ID. Used for tying label to HTML input. Handy hook for automated testing */
  htmlId: PropTypes.string.isRequired,

  /** @prop Optional indeterminate capabilities of checkbox | false */
  indeterminate: PropTypes.bool,

  /** @prop optional ref attribute for Checkbox input element | null */
  inputRef: PropTypes.func,

  /** @prop Required label string for Checkbox */
  label: PropTypes.string.isRequired,

  /** @prop Sets the attribute name to the Checkbox input element | '' */
  name: PropTypes.string,

  /** @prop Set the level of nested checkboxes | 0 */
  nestedLevel: PropTypes.number,

  /** @prop Optional onChange handler invoked when user makes a change within the Checkbox input element | null */
  onChange: PropTypes.func,

  /** @prop Optional required setting for Checkbox input | false */
  required: PropTypes.bool,

  /** @prop sets value of the Checkbox input element | '' */
  value: PropTypes.string
};
Checkbox.defaultProps = {
  autoFocus: false,
  checked: false,
  className: '',
  disabled: false,
  indeterminate: false,
  inputRef: null,
  label: '',
  name: '',
  nestedLevel: 0,
  onChange: function onChange() {},
  required: false,
  value: ''
};
Checkbox.displayName = 'Checkbox';
export default Checkbox;