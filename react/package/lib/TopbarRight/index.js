"use strict";

exports.__esModule = true;
exports.default = void 0;

var _react = _interopRequireDefault(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _index = require("../utils/index");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }

function _inheritsLoose(subClass, superClass) { subClass.prototype = Object.create(superClass.prototype); subClass.prototype.constructor = subClass; subClass.__proto__ = superClass; }

var TopbarRight = /*#__PURE__*/function (_React$PureComponent) {
  _inheritsLoose(TopbarRight, _React$PureComponent);

  function TopbarRight() {
    return _React$PureComponent.apply(this, arguments) || this;
  }

  var _proto = TopbarRight.prototype;

  _proto.render = function render() {
    var _this$props = this.props,
        className = _this$props.className,
        children = _this$props.children,
        otherProps = _objectWithoutPropertiesLoose(_this$props, ["className", "children"]);

    return /*#__PURE__*/_react.default.createElement("div", _extends({
      className: _index.prefix + "-top-bar__right" + ("" + (className && " " + className || ''))
    }, otherProps), children);
  };

  return TopbarRight;
}(_react.default.PureComponent);

TopbarRight.propTypes = {
  /** @prop Children node to render inside of TopbarRight | null */
  children: _propTypes.default.node,

  /** @prop Optional CSS class string | '' */
  className: _propTypes.default.string
};
TopbarRight.defaultProps = {
  children: null,
  className: ''
};
TopbarRight.displayName = 'TopbarRight';
var _default = TopbarRight;
exports.default = _default;