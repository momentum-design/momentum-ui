import React from 'react';
import PropTypes from 'prop-types';
import { EventOverlay, Button } from '@collab-ui/react';

/**
 * @category communication
 * @component coachmark
 * @variations collab-ui-react
 */

class Coachmark extends React.Component {
  static displayName = 'Coachmark';

  state = {
    isOpen: false
  };

  componentDidMount() {
    this.props.isOpen &&
    this.delayedShow();
  }

  componentDidUpdate(prevProps) {
    !prevProps.isOpen
    && this.props.isOpen
    && this.delayedShow();
  }

  componentWillUnmount() {
    this.hideTimerId && clearTimeout(this.hideTimerId);
    this.showTimerId && clearTimeout(this.showTimerId);
  }

  delayedHide = e => {
    const { onClick } = this.props;

    if (this.showTimerId) {
      clearTimeout(this.showTimerId);
      this.showTimerId = null;
    }

    const delay = this.props.hideDelay
      ? this.props.hideDelay
      : this.props.delay;

    this.hideTimerId = setTimeout(() => {
      this.hideTimerId = null;
      this.setState(() => {
        onClick && onClick(e)
        return { isOpen: false }
      });
    }, delay);

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

  };

  handleClose = () => {
    this.setState({ isOpen: false });
  };

  render() {
    const {
      contentNode,
      header,
      subheader,
      popoverTrigger,
      className,
      children,
      showArrow,
      onClick,
      direction,
      buttonLabel,
      closeOnClick,
      isOpen,
      showDelay,
      hideDelay,
      delay,
      maxWidth,
      ...props
    } = this.props;

    const anchorWithRef =
      children && React.cloneElement(children, {
        ref: ele => this.anchorRef = ele
      });

    const content = (
      <div className='cui-coachmark__container'>
        {
          contentNode
            ? contentNode
            : [
                header && <div className='cui-coachmark__header' key='content-0'>{header}</div>,
                subheader && <div className='cui-coachmark__subheader' key='content-1'>{subheader}</div>,
                onClick && <Button onClick={this.delayedHide} {...props} key='content-2'>{buttonLabel}</Button>
              ]
            }
      </div>
    );

    return (
      <div className='cui-coachmark'>
        {anchorWithRef}
        <EventOverlay
          ref={ref => this.overlay = ref}
          allowClickAway
          anchorNode={this.anchorRef}
          isOpen={this.state.isOpen}
          className={className}
          showArrow={showArrow}
          direction={direction}
          close={this.handleClose}
          closeOnClick={closeOnClick}
          {...maxWidth && {maxWidth: maxWidth}}
        >
          {content}
        </EventOverlay>
      </div>
    );
  }
}

Coachmark.defaultProps = {
  contentNode: null,
  maxWidth: null,
  onClick: null,
  isOpen: false,
  header: '',
  subheader: '',
  className: '',
  children: null,
  direction: 'top-center',
  popoverTrigger: 'MouseEnter',
  showArrow: true,
  showDelay: 0,
  hideDelay: 0,
  delay: 0,
  closeOnClick: false,
  buttonLabel: null
};

Coachmark.propTypes = {
  contentNode: PropTypes.node,
  header: PropTypes.node,
  subheader: PropTypes.node,
  isOpen: PropTypes.bool,
  maxWidth: PropTypes.number,
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
  children: PropTypes.node.isRequired,
  showArrow: PropTypes.bool,
  onClick: PropTypes.func,
  buttonLabel: PropTypes.node,
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

export default Coachmark;

/**
* @name Coachmark Default with Delay
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
      <span key="1" style={{ padding: '10px'}}>Coachmark bottom</span>
    );
  return(
    <div className='row'>
      <div>
        <Coachmark
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
        </Coachmark>
      </div>
      <br />
    </div>
  );
}
**/
