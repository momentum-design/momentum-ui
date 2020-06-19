function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }

function _inheritsLoose(subClass, superClass) { subClass.prototype = Object.create(superClass.prototype); subClass.prototype.constructor = subClass; subClass.__proto__ = superClass; }

/** @component alert */
import React from 'react';
import PropTypes from 'prop-types';

var AlertContainer = /*#__PURE__*/function (_React$Component) {
  _inheritsLoose(AlertContainer, _React$Component);

  function AlertContainer() {
    return _React$Component.apply(this, arguments) || this;
  }

  var _proto = AlertContainer.prototype;

  _proto.render = function render() {
    var _this$props = this.props,
        children = _this$props.children,
        className = _this$props.className,
        position = _this$props.position,
        otherProps = _objectWithoutPropertiesLoose(_this$props, ["children", "className", "position"]);

    return /*#__PURE__*/React.createElement("div", _extends({
      className: 'md-alert__container' + (" md-alert__container--" + position) + ("" + (className && " " + className || ''))
    }, otherProps, {
      role: "alert"
    }), children);
  };

  return AlertContainer;
}(React.Component);

AlertContainer.defaultProps = {
  children: null,
  className: '',
  position: 'bottom-right'
};
AlertContainer.propTypes = {
  /** @prop Children Nodes to Render inside container | null */
  children: PropTypes.node,

  /** @prop Optional css class string | '' */
  className: PropTypes.string,

  /** @prop Define alert's position with css class name | 'bottom-right' */
  position: PropTypes.oneOf(['top-left', 'top-center', 'top-right', 'bottom-left', 'bottom-center', 'bottom-right'])
};
AlertContainer.displayName = 'AlertContainer';
export default AlertContainer;