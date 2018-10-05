import React from 'react';
import PropTypes from 'prop-types';

/**
 * FormContent helps organize the content within a form section and provides a S wrapper;
 **/

const FormContent = props => {
  const { children } = props;

  return <div className="section__content">{children}</div>;
};

FormContent.propTypes = {
  /** @prop Children node to render inside FormContent | null */
  children: PropTypes.node,
};

FormContent.deafultProps = {
  children: null,
};

FormContent.displayName = 'FormContent';

export default FormContent;
