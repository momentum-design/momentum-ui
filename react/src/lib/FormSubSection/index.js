/** @component form */

import React from 'react';
import PropTypes from 'prop-types';

const FormSubSection = props => {
  const { label, children, description } = props;

  return (
    <div className="sub-section">
      {label && <h5 className="sub-section__label">{label}</h5>}
      {description && <p className="sub-section__description">{description}</p>}
      {children}
    </div>
  );
};

FormSubSection.propTypes = {
  /** @prop Children node to render inside FormSubSection | null */
  children: PropTypes.node,
  /** @prop Optional FormSubSection description text | '' */
  description: PropTypes.string,
  /** @prop Optional FormSubSection label text | '' */
  label: PropTypes.string,
};

FormSubSection.defaultProps = {
  children: null,
  description: '',
  label: ''
};

FormSubSection.displayName = 'FormSubSection';

export default FormSubSection;
