import React from 'react';
import PropTypes from 'prop-types';
import { EventOverlay } from '@collab-ui/react';

/**
 * @category communication
 * @component popover
 * @variations collab-ui-react
 */

class Popover extends React.Component {
  static displayName = 'Popover';

  state = {
    isOpen: false
  };

  componentWillUnmount() {
    this.hideTimerId && clearTimeout(this.hideTimerId);
    this.showTimerId && clearTimeout(this.showTimerId);
  }

  delayedHide = () => {
    if (this.showTimerId) {
      clearTimeout(this.showTimerId);
      this.showTimerId = null;
    }

    const delay = this.props.hideDelay
      ? this.props.hideDelay
      : this.props.delay;

      this.hideTimerId = setTimeout(() => {
      this.hideTimerId = null;
      this.setState({ isOpen: false});
    }, delay);
  };

  delayedShow = () => {
    if(this.hideTimerId) {
      clearTimeout(this.hideTimerId);
      this.hideTimerId = null;
    }

    const delay = this.props.showDelay
    ? this.props.showDelay
    : this.props.delay;

    this.showTimerId = setTimeout(() => {
      this.showTimerId = null;
      this.setState({ isOpen: true});
    }, delay);
  };

  handleToggle = () => {
    this.setState({
      isOpen: !this.state.isOpen
    });
  };

  handleClose = () => {
    this.setState({isOpen: false});
  };

  handleMouseEnter = e => {
    return !this.showTimerId && !this.state.isOpen && this.delayedShow(e);
  };

  handleMouseLeave = e => {
    if(this.hasFocus) {
      return false;
    }

    return !this.hideTimerId && this.state.isOpen && this.delayedHide(e);
  };

  handleBlur = e => {
    this.hasFocus = false;

    return !this.hideTimerId && this.state.isOpen && this.delayedHide(e);
  };

  handleFocus = e => {
    this.hasFocus = true;

    return !this.showTimerId && !this.state.isOpen && this.delayedShow(e);
  };

  render () {
    const { isOpen } = this.state;
    const { children, popoverTrigger, className, showArrow, direction, content, closeOnClick } = this.props;

    const getTriggers = () => {
      const triggerProps = {};
      triggerProps.ref = (ele) => this.anchorRef = ele;
      triggerProps.key = 'child-1';

      switch(popoverTrigger) {

      case 'MouseEnter':
        triggerProps.onMouseEnter = this.handleMouseEnter;
        triggerProps.onMouseLeave = this.handleMouseLeave;

        triggerProps.onFocus = this.handleFocus;
        triggerProps.onBlur = this.handleBlur;
        break;

      case 'Click':
        triggerProps.onClick = this.handleToggle;
        break;

      case 'Focus':
        triggerProps.onFocus = this.handleFocus;
        triggerProps.onBlur = this.handleBlur;
        break;
      }

      return triggerProps;
    };

    const anchorWithTriggers = children && React.cloneElement(children, getTriggers());

    return (
      <div>
        {anchorWithTriggers}
        <EventOverlay
          allowClickAway
          anchorNode={this.anchorRef}
          isOpen={isOpen}
          className={className}
          showArrow={showArrow}
          direction={direction}
          close={this.handleClose}
          closeOnClick={closeOnClick}
        >
          {content}
        </EventOverlay>
      </div>
    );
  }
}

Popover.defaultProps = {
  className: '',
  direction: 'top-center',
  popoverTrigger: 'MouseEnter',
  showArrow: true,
  showDelay: 0,
  hideDelay: 0,
  delay: 0,
  closeOnClick: false
};

Popover.propTypes = {
  /**
   * Event that will trigger popover appearance
   */
  popoverTrigger: PropTypes.oneOf(['MouseEnter', 'Click', 'Focus']),
  /**
   * optional direction of popover
   */
  direction: PropTypes.oneOf(['top-center', 'top-left', 'top-right',
    'left-center', 'left-top', 'left-bottom',
    'bottom-center', 'bottom-left', 'bottom-right',
    'right-center', 'right-top', 'right-bottom']),
  /**
   * css class names which goes over popover container
   */
  className: PropTypes.string,
  /**
   * this should be the popover trigger(this should be a stateful component)
   */
  children: PropTypes.element.isRequired,
  /**
   * the content that goes into the popover
   */
  content: PropTypes.oneOfType([PropTypes.element, PropTypes.node]).isRequired,

  showArrow: PropTypes.bool,
  /**
   * the show delay for popover on hover and focus
   */
  showDelay: PropTypes.number,
  /**
   * the hide delay for popover on hover and focus
   */
  hideDelay: PropTypes.number,
    /**
   * the delay for popover on hover and focus (hide/show)
   */
  delay: PropTypes.number,
  /**
   * property which decides to close the popover on click of it
   */
  closeOnClick: PropTypes.bool
};

export default Popover;

/**
* @name Popover Default with Delay
*
* @category communication
* @component popover
* @section default
*
* @js

 import {
  Button
} from '@collab-ui/react';

 export default function Default() {
 const content = (
      <span key="1" style={{ padding: '10px'}}>Popover bottom</span>
    );
  return(
    <div className='row'>
      <div>
        <Popover
        content={content}
        direction={'bottom-center'}
        delay={200}
        popoverTrigger={'MouseEnter'}>
          <Button
            label='Hover'
            ariaLabel='Hover'
            color='primary'
            onClick={()=>{}}
          />
        </Popover>
      </div>
      <br />
    </div>
  );
}
**/

/**
* @name Popover on Click
*
* @category communication
* @component popover
* @section onclick
*
* @js

 import {
  Button
} from '@collab-ui/react';

 export default function PopOverClick() {
 const content = (
      <span key="1" style={{ padding: '10px'}}>Popover top</span>
    );
  return(
    <div className='row'>
      <br />
      <div>
        <Popover
        content={content}
        direction={'top-center'}
        popoverTrigger={'Click'}>
          <Button
            label='Click'
            ariaLabel='Click'
            color='primary'
            onClick={()=>{}}
          />
        </Popover>
      </div>
      <br />
    </div>
  );
}
**/

/**
* @name Popover on Focus
*
* @category communication
* @component popover
* @section onfocus
*
* @js

 import {
  Button
} from '@collab-ui/react';

 export default function PopOverFocus() {
 const content = (
      <span key="1" style={{ padding: '10px'}}>Popover right</span>
    );
  return(
    <div className='row'>
    <br />
      <div>
        <Popover
        content={content}
        direction={'right-center'}
        popoverTrigger={'Focus'}>
          <Button
            label='Focus'
            ariaLabel='Focus'
            color='primary'
            onClick={()=>{}}
          />
        </Popover>
      </div>
      <br />
    </div>
  );
}
**/
