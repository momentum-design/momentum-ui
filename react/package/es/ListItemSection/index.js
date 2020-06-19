function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }

/** @component list-item */
import React from 'react';
import PropTypes from 'prop-types';

var ListItemSection = function ListItemSection(props) {
  var children = props.children,
      className = props.className,
      position = props.position,
      otherProps = _objectWithoutPropertiesLoose(props, ["children", "className", "position"]);

  return /*#__PURE__*/React.createElement("div", _extends({
    className: "md-list-item__" + position + ("" + (className && " " + className || ''))
  }, otherProps), children);
};

ListItemSection.propTypes = {
  /** @prop Children nodes to render inside ListItemSection | null */
  children: PropTypes.node,

  /** @prop Optional css class name | '' */
  className: PropTypes.string,

  /** @prop Determine the ListItemSection's position | 'center' */
  position: PropTypes.oneOf(['left', 'center', 'right', 'center-align'])
};
ListItemSection.defaultProps = {
  children: null,
  className: '',
  position: 'center'
};
ListItemSection.displayName = 'ListItemSection';
export default ListItemSection;