/** @component form */
import React from 'react';
import PropTypes from 'prop-types';

var FormSubSection = function FormSubSection(props) {
  var label = props.label,
      children = props.children,
      description = props.description;
  return React.createElement("div", {
    className: "sub-section"
  }, label && React.createElement("h5", {
    className: "sub-section__label"
  }, label), description && React.createElement("p", {
    className: "sub-section__description"
  }, description), children);
};

FormSubSection.propTypes = {
  /** @prop Children node to render inside FormSubSection | null */
  children: PropTypes.node,

  /** @prop Optional FormSubSection description text | '' */
  description: PropTypes.string,

  /** @prop Optional FormSubSection label text | '' */
  label: PropTypes.string
};
FormSubSection.defaultProps = {
  children: null,
  description: '',
  label: ''
};
FormSubSection.displayName = 'FormSubSection';
export default FormSubSection;