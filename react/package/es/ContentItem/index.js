function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }

function _inheritsLoose(subClass, superClass) { subClass.prototype = Object.create(superClass.prototype); subClass.prototype.constructor = subClass; subClass.__proto__ = superClass; }

/** @component content-item */
import React from 'react';
import PropTypes from 'prop-types';
import ChatContentItem from "./ChatContent";
import FileContentItem from "./FileContent";
import IconContent from "./IconContent";
import omit from 'lodash/omit';

var ContentItem = /*#__PURE__*/function (_React$PureComponent) {
  _inheritsLoose(ContentItem, _React$PureComponent);

  function ContentItem() {
    return _React$PureComponent.apply(this, arguments) || this;
  }

  var _proto = ContentItem.prototype;

  _proto.render = function render() {
    var _this$props = this.props,
        actionNode = _this$props.actionNode,
        aspect = _this$props.aspect,
        className = _this$props.className,
        content = _this$props.content,
        failedText = _this$props.failedText,
        fileSize = _this$props.fileSize,
        height = _this$props.height,
        icon = _this$props.icon,
        isProtected = _this$props.isProtected,
        loading = _this$props.loading,
        loadingText = _this$props.loadingText,
        style = _this$props.style,
        subtitle = _this$props.subtitle,
        title = _this$props.title,
        type = _this$props.type,
        width = _this$props.width,
        props = _objectWithoutPropertiesLoose(_this$props, ["actionNode", "aspect", "className", "content", "failedText", "fileSize", "height", "icon", "isProtected", "loading", "loadingText", "style", "subtitle", "title", "type", "width"]);

    var otherProps = omit(_extends({}, props), ['gifIcon']);

    var findAspect = function findAspect(width, height) {
      if (width && height) {
        var aspectRatioObj = {
          1: 'oneOne',
          .75: 'threeFour',
          .66: 'twoThree',
          .4: 'tall',
          4.35: 'wide',
          1.33: 'fourThree',
          1.5: 'threeTwo',
          1.78: 'sixteenNine'
        };
        var providedAspectRatio = width / height;
        var closestAspectRatio = Object.keys(aspectRatioObj).reduce(function (prev, curr) {
          return Math.abs(curr - providedAspectRatio) < Math.abs(prev - providedAspectRatio) ? curr : prev;
        });
        return aspectRatioObj[closestAspectRatio];
      }

      return type === 'chat' ? 'sixteenNine' : 'threeTwo';
    };

    var chosenItem = function chosenItem() {
      if (failedText && type === 'chat') {
        return React.createElement("div", {
          className: 'md-content md-content--failed' + ("" + (className && " " + className || ''))
        }, React.createElement("div", {
          className: "md-content--failed-container"
        }, React.createElement("i", {
          className: "icon icon-warning_28 md-content--failed-warning"
        }), React.createElement("p", {
          className: "md-content--failed-message"
        }, failedText)));
      } else if (type === 'chat') {
        return React.createElement(ChatContentItem, _extends({
          actionNode: actionNode,
          aspect: aspect ? aspect : findAspect(width, height),
          className: className,
          content: content,
          fileSize: fileSize,
          height: height,
          isProtected: isProtected,
          loading: loading,
          style: style,
          title: title,
          type: type,
          width: width
        }, props));
      } else if (type === 'file' && !icon) {
        return React.createElement(FileContentItem, _extends({
          actionNode: actionNode,
          aspect: aspect ? aspect : findAspect(width, height),
          className: className,
          content: content,
          height: height,
          icon: icon,
          isProtected: isProtected,
          loading: loading,
          loadingText: loadingText,
          subtitle: subtitle,
          title: title,
          type: type,
          width: width
        }, props));
      } else if (icon) {
        return React.createElement(IconContent, _extends({
          actionNode: actionNode,
          className: className,
          icon: icon,
          isProtected: isProtected,
          loading: loading,
          subtitle: subtitle,
          title: title
        }, otherProps));
      }
    };

    return React.createElement("div", null, chosenItem());
  };

  return ContentItem;
}(React.PureComponent);

ContentItem.displayName = 'ContentItem';
ContentItem.defaultProps = {
  actionNode: null,
  aspect: null,
  className: '',
  content: null,
  failedText: '',
  fileSize: '',
  icon: '',
  isProtected: false,
  loading: false,
  loadingText: 'Loading',
  style: null,
  subtitle: '',
  title: '',
  type: 'chat'
};
ContentItem.propTypes = {
  /** @prop Node to render buttons inside Content Item | null */
  actionNode: PropTypes.node,

  /** @prop Set the Content Item's aspect size | null */
  aspect: PropTypes.oneOf(['fourThree', 'nineSixteen', 'oneOne', 'sixteenNine', 'tall', 'threeFour', 'threeTwo', 'twoThree', 'wide']),

  /** @prop Optional css class string | '' */
  className: PropTypes.string,

  /** @prop Set the image/gif of the Content Item | '' */
  content: PropTypes.string,

  /** @prop Set the failed text to show when content fails to load | '' */
  failedText: PropTypes.string,

  /** @prop Show the size of the file | '' */
  fileSize: PropTypes.string,

  /** @prop Show icon at top right corner of Content Item */
  gifIcon: PropTypes.string,

  /** @prop Height of the image in px */
  height: PropTypes.number,

  /** @prop Set the type of icon to show | '' */
  icon: PropTypes.string,

  /** @prop Show visibility of action node buttons | false */
  isProtected: PropTypes.bool,

  /** @prop Show loading spinner | false */
  loading: PropTypes.bool,

  /** @prop Change loading text */
  loadingText: PropTypes.string,

  /** @prop Additional css styling applied to the button | null  */
  style: PropTypes.object,

  /** @prop Set the subtitle of the Content Item | '' */
  subtitle: PropTypes.string,

  /** @prop Set the title of the Content Item | '' */
  title: PropTypes.string,

  /** @prop Set the type of Content Item to display */
  type: PropTypes.oneOf(['chat', 'file']),

  /** @prop Width of the image in px */
  width: PropTypes.number
};
export default ContentItem;