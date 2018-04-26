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
  /**
   * optional children prop type
   */
  children: PropTypes.node,
};

FormContent.displayName = 'FormContent';

export default FormContent;
