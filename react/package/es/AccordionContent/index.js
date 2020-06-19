/** @component accordion */
import React from 'react';
import PropTypes from 'prop-types';

var AccordionContent = function AccordionContent(props) {
  var children = props.children,
      className = props.className;
  return /*#__PURE__*/React.createElement("div", {
    className: "md-accordion__content" + ("" + (className && " " + className || ''))
  }, children);
};

AccordionContent.displayName = 'AccordionContent';
AccordionContent.propTypes = {
  /** @prop Children nodes to render inside AccordionContent | null */
  children: PropTypes.node,

  /** @prop Optional css class string | ''  */
  className: PropTypes.string
};
AccordionContent.defaultProps = {
  children: null,
  className: ''
};
export default AccordionContent;