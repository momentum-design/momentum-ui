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

  delayedHide = e => {
    if (this.showTimerId) {
      clearTimeout(this.showTimerId);
      this.showTimerId = null;
    }

    const delay = this.props.hideDelay
      ? this.props.hideDelay
      : this.props.delay;

    this.hideTimerId = setTimeout(() => {
      this.hideTimerId = null;
      this.setState({ isOpen: false });
    }, delay);

    e.stopPropagation();
  };

  delayedShow = e => {
    if (this.hideTimerId) {
      clearTimeout(this.hideTimerId);
      this.hideTimerId = null;
    }

    const delay = this.props.showDelay
      ? this.props.showDelay
      : this.props.delay;

    this.showTimerId = setTimeout(() => {
      this.showTimerId = null;
      this.setState({ isOpen: true });
    }, delay);

    e.stopPropagation();
  };

  handleClose = () => {
    this.setState({ isOpen: false });
  };

  handleMouseEnter = e => {
    const { children } = this.props;

    children.props.onMouseEnter && children.props.onMouseEnter(e);
    return !this.showTimerId && !this.state.isOpen && this.delayedShow(e);
  };

  handleMouseLeave = e => {
    const { children } = this.props;
    if (this.hasFocus) {
      return false;
    }

    children.props.onMouseLeave && children.props.onMouseLeave(e);
    return !this.hideTimerId && this.state.isOpen && this.delayedHide(e);
  };

  handleBlur = e => {
    const { children } = this.props;
    this.hasFocus = false;

    children.props.onBlur && children.props.onBlur(e);
    this.handleMouseLeave(e);
  };

  handleClick = e => {
    const { children } = this.props;

    children.props.onClick && children.props.onClick(e);
    this.handleFocus(e);
  }

  handleFocus = e => {
    const { children } = this.props;
    this.hasFocus = true;

    children.props.onFocus && children.props.onFocus(e);
    return !this.showTimerId && !this.state.isOpen && this.delayedShow(e);
  };

  render() {
    const { isOpen } = this.state;
    const {
      children,
      popoverTrigger,
      className,
      showArrow,
      direction,
      content,
      closeOnClick,
      ...props
    } = this.props;

    const getTriggers = () => {
      const triggerProps = {};
      triggerProps.ref = ele => (this.anchorRef = ele);
      triggerProps.key = 'child-1';

      switch (popoverTrigger) {
        case 'MouseEnter':
          triggerProps.onMouseEnter = this.handleMouseEnter;
          triggerProps.onMouseLeave = this.handleMouseLeave;

          triggerProps.onFocus = this.handleFocus;
          triggerProps.onBlur = this.handleBlur;
          break;

        case 'Click':
          triggerProps.onClick = this.handleClick;
          triggerProps.onFocus = this.handleFocus;
          triggerProps.onBlur = null;
          triggerProps.onMouseEnter = null;
          triggerProps.onMouseLeave = null;

          break;

        case 'Focus':
          triggerProps.onFocus = this.handleFocus;
          triggerProps.onBlur = null;
          triggerProps.onMouseEnter = null;
          triggerProps.onMouseLeave = null;

          break;
      }

      return triggerProps;
    };

    const anchorWithTriggers =
      children && React.cloneElement(children, getTriggers());

    return (
      <div>
        {anchorWithTriggers}
        <EventOverlay
          ref={ref => this.overlay = ref}
          anchorNode={this.anchorRef}
          isOpen={isOpen}
          className={className}
          showArrow={showArrow}
          direction={direction}
          close={this.handleClose}
          closeOnClick={closeOnClick}
          {...props}
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
  closeOnClick: false,
};

Popover.propTypes = {
  /**
   * Event that will trigger popover appearance
   */
  popoverTrigger: PropTypes.oneOf(['MouseEnter', 'Click', 'Focus']),
  /**
   * optional direction of popover
   */
  direction: PropTypes.oneOf([
    'top-center',
    'top-left',
    'top-right',
    'left-center',
    'left-top',
    'left-bottom',
    'bottom-center',
    'bottom-left',
    'bottom-right',
    'right-center',
    'right-top',
    'right-bottom'
  ]),
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
  closeOnClick: PropTypes.bool,
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
          popoverTrigger={'MouseEnter'}
          targetOffset={{vertical: 10}}
          isDynamic
        >
          <Button
            children='Hover'
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
          popoverTrigger={'Click'}
          targetOffset={{vertical: 10}}
        >
          <Button
            children='Click'
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
  const contentLeft = (
    <span key="1" style={{ padding: '10px'}}>Popover left</span>
  );
  const contentRight = (
    <span key="1" style={{ padding: '10px'}}>Popover right</span>
  );
  return(
    <div className='row'>
      <br />
      <div>
        <Popover
          content={contentRight}
          direction={'right-center'}
          popoverTrigger={'Focus'}
          targetOffset={{horizontal: 10}}
        >
          <Button
            children='Focus Right'
            ariaLabel='Focus Right'
            color='primary'
            onClick={()=>{}}
          />
        </Popover>
      </div>
      <br />
      <div>
        <Popover
          content={contentLeft}
          direction={'left-center'}
          popoverTrigger={'Focus'}
          targetOffset={{horizontal: 10}}
        >
          <Button
            children='Focus Left'
            ariaLabel='Focus Left'
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
