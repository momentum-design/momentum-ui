function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }

import React from 'react';
import PropTypes from 'prop-types';
import { snakeCase } from "../../utils/snakeCase";
import { Spinner } from "../..";

var ChatContentItem = function ChatContentItem(props) {
  var actionNode = props.actionNode,
      aspect = props.aspect,
      className = props.className,
      content = props.content,
      fileSize = props.fileSize,
      gifIcon = props.gifIcon,
      isProtected = props.isProtected,
      loading = props.loading,
      onClick = props.onClick,
      style = props.style,
      title = props.title,
      otherProps = _objectWithoutPropertiesLoose(props, ["actionNode", "aspect", "className", "content", "fileSize", "gifIcon", "isProtected", "loading", "onClick", "style", "title"]);

  var kebabify = function kebabify(holder, aspect) {
    var cases = ['fourThree', 'sixteenNine', 'threeTwo'];
    var kebab = snakeCase(aspect);

    if (holder === 'container') {
      if (cases.includes(aspect)) {
        return " md-content__chat-" + kebab;
      }
    } else if (holder === 'inner') {
      if (cases.includes(aspect)) {
        return ' md-content-file--full';
      } else {
        return " md-content-file--chat-" + kebab;
      }
    }
  };

  var handleKeyDown = function handleKeyDown(e) {
    if (e.which === 32 || e.which === 13 || e.charCode === 32 || e.charCode === 13) {
      onClick && onClick(e);
      e.preventDefault();
    }
  };

  return /*#__PURE__*/React.createElement("div", _extends({
    className: 'md-content__chat-inner-container' + ("" + (aspect === 'wide' && ' md-content__chat-wide-container' || '')) + ("" + (aspect && kebabify('container', aspect) || ''))
  }, otherProps), /*#__PURE__*/React.createElement("div", {
    className: "" + (aspect && kebabify('inner', aspect) || '') + ("" + (!aspect && ' md-content-file--full' || '')) + ("" + (onClick && ' md-content-file--clickable' || '')) + ("" + (className && " " + className || '')),
    onClick: onClick,
    onKeyDown: handleKeyDown,
    role: "presentation",
    style: _extends({
      backgroundImage: content && "url(" + content + ")"
    }, style)
  }, loading && /*#__PURE__*/React.createElement("div", {
    className: "" + (content ? ' md-content--opacity' : ' md-content--centered')
  }, /*#__PURE__*/React.createElement(Spinner, null)), gifIcon && /*#__PURE__*/React.createElement("i", {
    className: gifIcon + " md-content__gif"
  })), !loading && /*#__PURE__*/React.createElement("div", {
    className: 'md-content__hover' + ("" + (aspect === 'wide' && ' md-content__hover--wide' || ''))
  }, /*#__PURE__*/React.createElement("div", {
    className: "md-content__hover-files"
  }, /*#__PURE__*/React.createElement("span", {
    title: title,
    className: "md-content__hover-files--file-name"
  }, title), /*#__PURE__*/React.createElement("span", {
    className: "md-content__hover-files--file-size"
  }, fileSize)), actionNode && !isProtected && /*#__PURE__*/React.createElement("div", {
    className: "md-content__hover-icons"
  }, actionNode)));
};

ChatContentItem.defaultProps = {
  actionNode: null,
  aspect: null,
  className: '',
  content: '',
  fileSize: '',
  gifIcon: '',
  isProtected: null,
  loading: false,
  onClick: null,
  style: null,
  title: '',
  type: ''
};
ChatContentItem.propTypes = {
  actionNode: PropTypes.node,
  aspect: PropTypes.oneOf(['oneOne', 'tall', 'threeFour', 'wide', 'fourThree', 'nineSixteen', 'sixteenNine', 'twoThree', 'threeTwo']),
  className: PropTypes.string,
  content: PropTypes.string,
  fileSize: PropTypes.string,
  gifIcon: PropTypes.string,
  isProtected: PropTypes.bool,
  loading: PropTypes.bool,
  onClick: PropTypes.func,
  style: PropTypes.object,
  title: PropTypes.string,
  type: PropTypes.string
};
ChatContentItem.displayName = 'ChatContentItem';
export default ChatContentItem;