"use strict";

exports.__esModule = true;
exports.default = void 0;

var _react = _interopRequireDefault(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }

function _inheritsLoose(subClass, superClass) { subClass.prototype = Object.create(superClass.prototype); subClass.prototype.constructor = subClass; subClass.__proto__ = superClass; }

var MenuContent = /*#__PURE__*/function (_React$PureComponent) {
  _inheritsLoose(MenuContent, _React$PureComponent);

  function MenuContent() {
    return _React$PureComponent.apply(this, arguments) || this;
  }

  var _proto = MenuContent.prototype;

  _proto.render = function render() {
    var _this$props = this.props,
        children = _this$props.children,
        className = _this$props.className,
        props = _objectWithoutPropertiesLoose(_this$props, ["children", "className"]);

    return _react.default.createElement("div", _extends({
      className: 'md-menu-content' + ("" + (className && " " + className || ''))
    }, props), children);
  };

  return MenuContent;
}(_react.default.PureComponent);

MenuContent.propTypes = {
  /** @prop Children nodes to render inside MenuContent component | null */
  children: _propTypes.default.node,

  /** @prop Optional css class name | '' */
  className: _propTypes.default.string
};
MenuContent.defaultProps = {
  children: null,
  className: ''
};
MenuContent.displayName = 'MenuContent';
var _default = MenuContent;
exports.default = _default;