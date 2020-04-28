function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }

import React from 'react';
import PropTypes from 'prop-types';
import { Icon } from "../..";

var IconContent = function IconContent(props) {
  var actionNode = props.actionNode,
      className = props.className,
      icon = props.icon,
      isProtected = props.isProtected,
      loading = props.loading,
      onClick = props.onClick,
      subtitle = props.subtitle,
      title = props.title,
      otherProps = _objectWithoutPropertiesLoose(props, ["actionNode", "className", "icon", "isProtected", "loading", "onClick", "subtitle", "title"]);

  var handleKeyDown = function handleKeyDown(e) {
    if (e.which === 32 || e.which === 13 || e.charCode === 32 || e.charCode === 13) {
      onClick && onClick(e);
      e.preventDefault();
    }
  };

  return React.createElement("div", null, React.createElement("div", _extends({
    className: 'md-content-file' + ("" + (onClick && ' md-content-file--clickable' || '')) + ("" + (className && " " + className || '')),
    onClick: onClick,
    onKeyDown: handleKeyDown,
    role: "presentation"
  }, otherProps), !isProtected && actionNode && React.createElement("div", {
    className: "md-content-file__icon"
  }, actionNode), React.createElement("span", null, React.createElement(Icon, {
    name: icon
  }))), React.createElement("div", {
    className: "md-content-file__info-container"
  }, React.createElement("span", {
    className: "md-content-file__title"
  }, loading ? 'Loading' : title), React.createElement("span", {
    className: "md-content-file__subtitle"
  }, " ", subtitle, " ")));
};

IconContent.defaultProps = {
  actionNode: null,
  className: '',
  icon: '',
  isProtected: null,
  loading: false,
  onClick: null,
  subtitle: '',
  title: ''
};
IconContent.propTypes = {
  actionNode: PropTypes.node,
  className: PropTypes.string,
  icon: PropTypes.string,
  isProtected: PropTypes.bool,
  loading: PropTypes.bool,
  onClick: PropTypes.func,
  subtitle: PropTypes.string,
  title: PropTypes.string
};
IconContent.displayName = 'IconContent';
export default IconContent;