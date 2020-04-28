function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }

import React from 'react';
import PropTypes from 'prop-types';
import { snakeCase } from "../../utils/snakeCase";
import { Spinner } from "../..";

var FileContentItem = function FileContentItem(props) {
  var actionNode = props.actionNode,
      aspect = props.aspect,
      className = props.className,
      content = props.content,
      gifIcon = props.gifIcon,
      isProtected = props.isProtected,
      loading = props.loading,
      loadingText = props.loadingText,
      onClick = props.onClick,
      style = props.style,
      subtitle = props.subtitle,
      title = props.title,
      otherProps = _objectWithoutPropertiesLoose(props, ["actionNode", "aspect", "className", "content", "gifIcon", "isProtected", "loading", "loadingText", "onClick", "style", "subtitle", "title"]);

  var kebabify = function kebabify(aspect) {
    if (aspect === 'wide') {
      aspect = 'sixteenNine';
    }

    if (aspect === 'tall') {
      aspect = 'nineSixteen';
    }

    var kebab = snakeCase(aspect);
    return "md-content-file--" + kebab;
  };

  var handleKeyDown = function handleKeyDown(e) {
    if (e.which === 32 || e.which === 13 || e.charCode === 32 || e.charCode === 13) {
      onClick && onClick(e);
      e.preventDefault();
    }
  };

  return React.createElement("div", _extends({
    className: "md-content__container"
  }, otherProps), loading ? React.createElement("div", {
    className: "md-content-file",
    style: {
      backgroundImage: content && "url(" + content + ")"
    }
  }, React.createElement("div", {
    className: "" + (content && ' md-content--opacity' || '')
  }, React.createElement(Spinner, null))) : React.createElement("div", {
    className: 'md-content-file__block' + ("" + (aspect === 'oneOne' && ' content-file--no-border' || aspect === 'fourThree' && ' content-file--no-border' || ''))
  }, React.createElement("div", {
    className: "" + (aspect && kebabify(aspect) || '') + ("" + (!aspect && ' md-content-file--full' || '')) + ("" + (onClick && ' md-content-file--clickable' || '')) + ("" + (className && " " + className || '')),
    onKeyDown: handleKeyDown,
    onClick: onClick,
    role: "presentation",
    style: _extends({
      backgroundImage: content && "url(" + content + ")"
    }, style)
  }), !isProtected && actionNode && React.createElement("div", {
    className: "md-content-file__aspect"
  }, actionNode), gifIcon && React.createElement("i", {
    className: gifIcon + " md-content__gif" + ("" + (aspect === 'oneOne' && ' md-content__gif--oneOne' || aspect === 'fourThree' && ' md-content__gif--fourThree' || ''))
  })), React.createElement("div", {
    className: "md-content-file__info-container"
  }, title && React.createElement("span", {
    title: title,
    key: "title",
    className: "md-content-file__title"
  }, loading ? loadingText : title), subtitle && React.createElement("span", {
    key: "subtitle",
    className: "md-content-file__subtitle"
  }, subtitle)));
};

FileContentItem.defaultProps = {
  actionNode: null,
  aspect: null,
  className: '',
  content: '',
  gifIcon: '',
  icon: '',
  isProtected: null,
  loading: false,
  loadingText: 'Loading',
  onClick: null,
  style: null,
  subtitle: '',
  title: ''
};
FileContentItem.propTypes = {
  actionNode: PropTypes.node,
  aspect: PropTypes.oneOf(['fourThree', 'nineSixteen', 'oneOne', 'sixteenNine', 'tall', 'threeFour', 'threeTwo', 'twoThree', 'wide']),
  className: PropTypes.string,
  content: PropTypes.string,
  gifIcon: PropTypes.string,
  icon: PropTypes.string,
  isProtected: PropTypes.bool,
  loading: PropTypes.bool,
  loadingText: PropTypes.string,
  onClick: PropTypes.func,
  style: PropTypes.object,
  subtitle: PropTypes.string,
  title: PropTypes.string
};
FileContentItem.displayName = 'FileContentItem';
export default FileContentItem;