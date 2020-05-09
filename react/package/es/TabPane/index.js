/** @component tabs */
import React from 'react';
import PropTypes from 'prop-types';

var TabPane = function TabPane(props) {
  var children = props.children,
      active = props.active;
  return React.createElement("div", {
    className: "md-tab__pane" + ("" + (active ? ' active' : ''))
  }, React.createElement("div", {
    className: "md-tab__content"
  }, children));
};

TabPane.propTypes = {
  /** @prop Determines if TabPane is active | false */
  active: PropTypes.bool,

  /** @prop Children nodes to render inside TabPane | null */
  children: PropTypes.node
};
TabPane.defaultProps = {
  active: false,
  children: null
};
TabPane.displayName = 'TabPane';
export default TabPane;