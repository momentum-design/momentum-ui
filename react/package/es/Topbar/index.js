function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }

function _inheritsLoose(subClass, superClass) { subClass.prototype = Object.create(superClass.prototype); subClass.prototype.constructor = subClass; subClass.__proto__ = superClass; }

/** @component topbar */
import PropTypes from 'prop-types';
import React from 'react';
import { prefix } from "../utils/index";

var Topbar = /*#__PURE__*/function (_React$Component) {
  _inheritsLoose(Topbar, _React$Component);

  function Topbar() {
    return _React$Component.apply(this, arguments) || this;
  }

  var _proto = Topbar.prototype;

  _proto.render = function render() {
    var _this$props = this.props,
        anchor = _this$props.anchor,
        brandAnchorElement = _this$props.brandAnchorElement,
        children = _this$props.children,
        className = _this$props.className,
        color = _this$props.color,
        fixed = _this$props.fixed,
        icon = _this$props.icon,
        image = _this$props.image,
        title = _this$props.title,
        otherProps = _objectWithoutPropertiesLoose(_this$props, ["anchor", "brandAnchorElement", "children", "className", "color", "fixed", "icon", "image", "title"]);

    var topBarClass = prefix + "-top-bar";
    var brandClass = prefix + "-brand";
    var addPadding = (image || icon) && title;
    var brandNodeChildren = [React.createElement("div", {
      className: brandClass + "__logo" + ("" + (addPadding && " " + brandClass + "__logo--pad" || '')),
      key: brandClass + "__logo"
    }, image ? image : React.createElement("i", {
      className: "icon " + icon
    }))].concat(title && React.createElement("div", {
      className: brandClass + "__title",
      key: brandClass + "__title"
    }, title));

    var getBrandAnchor = function getBrandAnchor() {
      return brandAnchorElement ? React.cloneElement(brandAnchorElement, {
        className: "" + brandClass + ("" + (brandAnchorElement.props.className && " " + brandAnchorElement.props.className || ''))
      }, brandNodeChildren) : React.createElement("a", {
        className: brandClass,
        href: anchor
      }, brandNodeChildren);
    };

    var brandNode = React.createElement("div", {
      className: topBarClass + "__brand"
    }, getBrandAnchor());
    var injectChildren = React.Children.map(children, function (child) {
      if (child && child.type.displayName === 'TopbarMobile' && !child.props.brandNode) {
        return React.cloneElement(child, {
          brandNode: brandNode
        });
      } else {
        return child;
      }
    });
    return React.createElement("div", _extends({
      className: "" + topBarClass + ("" + (fixed && " " + topBarClass + "--fixed" || '')) + ("" + (color && " " + topBarClass + "--" + color || '')) + ("" + (className && " " + className || '')),
      role: "navigation"
    }, otherProps), React.createElement("div", {
      className: topBarClass + "__container"
    }, brandNode, injectChildren));
  };

  return Topbar;
}(React.Component);

Topbar.propTypes = {
  /** @prop App Url/Link | null */
  anchor: PropTypes.string,

  /** @prop Custom Node to wrap | null */
  brandAnchorElement: PropTypes.element,

  /** @prop Children nodes to render inside of Topbar | null */
  children: PropTypes.node,

  /** @prop Optional CSS class string | '' */
  className: PropTypes.string,

  /** @prop Topbar header color | '' */
  color: PropTypes.string,

  /** @prop Determines if Topbar is fixed to top | false */
  fixed: PropTypes.bool,

  /** @prop Icon class name | 'icon-cisco-logo' */
  icon: PropTypes.string,

  /** @prop Image node | null */
  image: PropTypes.node,

  /** @prop Topbar title text | '' */
  title: PropTypes.string
};
Topbar.defaultProps = {
  anchor: null,
  brandAnchorElement: null,
  children: null,
  className: '',
  color: 'dark',
  fixed: false,
  icon: 'icon-cisco-logo',
  image: null,
  title: ''
};
Topbar.displayName = 'Topbar';
export default Topbar;