function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }

/** @component label */
import React from 'react';
import PropTypes from 'prop-types';

var Label = function Label(_ref) {
  var children = _ref.children,
      className = _ref.className,
      htmlFor = _ref.htmlFor,
      label = _ref.label,
      theme = _ref.theme,
      props = _objectWithoutPropertiesLoose(_ref, ["children", "className", "htmlFor", "label", "theme"]);

  return React.createElement("label", _extends({
    className: 'md-label' + ("" + (className ? " " + className : '')) + ("" + (theme ? " md-label--" + theme : '')),
    htmlFor: htmlFor
  }, props), label ? React.createElement("span", null, label) : children);
};

Label.propTypes = {
  /** @prop Children nodes to render inside the Label | null */
  children: PropTypes.node,

  /** @prop HTML class name for associated Input | '' */
  className: PropTypes.string,

  /** @prop HTML ID for associated Input | null */
  htmlFor: PropTypes.string.isRequired,

  /** @prop Required Label text | null */
  label: PropTypes.string,

  /** @prop Set Label's color theme | '' */
  theme: PropTypes.string
};
Label.defaultProps = {
  children: null,
  className: '',
  htmlFor: null,
  label: null,
  theme: ''
};
Label.displayName = 'Label';
export default Label;