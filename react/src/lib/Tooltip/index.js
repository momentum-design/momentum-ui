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
    const { tooltip, direction, tooltipTrigger, popupDelay, popupCloseDelay, className, children, width } = this.props;
    const contentStyle = width ? { width } : {};
    const content = <span style={contentStyle} className='cui-tooltip__text'>{tooltip}</span>;
    return (
      <Popover
        content={content}
        popoverTrigger={tooltipTrigger}
        direction={direction}
        className={`cui-tooltip ${className}`}
        popupDelay={popupDelay}
        popupCloseDelay={popupCloseDelay}
        showArrow
      >
        {children}
      </Popover> );
  }
}

Tooltip.defaultProps = {
  children: null,
  className: '',
  popupDelay: null,
  popupCloseDelay: null,
  direction: 'top-center',
  tooltipTrigger: 'MouseEnter',
  tooltip: '',
  width: null
};

Tooltip.propTypes = {
  /**
   * Tooltip Message
   */
  tooltip: PropTypes.string,
  /**
   * optional popup Delay tooltip for tooltip to showup after mouseEnter.
   */
  popupDelay: PropTypes.number,
  /**
   * optional popup Delay Close tooltip for tooltip to close after mouseLeave.
   */
  popupCloseDelay: PropTypes.number,
  /**
   * Event that will trigger tooltip appearance
   */
  tooltipTrigger: PropTypes.oneOf(['MouseEnter', 'Click', 'Focus']),
  /**
   * optional placement of tooltip
   */
  direction: PropTypes.oneOf(['top-center', 'top-left', 'top-right',
    'left-center', 'left-top', 'left-bottom',
    'bottom-center', 'bottom-left', 'bottom-right',
    'right-center', 'right-top', 'right-bottom']),
  /**
   * css class names
   */
  className: PropTypes.string,
  /**
   * children of class
   */
  children: PropTypes.node,
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
            tooltip='Hey There good buddy'
            direction='top-center'
            className="widthOverride"
            >
*           <Button
*             label='Hover Top'
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
*       <div>
*         <Tooltip
*           tooltip='Hey There good buddy'
*           direction='bottom-center'
*           tooltipTrigger='Focus'
*           popupDelay={500}
*           popupCloseDelay={100}
*         >
*           <Button
*             label='Focus Bottom'
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
*       <div>
*         <Tooltip
*           tooltip='Hey There good buddy'
*           direction='right-center'
*           tooltipTrigger='Click'
*         >
*           <Button
*             label='Click to Trigger'
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
