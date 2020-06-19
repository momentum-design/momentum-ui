"use strict";

exports.__esModule = true;
exports.default = void 0;

var _react = _interopRequireDefault(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _iconNames = _interopRequireDefault(require("@momentum-ui/icons/data/iconNames.json"));

var _ = require("./..");

var _getColorValue = _interopRequireDefault(require("@momentum-ui/utils/lib/getColorValue"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }

function _inheritsLoose(subClass, superClass) { subClass.prototype = Object.create(superClass.prototype); subClass.prototype.constructor = subClass; subClass.__proto__ = superClass; }

var Icon = /*#__PURE__*/function (_React$PureComponent) {
  _inheritsLoose(Icon, _React$PureComponent);

  function Icon() {
    return _React$PureComponent.apply(this, arguments) || this;
  }

  var _proto = Icon.prototype;

  _proto.render = function render() {
    var _this$props = this.props,
        append = _this$props.append,
        ariaLabel = _this$props.ariaLabel,
        buttonClassName = _this$props.buttonClassName,
        buttonProps = _this$props.buttonProps,
        color = _this$props.color,
        className = _this$props.className,
        description = _this$props.description,
        onClick = _this$props.onClick,
        name = _this$props.name,
        prepend = _this$props.prepend,
        size = _this$props.size,
        sizeOverride = _this$props.sizeOverride,
        style = _this$props.style,
        title = _this$props.title,
        type = _this$props.type,
        otherProps = _objectWithoutPropertiesLoose(_this$props, ["append", "ariaLabel", "buttonClassName", "buttonProps", "color", "className", "description", "onClick", "name", "prepend", "size", "sizeOverride", "style", "title", "type"]);

    var consoleHandler = function consoleHandler(message, data) {
      /* eslint-disable no-console */
      switch (message) {
        case 'color-warn':
          console.warn("[@momentum-ui/react] Icon: " + data + " may not exist in the design system," + " please use a color name from https://momentum.design/styles/color/style");
          break;

        case 'name-error':
          console.warn("[@momentum-ui/react] Icon: Icon " + data + " does not exist in the design system." + " Visit https://momentum.design/styles/icons/library for a list of available icons or to request a new icon.");
          break;
      }
      /* eslint-enable no-console */

    };

    var getSize = function getSize() {
      var defaultSize = 16;
      var sizeFromName = Number(name.split('_')[1]);
      return size || sizeFromName || defaultSize;
    };

    var getColor = function getColor() {
      if (color.startsWith('#')) {
        consoleHandler('color-warn', color);
        return color;
      }

      var value = (0, _getColorValue.default)(color);
      return value;
    };

    var getNameClass = function getNameClass() {
      var iconName = name.startsWith('icon-') ? name.replace(/^(icon-)/, '') : name;

      if (sizeOverride) {
        iconName = name.split('_')[0] + ("_" + getSize());
      }

      return _iconNames.default.includes(iconName) ? "icon-" + iconName : consoleHandler('name-error', iconName);
    };

    var styles = _extends({
      fontSize: getSize()
    }, color && {
      color: getColor()
    }, style);

    var getAriaLabel = function getAriaLabel() {
      if (ariaLabel) {
        return ariaLabel;
      }

      if (!ariaLabel) {
        if (title && description) return title + " " + description;
        if (title) return title;
        if (description) return description;
      }

      return null;
    };

    var getIcon = function getIcon() {
      return /*#__PURE__*/_react.default.createElement("i", _extends({
        className: "md-icon icon" + (" " + getNameClass()) + ("" + (className && " " + className || '')) + ("" + (prepend && " md-prepend" || '')) + ("" + (append && " md-append" || '')),
        "aria-label": !onClick ? getAriaLabel() : null,
        style: styles
      }, title && !onClick && {
        title: title
      }, !onClick && _extends({}, otherProps)));
    };

    return onClick ? /*#__PURE__*/_react.default.createElement(_.Button, _extends({
      className: 'md-button--icon' + ("" + (type && " md-button--icon-" + type || '')) + ("" + (buttonClassName && " " + buttonClassName || '')),
      ariaLabel: getAriaLabel(),
      onClick: onClick
    }, buttonProps, title && {
      title: title
    }, otherProps), getIcon()) : getIcon();
  };

  return Icon;
}(_react.default.PureComponent);

Icon.propTypes = {
  /** @prop Add margin to the left of Icon | null */
  append: _propTypes.default.bool,

  /** @prop Text to display for blindness accessibility features | null */
  ariaLabel: _propTypes.default.string,

  /** @prop Optional Button class name string | '' */
  buttonClassName: _propTypes.default.string,

  /** @prop Optional props to pass to underlying button component | null */
  buttonProps: _propTypes.default.object,

  /** @prop Optional color css styling | '' */
  color: _propTypes.default.string,

  /** @prop Optional class name string | '' */
  className: _propTypes.default.string,

  /** @prop Icon description text | '' */
  description: _propTypes.default.string,

  /** @prop Required Icon name */
  name: _propTypes.default.string.isRequired,

  /** @prop Handler invoked by click of the user | null */
  onClick: _propTypes.default.func,

  /** @prop Add margin to the right of Icon | null */
  prepend: _propTypes.default.bool,

  /** @prop Sets Icon size | null */
  size: _propTypes.default.number,
  // Internal prop to override iconName with size prop */
  sizeOverride: _propTypes.default.bool,

  /** @prop Additional style properties to be applied | null */
  style: _propTypes.default.object,

  /** @prop Sets Icon Title prop | '' */
  title: _propTypes.default.string,

  /** @prop Sets Icon Type | '' */
  type: _propTypes.default.oneOf(['', 'white'])
};
Icon.defaultProps = {
  append: false,
  ariaLabel: null,
  buttonClassName: '',
  buttonProps: null,
  color: '',
  className: '',
  description: '',
  onClick: null,
  prepend: false,
  size: null,
  sizeOverride: false,
  style: null,
  title: '',
  type: ''
};
Icon.displayName = 'Icon';
var _default = Icon;
exports.default = _default;