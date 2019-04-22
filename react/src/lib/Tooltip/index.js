/** @component tooltip */

import React from 'react';
import PropTypes from 'prop-types';
import { Popover } from '@collab-ui/react';

class Tooltip extends React.Component {

  render () {
    const {
      children,
      className,
      popoverProps,
      tooltip,
      tooltipTrigger,
      width,
      ...otherProps
    } = this.props;

    const content = (
      <span
        className='md-tooltip__text'
        {
          ...width
           && { style: { width: `${width}px` }}
        }
      >
        {tooltip}
      </span>
    );

    const clonedChildren = () => (
      React.cloneElement(children, {
        ...otherProps
      })
    );

    return (
      <Popover
        className={
          'md-tooltip' +
          `${(className && ` ${className}`) || ''}`
        }
        content={content}
        popoverTrigger={tooltipTrigger}
        showArrow
        {...popoverProps}
      >
        {clonedChildren()}
      </Popover>
    );
  }
}

Tooltip.propTypes = {
  /** @prop Children element to wrap Tooltip component around | null */
  children: PropTypes.element,
  /** @prop Optional CSS class string | '' */
  className: PropTypes.string,
   /** @prop Optional object for Popover Component props | {} */
  popoverProps: PropTypes.object,
  /** @prop Tooltip text | '' */
  tooltip: PropTypes.string,
  /** @prop Set the action which triggers the Tooltip | 'MouseEnter' */
  tooltipTrigger: PropTypes.oneOf(['MouseEnter', 'Click', 'Focus']),
  /** @prop Set the Tooltip width | null */
  width: PropTypes.number
};

Tooltip.defaultProps = {
  children: null,
  className: '',
  popoverProps: {},
  tooltip: '',
  tooltipTrigger: 'MouseEnter',
  width: null
};

Tooltip.displayName = 'Tooltip';

export default Tooltip;
