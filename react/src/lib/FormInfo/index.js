import React from 'react';
import PropTypes from 'prop-types';

/**
 * FormInfo is supplemental, organizational component used to help divide form
 **/

const FormInfo = props => {
  const { title, description } = props;

  return (
    <div className="section__info">
      <h4 className="section__title">{title}</h4>
      {description && <p className="section__description">{description}</p>}
    </div>
  );
};

FormInfo.propTypes = {
  /**
   * optional title prop type
   */
  title: PropTypes.string,
  /**
   * optional description prop type
   */
  description: PropTypes.string,
};

FormInfo.defaultProps = {
  title: '',
  description: '',
};

FormInfo.displayName = 'FormInfo';

export default FormInfo;
