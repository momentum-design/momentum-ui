function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }

/** @component link */
import React from 'react';
import PropTypes from 'prop-types';

var Link = function Link(_ref) {
  var className = _ref.className,
      children = _ref.children,
      color = _ref.color,
      disabled = _ref.disabled,
      tag = _ref.tag,
      theme = _ref.theme,
      props = _objectWithoutPropertiesLoose(_ref, ["className", "children", "color", "disabled", "tag", "theme"]);

  return React.createElement(tag, _extends({
    className: 'md-link' + ("" + (color && " md-link--" + color || '')) + ("" + (theme && " md-link--" + theme || '')) + ("" + (className && " " + className || '')),
    disabled: disabled
  }, !disabled && {
    tabIndex: 0
  }, {}, props), children);
};

Link.propTypes = {
  /** @prop Children nodes to render inside Link Component | null */
  children: PropTypes.node.isRequired,

  /** @prop Optional css class string | '' */
  className: PropTypes.string,

  /** @prop Optional color css styling | 'blue' */
  color: PropTypes.string,

  /** @prop Sets the attribute disabled to the Link | false */
  disabled: PropTypes.bool,

  /** @prop Set HTML tag type | 'a' */
  tag: PropTypes.oneOf(['a', 'div', 'span']),

  /** @prop Set Link theme | ''  */
  theme: PropTypes.string
};
Link.defaultProps = {
  children: null,
  className: '',
  color: 'blue',
  disabled: false,
  tag: 'a',
  theme: ''
};
Link.displayName = 'Link';
export default Link;