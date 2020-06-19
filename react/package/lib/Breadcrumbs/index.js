"use strict";

exports.__esModule = true;
exports.default = void 0;

var _react = _interopRequireDefault(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _inheritsLoose(subClass, superClass) { subClass.prototype = Object.create(superClass.prototype); subClass.prototype.constructor = subClass; subClass.__proto__ = superClass; }

var Breadcrumbs = /*#__PURE__*/function (_React$PureComponent) {
  _inheritsLoose(Breadcrumbs, _React$PureComponent);

  function Breadcrumbs() {
    return _React$PureComponent.apply(this, arguments) || this;
  }

  var _proto = Breadcrumbs.prototype;

  _proto.render = function render() {
    var _this$props = this.props,
        className = _this$props.className,
        children = _this$props.children;

    var items = _react.default.Children.map(children, function (child, idx) {
      if (children.length - 1 === idx || !children.length) {
        return /*#__PURE__*/_react.default.cloneElement(child, {
          className: 'current'
        });
      }

      return child;
    });

    return /*#__PURE__*/_react.default.createElement("ul", {
      className: 'md-breadcrumbs' + (" " + className)
    }, items);
  };

  return Breadcrumbs;
}(_react.default.PureComponent);

Breadcrumbs.displayName = 'Breadcrumbs';
Breadcrumbs.propTypes = {
  /** @prop Children nodes to render inside Breadcrumbs | null */
  children: _propTypes.default.node,

  /** @prop Optional css class string | '' */
  className: _propTypes.default.string
};
Breadcrumbs.defaultProps = {
  children: null,
  className: ''
};
var _default = Breadcrumbs;
exports.default = _default;