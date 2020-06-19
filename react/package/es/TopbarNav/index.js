function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }

function _inheritsLoose(subClass, superClass) { subClass.prototype = Object.create(superClass.prototype); subClass.prototype.constructor = subClass; subClass.__proto__ = superClass; }

/** @component topbar */
import React from 'react';
import PropTypes from 'prop-types';
import { List } from "./..";
import { prefix } from "../utils/index";

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

    return /*#__PURE__*/React.createElement("nav", _extends({
      className: prefix + "-top-bar__nav" + ("" + (alignment ? " " + prefix + "-top-bar__nav--" + alignment : '')) + ("" + (className && " " + className || ''))
    }, otherProps), /*#__PURE__*/React.createElement(List, _extends({
      tabType: "horizontal"
    }, listProps), children));
  };

  return TopbarNav;
}(React.Component);

TopbarNav.propTypes = {
  /** @prop Optional flex justify content alignment | '' */
  alignment: PropTypes.string,

  /** @prop Children node to render inside of TopbarNav | null */
  children: PropTypes.node,

  /** @prop Optional CSS class string | '' */
  className: PropTypes.string,

  /** @prop Optional object for List Component props | {} */
  listProps: PropTypes.object
};
TopbarNav.defaultProps = {
  alignment: null,
  children: null,
  className: '',
  listProps: {}
};
TopbarNav.displayName = 'TopbarNav';
export default TopbarNav;