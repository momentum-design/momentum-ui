import React from 'react';
import PropTypes from 'prop-types';
import { Popover } from '@collab-ui/react';

/**
 * @category communication
 * @component tooltip
 * @variations collab-ui-react
 */

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
        className='cui-tooltip__text'
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
          'cui-tooltip' +
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

/**
* @component tooltip
* @section default
* @react

import {
  Button,
  Tooltip,
} from '@collab-ui/react';

export default function TooltipDefault() {
  return (
      <div className='row'>
        <div className="docs-example docs-example--spacing">
          <Tooltip
            tooltip='Hello!'
            tooltipTrigger='Click'
          >
            <Button
              children='Click'
              ariaLabel='Click'
            />
          </Tooltip>
        </div>

        <div className="docs-example docs-example--spacing">
          <Tooltip
            tooltip='Hello!'
            tooltipTrigger='MouseEnter'
          >
            <Button
              children='MouseEnter'
              ariaLabel='MouseEnter'
            />
          </Tooltip>
        </div>

        <div className="docs-example docs-example--spacing">
          <Tooltip
            tooltip='Hello!'
            tooltipTrigger='Focus'
          >
            <Button
              children='Focus'
              ariaLabel='Focus'
            />
          </Tooltip>
        </div>
      </div>
   );
 }

**/

/**
* @component tooltip
* @section delay
* @react

 import {
   Button,
   Tooltip,
 } from '@collab-ui/react';

 export default function TooltipDelay() {
   return (
      <div className='row'>
        <div className="docs-example docs-example--spacing">
          <Tooltip
            tooltip='Delayed!'
            tooltipTrigger='Click'
            delay={500}
          >
            <Button
              children='Delay'
              ariaLabel='Delay'
            />
          </Tooltip>
        </div>
      </div>
   );
 }

**/

/**
* @component tooltip
* @section direction
* @react

 import {
   Button,
   Tooltip,
 } from '@collab-ui/react';

 export default function TooltipDirection() {
   return (
      <div className="docs-example docs-example--spacing">
        <Tooltip
          tooltip='Hello!'
          tooltipTrigger='Click'
          direction='right-center'
        >
          <Button
            children='Direction'
            ariaLabel='Direction'
          />
        </Tooltip>
      </div>
   );
 }
**/


/**
* @component tooltip
* @section content
* @react

 import {
   Button,
   Tooltip,
 } from '@collab-ui/react';

 export default function TooltipContent() {

    const content = (
     <span style={{color: 'white', padding: '16px'}}> content! </span>
    );

   return (
      <div className="docs-example docs-example--spacing">
        <Tooltip
          tooltip='Hello!'
          tooltipTrigger='Click'
          direction='right-center'
          content={content}
        >
          <Button
            children='Content'
            ariaLabel='Content'
          />
        </Tooltip>
      </div>
   );
 }
**/
