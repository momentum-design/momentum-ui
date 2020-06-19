"use strict";

exports.__esModule = true;
exports.default = void 0;

var _react = _interopRequireDefault(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _ = require("./..");

var _index = require("../utils/index");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }

function _inheritsLoose(subClass, superClass) { subClass.prototype = Object.create(superClass.prototype); subClass.prototype.constructor = subClass; subClass.__proto__ = superClass; }

var TopbarNav = /*#__PURE__*/function (_React$Component) {
  _inheritsLoose(TopbarNav, _React$Component);

  function TopbarNav() {
    return _React$Component.apply(this, arguments) || this;
  }

  var _proto = TopbarNav.prototype;

  _proto.render = function render() {
    var _this$props = this.props,
        alignment = _this$props.alignment,
        children = _this$props.children,
        className = _this$props.className,
        listProps = _this$props.listProps,
        otherProps = _objectWithoutPropertiesLoose(_this$props, ["alignment", "children", "className", "listProps"]);

    return /*#__PURE__*/_react.default.createElement("nav", _extends({
      className: _index.prefix + "-top-bar__nav" + ("" + (alignment ? " " + _index.prefix + "-top-bar__nav--" + alignment : '')) + ("" + (className && " " + className || ''))
    }, otherProps), /*#__PURE__*/_react.default.createElement(_.List, _extends({
      tabType: "horizontal"
    }, listProps), children));
  };

  return TopbarNav;
}(_react.default.Component);

TopbarNav.propTypes = {
  /** @prop Optional flex justify content alignment | '' */
  alignment: _propTypes.default.string,

  /** @prop Children node to render inside of TopbarNav | null */
  children: _propTypes.default.node,

  /** @prop Optional CSS class string | '' */
  className: _propTypes.default.string,

  /** @prop Optional object for List Component props | {} */
  listProps: _propTypes.default.object
};
TopbarNav.defaultProps = {
  alignment: null,
  children: null,
  className: '',
  listProps: {}
};
TopbarNav.displayName = 'TopbarNav';
var _default = TopbarNav;
exports.default = _default;