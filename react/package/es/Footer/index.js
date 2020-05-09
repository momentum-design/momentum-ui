function _inheritsLoose(subClass, superClass) { subClass.prototype = Object.create(superClass.prototype); subClass.prototype.constructor = subClass; subClass.__proto__ = superClass; }

/** @component footer */
import React from 'react';
import PropTypes from 'prop-types';

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
    var footerTopSection = children && React.createElement("section", {
      className: "md-footer__top"
    }, children);
    var footerBottomSection = (logo || copyright || social) && React.createElement("section", {
      className: "md-footer__bottom"
    }, (logo || copyright) && React.createElement("span", {
      className: "md-footer__bottom--position-left"
    }, React.createElement("span", {
      className: "md-footer__logo"
    }, logo), copyright), social && React.createElement("span", {
      className: "md-footer__bottom--position-right"
    }, social));
    return React.createElement("footer", {
      className: "md-footer" + (" md-footer--" + color) + (" " + className)
    }, footerTopSection, footerBottomSection);
  };

  return Footer;
}(React.Component);

export { Footer as default };
Footer.propTypes = {
  /** @prop Children nodes to render inside the Footer | null */
  children: PropTypes.node,

  /** @prop Optional css class string | '' */
  className: PropTypes.string,

  /** @prop Optional color css styling | 'dark' */
  color: PropTypes.string,

  /** @prop Set the copyright within the Footer | '' */
  copyright: PropTypes.string,

  /** @prop Set the logo within the Footer | null */
  logo: PropTypes.node,

  /** @prop Node containing social media links | null */
  social: PropTypes.node
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