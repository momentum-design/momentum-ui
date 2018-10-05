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
  /** @prop Children nodes to render inside AccordionContent | null */
  children: PropTypes.node,
  /** @prop Optional css class string | ''  */
  className: PropTypes.string,
};

AccordionContent.defaultProps = {
  children: null,
  className: '',
};

export default AccordionContent;
