function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }

/** @component card */
import React from 'react';
import PropTypes from 'prop-types';

var Card = function Card(props) {
  var children = props.children,
      className = props.className,
      onClick = props.onClick,
      otherProps = _objectWithoutPropertiesLoose(props, ["children", "className", "onClick"]);

  var handleKeyDown = function handleKeyDown(e) {
    if (e.which === 32 || e.which === 13 || e.charCode === 32 || e.charCode === 13) {
      onClick && onClick(e);
      e.preventDefault();
    }
  };

  return React.createElement("div", _extends({
    className: "md-card" + ("" + (onClick && " md-card--clickable" || '')) + ("" + (className && " " + className || '')),
    onClick: onClick,
    onKeyDown: handleKeyDown,
    role: "presentation"
  }, otherProps), children);
};

Card.propTypes = {
  /** @prop Children nodes to render inside of Card | null */
  children: PropTypes.node,

  /** @prop Optional CSS class names | '' */
  className: PropTypes.string,

  /** @prop Handler to be called when the card is clicked | '' */
  onClick: PropTypes.func
};
Card.defaultProps = {
  children: null,
  className: '',
  onClick: null
};
Card.displayName = 'Card';
export default Card;