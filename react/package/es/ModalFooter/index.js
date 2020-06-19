/** @component modal */
import React from 'react';
import PropTypes from 'prop-types';

var ModalFooter = function ModalFooter(props) {
  var className = props.className,
      children = props.children;
  return /*#__PURE__*/React.createElement("div", {
    className: 'md-modal__footer' + ("" + (className && " " + className || ''))
  }, children);
};

ModalFooter.propTypes = {
  /** @prop Children nodes to render inside of ModalFooter | null */
  children: PropTypes.node,

  /** @prop Optional css class names | '' */
  className: PropTypes.string
};
ModalFooter.defaultProps = {
  children: null,
  className: ''
};
ModalFooter.displayName = 'ModalFooter';
export default ModalFooter;