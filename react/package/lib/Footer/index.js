"use strict";

exports.__esModule = true;
exports.default = void 0;

var _react = _interopRequireDefault(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _inheritsLoose(subClass, superClass) { subClass.prototype = Object.create(superClass.prototype); subClass.prototype.constructor = subClass; subClass.__proto__ = superClass; }

var Footer = /*#__PURE__*/function (_React$Component) {
  _inheritsLoose(Footer, _React$Component);

  function Footer() {
    return _React$Component.apply(this, arguments) || this;
  }

  var _proto = Footer.prototype;

  _proto.render = function render() {
    var _this$props = this.props,
        color = _this$props.color,
        logo = _this$props.logo,
        copyright = _this$props.copyright,
        social = _this$props.social,
        className = _this$props.className,
        children = _this$props.children;

    var footerTopSection = children && /*#__PURE__*/_react.default.createElement("section", {
      className: "md-footer__top"
    }, children);

    var footerBottomSection = (logo || copyright || social) && /*#__PURE__*/_react.default.createElement("section", {
      className: "md-footer__bottom"
    }, (logo || copyright) && /*#__PURE__*/_react.default.createElement("span", {
      className: "md-footer__bottom--position-left"
    }, /*#__PURE__*/_react.default.createElement("span", {
      className: "md-footer__logo"
    }, logo), copyright), social && /*#__PURE__*/_react.default.createElement("span", {
      className: "md-footer__bottom--position-right"
    }, social));

    return /*#__PURE__*/_react.default.createElement("footer", {
      className: "md-footer" + (" md-footer--" + color) + (" " + className)
    }, footerTopSection, footerBottomSection);
  };

  return Footer;
}(_react.default.Component);

exports.default = Footer;
Footer.propTypes = {
  /** @prop Children nodes to render inside the Footer | null */
  children: _propTypes.default.node,

  /** @prop Optional css class string | '' */
  className: _propTypes.default.string,

  /** @prop Optional color css styling | 'dark' */
  color: _propTypes.default.string,

  /** @prop Set the copyright within the Footer | '' */
  copyright: _propTypes.default.string,

  /** @prop Set the logo within the Footer | null */
  logo: _propTypes.default.node,

  /** @prop Node containing social media links | null */
  social: _propTypes.default.node
};
Footer.defaultProps = {
  children: null,
  className: '',
  color: 'dark',
  copyright: '',
  logo: null,
  social: null
};
Footer.displayName = 'Footer';