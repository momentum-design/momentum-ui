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
    const { children, doesAnchorToggle } = this.props;
    const { isOpen } = this.state;

    this.hasFocus = true;

    children.props.onClick && children.props.onClick(e);

    if(!this.showTimerId) {
      return !isOpen
        ? this.delayedShow(e)
        : doesAnchorToggle && this.handleBlur(e);
    }
  }

  handleFocus = e => {
    const { children } = this.props;
    const { isOpen } = this.state;

    this.hasFocus = true;
    
    children.props.onFocus && children.props.onFocus(e);
    
    if(!this.showTimerId) {
      return !isOpen
        ? this.delayedShow(e)
        : this.handleBlur(e);
    }
  };

  render() {
    const { isOpen } = this.state;
    const {
      children,
      popoverTrigger,
      className,
      content,
      showArrow,
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
          triggerProps.onBlur = this.handleBlur;
          
          triggerProps.onFocus = null;
          triggerProps.onMouseEnter = null;
          triggerProps.onMouseLeave = null;

          break;

        case 'Focus':
          triggerProps.onFocus = this.handleFocus;
          triggerProps.onBlur = this.handleBlur;
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
          anchorNode={this.anchorRef}
          className={className}
          close={this.handleClose}
          isOpen={isOpen}
          ref={ref => this.overlay = ref}
          showArrow={showArrow}
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
  delay: 0,
  doesAnchorToggle: true,
  hideDelay: 0,
  popoverTrigger: 'MouseEnter',
  showArrow: true,
  showDelay: 0,
};

Popover.propTypes = {
  /**
   * this should be the popover trigger(this should be a stateful component)
   */
  children: PropTypes.element.isRequired,
  /**
   * css class names which goes over popover container
   */
  className: PropTypes.string,
  /**
   * the content that goes into the popover
   */
  content: PropTypes.oneOfType([PropTypes.element, PropTypes.node]).isRequired,
  /**
   * the delay for popover on hover, click, focus (hide/show)
   */
  delay: PropTypes.number,
  /**
   * Boolean for whether the Anchor Toggles the Popover
   */
  doesAnchorToggle: PropTypes.bool,
  /**
   * the hide delay for popover on hover, click, focus
   */
  hideDelay: PropTypes.number,
  /**
   * Event that will trigger popover appearance
   */
  popoverTrigger: PropTypes.oneOf(['MouseEnter', 'Click', 'Focus']),
   /**
   * Boolean for whether the Arrow should show
   */
  showArrow: PropTypes.bool,
  /**
   * the show delay for popover on hover, click, focus
   */
  showDelay: PropTypes.number,
};

export default Popover;

/**
* @name Popover Default
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
    <span key="1" style={{ padding: '10px'}}>Popover Top</span>
  );

  return (
    <div className='row'>
      <div className="docs-example docs-example--spacing">

        <h3>
          Props
          <p><code className="small">direction=(top-center)</code></p>
          <p><code className="small">{'targetOffset=({vertical: 10})'}</code></p>
        </h3>
        <Popover content={content} direction={'top-center'} targetOffset={{vertical: 10}}>
          <Button children='Hover' ariaLabel='Hover' />
        </Popover>

      </div>
      <div className="docs-example docs-example--spacing">

        <h3>
          Props
          <p><code className="small">delay=(500)</code></p>
          <p><code className="small">direction=(top-center)</code></p>
        </h3>
        <Popover content={content} delay={500} direction={'top-center'}>
          <Button children='Hover with Delay' ariaLabel='Hover with Delay' />
        </Popover>

      </div>
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
      <span key="1" style={{ padding: '10px'}}>Popover Bottom</span>
    );

    return (
      <div className='row'>
        <div className="docs-example docs-example--spacing">

          <h3>
            Props
            <p><code className="small">direction=(bottom-center)</code></p>
            <p><code className="small">popoverTrigger=(Click)</code></p>
          </h3>
          <Popover
            content={content}
            direction={'bottom-center'}
            popoverTrigger={'Click'}
          >
            <Button
              children='Click'
              ariaLabel='Click'
            />
          </Popover>

        </div>
        <div className="docs-example docs-example--spacing">

          <h3>
            Props
            <p><code className="small">direction=(bottom-center)</code></p>
            <p><code className="small">popoverTrigger=(Click)</code></p>
            <p><code className="small">doesAnchorToggle(false)</code></p>
          </h3>
          <Popover
            content={content}
            direction={'bottom-center'}
            doesAnchorToggle={false}
            popoverTrigger={'Click'}
          >
            <Button
              children='Click No Toggle'
              ariaLabel='Click'
            />
          </Popover>

        </div>
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
    <span key="1" style={{ padding: '10px'}}>Popover Left</span>
  );

  const contentRight = (
    <span key="1" style={{ padding: '10px'}}>Popover Right</span>
  );

  return (
    <div className='row'>
      <div className="docs-example docs-example--spacing">

        <h3>
          Props
          <p><code className="small">direction=(right-center)</code></p>
          <p><code className="small">popoverTrigger=(Focus)</code></p>
        </h3>
        <Popover
          content={contentRight}
          direction={'right-center'}
          popoverTrigger={'Focus'}
        >
          <Button
            children='Focus Right'
            ariaLabel='Focus Right'
          />
        </Popover>

      </div>
      <div className="docs-example docs-example--spacing">

        <h3>
          Props
          <p><code className="small">direction=(left-center)</code></p>
          <p><code className="small">popoverTrigger=(Focus)</code></p>
        </h3>
        <Popover
          content={contentLeft}
          direction={'left-center'}
          popoverTrigger={'Focus'}
        >
          <Button
            children='Focus Left'
            ariaLabel='Focus Left'
          />
        </Popover>

      </div>
    </div>
  );
}
**/
