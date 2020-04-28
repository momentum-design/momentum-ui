function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }

/** @component modal */
import React from 'react';
import PropTypes from 'prop-types';

var ModalBody = function ModalBody(props) {
  var className = props.className,
      other = _objectWithoutPropertiesLoose(props, ["className"]);

  return React.createElement("div", _extends({
    className: "md-modal__body" + ("" + (className && " " + className || ''))
  }, other), props.children);
};

ModalBody.propTypes = {
  /** @prop Children nodes to render inside the ModalBody | null */
  children: PropTypes.node,

  /** @prop Optional css class names | '' */
  className: PropTypes.string
};
ModalBody.defaultProps = {
  children: null,
  className: ''
};
ModalBody.displayName = 'ModalBody';
export default ModalBody;