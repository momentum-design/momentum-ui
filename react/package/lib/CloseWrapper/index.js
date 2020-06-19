"use strict";

exports.__esModule = true;
exports.default = void 0;

var _react = _interopRequireDefault(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _ = require("./..");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }

function _inheritsLoose(subClass, superClass) { subClass.prototype = Object.create(superClass.prototype); subClass.prototype.constructor = subClass; subClass.__proto__ = superClass; }

var CloseWrapper = /*#__PURE__*/function (_React$PureComponent) {
  _inheritsLoose(CloseWrapper, _React$PureComponent);

  function CloseWrapper() {
    return _React$PureComponent.apply(this, arguments) || this;
  }

  var _proto = CloseWrapper.prototype;

  _proto.render = function render() {
    var _this$props = this.props,
        ariaLabel = _this$props.ariaLabel,
        children = _this$props.children,
        className = _this$props.className,
        actionNode = _this$props.actionNode,
        onClick = _this$props.onClick,
        otherProps = _objectWithoutPropertiesLoose(_this$props, ["ariaLabel", "children", "className", "actionNode", "onClick"]);

    var cloneChildren = function cloneChildren() {
      return _react.default.Children.map(children, function (child) {
        return /*#__PURE__*/_react.default.cloneElement(child, _extends({}, otherProps));
      });
    };

    var getInteractionNode = function getInteractionNode() {
      return actionNode ? actionNode : /*#__PURE__*/_react.default.createElement(_.Icon, {
        ariaLabel: ariaLabel,
        buttonClassName: "md-close-wrapper__action",
        name: "clear-active_20",
        onClick: onClick
      });
    };

    return /*#__PURE__*/_react.default.createElement("span", {
      className: "md-close-wrapper" + ("" + (className && " " + className || ''))
    }, cloneChildren(), getInteractionNode());
  };

  return CloseWrapper;
}(_react.default.PureComponent);

CloseWrapper.defaultProps = {
  ariaLabel: 'Close',
  children: null,
  className: '',
  actionNode: null,
  onClick: null
};
CloseWrapper.propTypes = {
  /** @prop Text to display for blindness accessibility features | '' */
  ariaLabel: _propTypes.default.string,

  /** @prop Children Nodes to Render inside CloseWrapper | null */
  children: _propTypes.default.node,

  /** @prop Optional css class string | '' */
  className: _propTypes.default.string,

  /** @prop Node to replace default close icon | null */
  actionNode: _propTypes.default.node,

  /** @prop Handler when the user clicks the close icon button | () => {} */
  onClick: _propTypes.default.func
};
CloseWrapper.displayName = 'CloseWrapper';
var _default = CloseWrapper;
exports.default = _default;