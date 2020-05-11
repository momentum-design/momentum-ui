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

    var kebab = (0, _snakeCase.snakeCase)(aspect);
    return "md-content-file--" + kebab;
  };

  var handleKeyDown = function handleKeyDown(e) {
    if (e.which === 32 || e.which === 13 || e.charCode === 32 || e.charCode === 13) {
      onClick && onClick(e);
      e.preventDefault();
    }
  };

  return _react.default.createElement("div", _extends({
    className: "md-content__container"
  }, otherProps), loading ? _react.default.createElement("div", {
    className: "md-content-file",
    style: {
      backgroundImage: content && "url(" + content + ")"
    }
  }, _react.default.createElement("div", {
    className: "" + (content && ' md-content--opacity' || '')
  }, _react.default.createElement(_.Spinner, null))) : _react.default.createElement("div", {
    className: 'md-content-file__block' + ("" + (aspect === 'oneOne' && ' content-file--no-border' || aspect === 'fourThree' && ' content-file--no-border' || ''))
  }, _react.default.createElement("div", {
    className: "" + (aspect && kebabify(aspect) || '') + ("" + (!aspect && ' md-content-file--full' || '')) + ("" + (onClick && ' md-content-file--clickable' || '')) + ("" + (className && " " + className || '')),
    onKeyDown: handleKeyDown,
    onClick: onClick,
    role: "presentation",
    style: _extends({
      backgroundImage: content && "url(" + content + ")"
    }, style)
  }), !isProtected && actionNode && _react.default.createElement("div", {
    className: "md-content-file__aspect"
  }, actionNode), gifIcon && _react.default.createElement("i", {
    className: gifIcon + " md-content__gif" + ("" + (aspect === 'oneOne' && ' md-content__gif--oneOne' || aspect === 'fourThree' && ' md-content__gif--fourThree' || ''))
  })), _react.default.createElement("div", {
    className: "md-content-file__info-container"
  }, title && _react.default.createElement("span", {
    title: title,
    key: "title",
    className: "md-content-file__title"
  }, loading ? loadingText : title), subtitle && _react.default.createElement("span", {
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
  actionNode: _propTypes.default.node,
  aspect: _propTypes.default.oneOf(['fourThree', 'nineSixteen', 'oneOne', 'sixteenNine', 'tall', 'threeFour', 'threeTwo', 'twoThree', 'wide']),
  className: _propTypes.default.string,
  content: _propTypes.default.string,
  gifIcon: _propTypes.default.string,
  icon: _propTypes.default.string,
  isProtected: _propTypes.default.bool,
  loading: _propTypes.default.bool,
  loadingText: _propTypes.default.string,
  onClick: _propTypes.default.func,
  style: _propTypes.default.object,
  subtitle: _propTypes.default.string,
  title: _propTypes.default.string
};
FileContentItem.displayName = 'FileContentItem';
var _default = FileContentItem;
exports.default = _default;