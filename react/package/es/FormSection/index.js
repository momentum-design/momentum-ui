/** @component form */
import React from 'react';
import PropTypes from 'prop-types';
import { FormInfo, FormContent } from "./..";

var FormSection = function FormSection(props) {
  var title = props.title,
      description = props.description,
      children = props.children;
  return React.createElement("div", {
    className: "md-form__section"
  }, React.createElement(FormInfo, {
    title: title,
    description: description
  }), React.createElement(FormContent, null, children));
};

FormSection.propTypes = {
  /** @prop Children node to render inside FormSection | null */
  children: PropTypes.node,

  /** @prop Optional FormSection description | '' */
  description: PropTypes.string,

  /** @prop Optional FormSection title | null */
  title: PropTypes.string.isRequired
};
FormSection.defaultProps = {
  children: null,
  description: '',
  title: null
};
FormSection.displayName = 'FormSection';
export default FormSection;