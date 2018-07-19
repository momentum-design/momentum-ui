import React from 'react';
import PropTypes from 'prop-types';
import { Popover } from '@collab-ui/react';

/**
 * @category communication
 * @component tooltip
 * @variations collab-ui-react
 */

class Tooltip extends React.Component {
  static displayName = 'Tooltip';

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
      </Popover> );
  }
}

Tooltip.defaultProps = {
  children: null,
  className: '',
  tooltip: '',
  tooltipTrigger: 'MouseEnter',
  width: null
};

Tooltip.propTypes = {
  /**
   * children of class
   */
  children: PropTypes.node,
  /**
   * css class names
   */
  className: PropTypes.string,
  /**
   * Tooltip Message
   */
  tooltip: PropTypes.string,
  /**
   * Event that will trigger tooltip appearance
   */
  tooltipTrigger: PropTypes.oneOf(['MouseEnter', 'Click', 'Focus']),
  /**
   * width of tooltip content
   */
  width: PropTypes.number
};

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
*       <div>
*         <Tooltip
*           tooltip='Hey There good buddy'
*          >
*           <Button
*             children='Hover Top'
*             ariaLabel='Hover Top'
*             color='primary'
*             onClick={() => { }}
*           />
*         </Tooltip>
*       </div>
*       <br />
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
*       <p><span className="h3">tooltipTrigger=('Focus'), showDelay=(500), hideDelay=(100)</span></p>
*       <div>
*         <Tooltip
*           tooltip='Hey There good buddy'
*           direction='bottom-center'
*           tooltipTrigger='Focus'
*           showDelay={500}
*           hideDelay={100}
*         >
*           <Button
*             children='Focus Bottom'
*             ariaLabel='Focus Bottom'
*             color='primary'
*             onClick={() => { }}
*           />
*         </Tooltip>
*       </div>
*       <br />
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
*       <p><span className="h3">tooltipTrigger=('Click'), width=(500)</span></p>
*       <div>
*         <Tooltip
*           tooltip='Hey There good buddy'
*           tooltipTrigger='Click'
*           width={500}
*         >
*           <Button
*             children='Click to Trigger'
*             ariaLabel='Click to Trigger'
*             color='primary'
*             onClick={() => { }}
*           />
*         </Tooltip>
*       </div>
*       <br />
*     </div>
*   );
* }
*
**/
