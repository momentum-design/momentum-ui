function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }

function _inheritsLoose(subClass, superClass) { subClass.prototype = Object.create(superClass.prototype); subClass.prototype.constructor = subClass; subClass.__proto__ = superClass; }

/** @component topbar */
import React from 'react';
import PropTypes from 'prop-types';
import { prefix } from "../utils/index";

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

    return React.createElement("div", _extends({
      className: prefix + "-top-bar__right" + ("" + (className && " " + className || ''))
    }, otherProps), children);
  };

  return TopbarRight;
}(React.PureComponent);

TopbarRight.propTypes = {
  /** @prop Children node to render inside of TopbarRight | null */
  children: PropTypes.node,

  /** @prop Optional CSS class string | '' */
  className: PropTypes.string
};
TopbarRight.defaultProps = {
  children: null,
  className: ''
};
TopbarRight.displayName = 'TopbarRight';
export default TopbarRight;