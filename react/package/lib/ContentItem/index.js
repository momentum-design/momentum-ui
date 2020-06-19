"use strict";

exports.__esModule = true;
exports.default = void 0;

var _react = _interopRequireDefault(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _ChatContent = _interopRequireDefault(require("./ChatContent"));

var _FileContent = _interopRequireDefault(require("./FileContent"));

var _IconContent = _interopRequireDefault(require("./IconContent"));

var _omit = _interopRequireDefault(require("lodash/omit"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }

function _inheritsLoose(subClass, superClass) { subClass.prototype = Object.create(superClass.prototype); subClass.prototype.constructor = subClass; subClass.__proto__ = superClass; }

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

    var otherProps = (0, _omit.default)(_extends({}, props), ['gifIcon']);

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
        return /*#__PURE__*/_react.default.createElement("div", {
          className: 'md-content md-content--failed' + ("" + (className && " " + className || ''))
        }, /*#__PURE__*/_react.default.createElement("div", {
          className: "md-content--failed-container"
        }, /*#__PURE__*/_react.default.createElement("i", {
          className: "icon icon-warning_28 md-content--failed-warning"
        }), /*#__PURE__*/_react.default.createElement("p", {
          className: "md-content--failed-message"
        }, failedText)));
      } else if (type === 'chat') {
        return /*#__PURE__*/_react.default.createElement(_ChatContent.default, _extends({
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
        return /*#__PURE__*/_react.default.createElement(_FileContent.default, _extends({
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
        return /*#__PURE__*/_react.default.createElement(_IconContent.default, _extends({
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

    return /*#__PURE__*/_react.default.createElement("div", null, chosenItem());
  };

  return ContentItem;
}(_react.default.PureComponent);

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
  actionNode: _propTypes.default.node,

  /** @prop Set the Content Item's aspect size | null */
  aspect: _propTypes.default.oneOf(['fourThree', 'nineSixteen', 'oneOne', 'sixteenNine', 'tall', 'threeFour', 'threeTwo', 'twoThree', 'wide']),

  /** @prop Optional css class string | '' */
  className: _propTypes.default.string,

  /** @prop Set the image/gif of the Content Item | '' */
  content: _propTypes.default.string,

  /** @prop Set the failed text to show when content fails to load | '' */
  failedText: _propTypes.default.string,

  /** @prop Show the size of the file | '' */
  fileSize: _propTypes.default.string,

  /** @prop Show icon at top right corner of Content Item */
  gifIcon: _propTypes.default.string,

  /** @prop Height of the image in px */
  height: _propTypes.default.number,

  /** @prop Set the type of icon to show | '' */
  icon: _propTypes.default.string,

  /** @prop Show visibility of action node buttons | false */
  isProtected: _propTypes.default.bool,

  /** @prop Show loading spinner | false */
  loading: _propTypes.default.bool,

  /** @prop Change loading text */
  loadingText: _propTypes.default.string,

  /** @prop Additional css styling applied to the button | null  */
  style: _propTypes.default.object,

  /** @prop Set the subtitle of the Content Item | '' */
  subtitle: _propTypes.default.string,

  /** @prop Set the title of the Content Item | '' */
  title: _propTypes.default.string,

  /** @prop Set the type of Content Item to display */
  type: _propTypes.default.oneOf(['chat', 'file']),

  /** @prop Width of the image in px */
  width: _propTypes.default.number
};
var _default = ContentItem;
exports.default = _default;