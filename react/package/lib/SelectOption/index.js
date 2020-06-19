"use strict";

exports.__esModule = true;
exports.default = void 0;

var _react = _interopRequireDefault(require("react"));

var _reactDom = _interopRequireDefault(require("react-dom"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _ = require("./..");

var _SelectContext = _interopRequireDefault(require("../SelectContext"));

var _ListContext = _interopRequireDefault(require("../ListContext"));

var _reactUid = require("react-uid");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }

function _inheritsLoose(subClass, superClass) { subClass.prototype = Object.create(superClass.prototype); subClass.prototype.constructor = subClass; subClass.__proto__ = superClass; }

var SelectOption = /*#__PURE__*/function (_React$Component) {
  _inheritsLoose(SelectOption, _React$Component);

  function SelectOption() {
    return _React$Component.apply(this, arguments) || this;
  }

  var _proto = SelectOption.prototype;

  _proto.render = function render() {
    var _this = this;

    var _this$props = this.props,
        className = _this$props.className,
        active = _this$props.active,
        children = _this$props.children,
        label = _this$props.label,
        title = _this$props.title,
        props = _objectWithoutPropertiesLoose(_this$props, ["className", "active", "children", "label", "title"]);

    var separateChildren = function separateChildren(isMulti, cxtActive, uniqueId) {
      return isMulti ? /*#__PURE__*/_react.default.createElement(_.Checkbox, {
        htmlId: uniqueId + "__checkbox",
        label: label,
        checked: cxtActive || false,
        onChange: function onChange() {}
      }) : [/*#__PURE__*/_react.default.createElement(_.ListItemSection, {
        key: "child-0",
        position: "center"
      }, label || children), /*#__PURE__*/_react.default.createElement(_.ListItemSection, {
        key: "child-1",
        position: "right"
      }, cxtActive && /*#__PURE__*/_react.default.createElement(_.Icon, {
        color: "blue-50",
        name: "check_20"
      }))];
    };

    var keySource = function keySource(isMulti) {
      return "data-md-" + (isMulti ? 'keyboard' : 'event') + "-key";
    };

    return /*#__PURE__*/_react.default.createElement(_reactUid.UIDConsumer, {
      name: function name(id) {
        return "md-select-option-" + id;
      }
    }, function (id) {
      return /*#__PURE__*/_react.default.createElement(_SelectContext.default.Consumer, null, function (isMulti) {
        return /*#__PURE__*/_react.default.createElement(_ListContext.default.Consumer, null, function (listContext) {
          var cxtActive = active || listContext && listContext.active && _reactDom.default.findDOMNode(_this) && _reactDom.default.findDOMNode(_this).attributes[keySource(isMulti)] && _reactDom.default.findDOMNode(_this).attributes[keySource(isMulti)].value && listContext.active.includes(_reactDom.default.findDOMNode(_this).attributes[keySource(isMulti)].value);
          var uniqueId = _this.props.id || id;
          return /*#__PURE__*/_react.default.createElement(_.ListItem, _extends({
            className: "" + (className && " " + className || ''),
            id: uniqueId,
            label: label,
            title: title || label
          }, props), separateChildren(isMulti, cxtActive, uniqueId));
        });
      });
    });
  };

  return SelectOption;
}(_react.default.Component);

SelectOption.propTypes = {
  /** @prop SelectOption Boolean that describes active state | false */
  active: _propTypes.default.bool,

  /** @prop Children nodes to render inside SelectOption | null */
  children: _propTypes.default.node,

  /** @prop Optional HTML Class Name for ListItem | '' */
  className: _propTypes.default.string,

  /** @prop SelectOption ID | '' */
  id: _propTypes.default.string,

  /** @prop SelectOption label text | '' */
  label: _propTypes.default.string,

  /** @prop ListItem Title | '' */
  title: _propTypes.default.string,

  /** @prop SelectOption value | '' */
  value: _propTypes.default.string
};
SelectOption.defaultProps = {
  active: false,
  children: null,
  className: '',
  id: '',
  label: '',
  title: '',
  value: ''
};
SelectOption.displayName = 'SelectOption';
var _default = SelectOption;
exports.default = _default;