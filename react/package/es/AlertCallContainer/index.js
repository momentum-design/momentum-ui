function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }

/** @component alert-call */
import React from 'react';
import PropTypes from 'prop-types';

var AlertCallContainer = function AlertCallContainer(props) {
  var children = props.children,
      otherProps = _objectWithoutPropertiesLoose(props, ["children"]);

  return /*#__PURE__*/React.createElement("div", _extends({
    className: "md-alert__container md-alert__container--call"
  }, otherProps), children);
};

AlertCallContainer.defaultProps = {
  children: null
};
AlertCallContainer.propTypes = {
  /** @prop Children Nodes to Render inside container | null */
  children: PropTypes.node
};
AlertCallContainer.displayName = 'AlertCallContainer';
export default AlertCallContainer;