/** @component form */
import React from 'react';
import PropTypes from 'prop-types';
/**
 * FormContent helps organize the content within a form section and provides a S wrapper;
 **/

var FormContent = function FormContent(props) {
  var children = props.children;
  return React.createElement("div", {
    className: "section__content"
  }, children);
};

FormContent.propTypes = {
  /** @prop Children node to render inside FormContent | null */
  children: PropTypes.node
};
FormContent.deafultProps = {
  children: null
};
FormContent.displayName = 'FormContent';
export default FormContent;