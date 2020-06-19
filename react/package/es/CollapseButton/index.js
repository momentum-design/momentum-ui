function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }

/** @component collapse-button */
import React from 'react';
import PropTypes from 'prop-types';
import { Button, Icon } from "./..";

var CollapseButton = function CollapseButton(props) {
  var alignment = props.alignment,
      className = props.className,
      collapse = props.collapse,
      onClick = props.onClick,
      otherProps = _objectWithoutPropertiesLoose(props, ["alignment", "className", "collapse", "onClick"]);

  var handleClick = function handleClick() {
    onClick && onClick();
  };

  var getIconName = function getIconName() {
    return collapse ? 'panel-control-right_12' : 'panel-control-left_12';
  };

  return /*#__PURE__*/React.createElement(Button, _extends({
    ariaLabel: collapse ? 'expand' : 'collapse',
    className: 'md-collapse-button' + (" md-collapse-button--" + alignment) + ("" + (className && " " + className || '')),
    children: /*#__PURE__*/React.createElement(Icon, {
      name: getIconName()
    }),
    onClick: function onClick() {
      return handleClick();
    }
  }, otherProps));
};

CollapseButton.propTypes = {
  /** @prop Sets the positioning of the CollapseButton | 'left' */
  alignment: PropTypes.oneOf(['left', 'right', 'top', 'bottom']),

  /** @prop Optional css class string | '' */
  className: PropTypes.string,

  /** @prop Sets the collapse css styling | true */
  collapse: PropTypes.bool,

  /** @prop Handler to be called when the user taps the CollapseButton | null */
  onClick: PropTypes.func
};
CollapseButton.defaultProps = {
  alignment: 'left',
  className: '',
  collapse: true,
  onClick: null
};
CollapseButton.displayName = 'CollapseButton';
export default CollapseButton;