"use strict";

exports.__esModule = true;
exports.default = void 0;

var _react = _interopRequireDefault(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _snakeCase = require("../../utils/snakeCase");

var _ = require("../..");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }

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
    var kebab = (0, _snakeCase.snakeCase)(aspect);

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

  return _react.default.createElement("div", _extends({
    className: 'md-content__chat-inner-container' + ("" + (aspect === 'wide' && ' md-content__chat-wide-container' || '')) + ("" + (aspect && kebabify('container', aspect) || ''))
  }, otherProps), _react.default.createElement("div", {
    className: "" + (aspect && kebabify('inner', aspect) || '') + ("" + (!aspect && ' md-content-file--full' || '')) + ("" + (onClick && ' md-content-file--clickable' || '')) + ("" + (className && " " + className || '')),
    onClick: onClick,
    onKeyDown: handleKeyDown,
    role: "presentation",
    style: _extends({
      backgroundImage: content && "url(" + content + ")"
    }, style)
  }, loading && _react.default.createElement("div", {
    className: "" + (content ? ' md-content--opacity' : ' md-content--centered')
  }, _react.default.createElement(_.Spinner, null)), gifIcon && _react.default.createElement("i", {
    className: gifIcon + " md-content__gif"
  })), !loading && _react.default.createElement("div", {
    className: 'md-content__hover' + ("" + (aspect === 'wide' && ' md-content__hover--wide' || ''))
  }, _react.default.createElement("div", {
    className: "md-content__hover-files"
  }, _react.default.createElement("span", {
    title: title,
    className: "md-content__hover-files--file-name"
  }, title), _react.default.createElement("span", {
    className: "md-content__hover-files--file-size"
  }, fileSize)), actionNode && !isProtected && _react.default.createElement("div", {
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
  actionNode: _propTypes.default.node,
  aspect: _propTypes.default.oneOf(['oneOne', 'tall', 'threeFour', 'wide', 'fourThree', 'nineSixteen', 'sixteenNine', 'twoThree', 'threeTwo']),
  className: _propTypes.default.string,
  content: _propTypes.default.string,
  fileSize: _propTypes.default.string,
  gifIcon: _propTypes.default.string,
  isProtected: _propTypes.default.bool,
  loading: _propTypes.default.bool,
  onClick: _propTypes.default.func,
  style: _propTypes.default.object,
  title: _propTypes.default.string,
  type: _propTypes.default.string
};
ChatContentItem.displayName = 'ChatContentItem';
var _default = ChatContentItem;
exports.default = _default;