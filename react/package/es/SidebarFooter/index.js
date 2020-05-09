function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }

/** @component sidebar */
import React from 'react';
import PropTypes from 'prop-types';

var SidebarFooter = function SidebarFooter(props) {
  var children = props.children,
      className = props.className,
      otherProps = _objectWithoutPropertiesLoose(props, ["children", "className"]);

  return React.createElement("div", _extends({
    className: "md-sidebar__footer" + ("" + (className && " " + className || ''))
  }, otherProps), children);
};

SidebarFooter.displayName = 'SidebarFooter';
SidebarFooter.propTypes = {
  /** @prop Children nodes to render inside SidebarFooter | null */
  children: PropTypes.node,

  /** @prop Optional css class string | ''  */
  className: PropTypes.string
};
SidebarFooter.defaultProps = {
  children: null,
  className: ''
};
export default SidebarFooter;