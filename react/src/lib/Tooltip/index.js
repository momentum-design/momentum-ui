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

    return (
      <Popover
        className={
          'cui-tooltip' +
          `${(className && ` ${className}`) || ''}`
        }
        content={content}
        popoverTrigger={tooltipTrigger}
        showArrow
        {...otherProps}
      >
        {children}
      </Popover>
    );
  }
}

Tooltip.propTypes = {
  /** @prop Children nodes to render inside Tooltip component | null */
  children: PropTypes.node,
  /** @prop Optional CSS class string | '' */
  className: PropTypes.string,
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
  tooltip: '',
  tooltipTrigger: 'MouseEnter',
  width: null
};

Tooltip.displayName = 'Tooltip';

export default Tooltip;

/**
* @name Tooltip Default
*
* @category communication
* @component tooltip
* @section default
*
* @js
*
* import {
*   Button
* } from '@collab-ui/react';
*
* export default function TooltipDefault() {
*   return (
*     <div className='row'>
        <div className="docs-example docs-example--spacing">

          <h3>
            Props
            <p><code className="small">direction=(top-center)</code></p>
          </h3>
          <Tooltip
            tooltip='Hey There good buddy'
            direction='top-center'
          >
            <Button
              children='Hover Top'
              ariaLabel='Hover Top'
            />
          </Tooltip>
        </div>
*     </div>
*   );
* }
*
**/

/**
* @name Tooltip Bottom
*
* @category communication
* @component tooltip
* @section positional
*
* @js
*
* import {
*   Button
* } from '@collab-ui/react';
*
* export default function TooltipDefault() {
*   return (
*     <div className='row'>
        <div className="docs-example docs-example--spacing">

          <h3>
            Props
            <p><code className="small">direction=(bottom-center)</code></p>
            <p><code className="small">tooltipTrigger=(Focus)</code></p>
          </h3>
          <Tooltip
            tooltip='Hey There good buddy'
            direction='bottom-center'
            tooltipTrigger='Focus'
          >
            <Button
              children='Focus Bottom'
              ariaLabel='Focus Bottom'
            />
          </Tooltip>

        </div>
*     </div>
*   );
* }
*
**/

/**
* @name Tooltip Click
*
* @category communication
* @component tooltip
* @section trigger
*
* @js
*
* import {
*   Button
* } from '@collab-ui/react';
*
* export default function TooltipDefault() {
*   return (
*     <div className='row'>
        <div className="docs-example docs-example--spacing">

          <h3>
            Props
            <p><code className="small">width=(500)</code></p>
            <p><code className="small">tooltipTrigger=(Click)</code></p>
          </h3>
          <Tooltip
            tooltip='Hey There good buddy'
            tooltipTrigger='Click'
            width={500}
          >
            <Button
              children='Click to Trigger'
              ariaLabel='Click to Trigger'
            />
          </Tooltip>
          
        </div>
*     </div>
*   );
* }
*
**/
