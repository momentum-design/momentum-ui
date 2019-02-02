/** @component accordion */

import React from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';

const AccordionContent = props => {
  const { children, className } = props;
  return (
    <div className={clsx('cui-accordion__content', className)}>
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
