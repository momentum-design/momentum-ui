/** @component sidebar */
import React from 'react';
import PropTypes from 'prop-types';

var SidebarBody = function SidebarBody(props) {
  var children = props.children,
      className = props.className;
  return React.createElement("div", {
    className: "md-sidebar__body" + ("" + (className && " " + className || ''))
  }, children);
};

SidebarBody.displayName = 'SidebarBody';
SidebarBody.propTypes = {
  /** @prop Children nodes to render inside SidebarBody | null */
  children: PropTypes.node,

  /** @prop Optional css class string | ''  */
  className: PropTypes.string
};
SidebarBody.defaultProps = {
  children: null,
  className: ''
};
export default SidebarBody;