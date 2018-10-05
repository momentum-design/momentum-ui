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
  /** @prop Optional FormInfo description text | '' */
  description: PropTypes.string,
  /** @prop Optional FormInfo title | '' */
  title: PropTypes.string
};

FormInfo.defaultProps = {
  description: '',
  title: ''
};

FormInfo.displayName = 'FormInfo';

export default FormInfo;
