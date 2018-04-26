/**
 * @category layout
 * @component accordion
 * @variations collab-ui-react
 */

import React from 'react';
import PropTypes from 'prop-types';

const AccordionContent = props => {
  const { children, className } = props;
  return (
    <div
      className={
        `cui-accordion__content` +
        `${(className && ` ${className}`) || ''}`
      }
    >
      {children}
    </div>
  );
};

AccordionContent.displayName = 'AccordionContent';

AccordionContent.propTypes = {
  children: PropTypes.node,
  className: PropTypes.string,
};

AccordionContent.defaultProps = {
  children: null,
  className: '',
};

export default AccordionContent;
