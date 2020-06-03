/** @component popover */

import React from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';
import { EventOverlay } from '@momentum-ui/react';
import omit from 'lodash/omit';

class Popover extends React.Component {
  state = {
    isOpen: this.props.startOpen || false,
    isHovering: this.props.startOpen || false,
  };

  componentDidMount() {
    this.props.startOpen && this.forceUpdate();
  }

  componentDidUpdate(prevProps, prevState) {
    // focus on the first button in the EventOverlay
    const { isOpen } = this.state;
    const { autoFocusOnFirstElt } = this.props;
    
    if (autoFocusOnFirstElt
        && isOpen 
        && !prevState.isOpen 
        && this.overlay
    ) {
      const eventOverlay = ReactDOM.findDOMNode(this.overlay);

      if (eventOverlay) {
        const firstTabbableElement = eventOverlay.querySelector('[tabindex="0"]');
        if (firstTabbableElement) firstTabbableElement.focus();
      }
    }
  }

  componentWillUnmount() {
    this.hideTimerId && clearTimeout(this.hideTimerId);
    this.showTimerId && clearTimeout(this.showTimerId);
  }

  delayedHide = e => {
    const { delay, hideDelay, onClose } = this.props;
    const { isHovering } = this.state;
    if (isHovering) return;

    if (this.showTimerId) {
      clearTimeout(this.showTimerId);
      this.showTimerId = null;
    }

    const popoverHideTime = hideDelay ? hideDelay : delay;

    this.hideTimerId = setTimeout(() => {
      this.hideTimerId = null;
      this.setState(() => ({ isOpen: false, isHovering: false }), onClose && onClose(e));
    }, popoverHideTime);

    e && e.stopPropagation();
  };

  delayedShow = e => {
    const { delay, showDelay } = this.props;

    if (this.hideTimerId) {
      clearTimeout(this.hideTimerId);
      this.hideTimerId = null;
    }

    const popoverShowTime = showDelay ? showDelay : delay;

    this.showTimerId = setTimeout(() => {
      this.showTimerId = null;
      this.setState(() => ({ isOpen: true, isHovering: true }));
    }, popoverShowTime);

    e && e.stopPropagation();
  };

  handleClose = e => {
    const { onClose } = this.props;

    this.setState({ isOpen: false }, onClose && onClose(e));
  };

  handleHide = e => {
    this.setState({ isHovering: false }, () => this.delayedHide(e));
  }

  handleMouseEnter = e => {
    const { children } = this.props;

    children.props.onMouseEnter && children.props.onMouseEnter(e);
    return !this.showTimerId && !this.state.isOpen && this.delayedShow(e);
  };

  delayCheckHover = e => {
    const { hoverDelay, popoverTrigger } = this.props;
    const delay = popoverTrigger === 'MouseEnter' ? hoverDelay : 0;
    e.persist();

    this.setState({ isHovering: false }, () => setTimeout(() => this.delayedHide(e), delay));
  };

  handleMouseLeave = e => {
    const { children } = this.props;
    if (this.hasFocus) {
      return false;
    }

    if (this.showTimerId) {
      clearTimeout(this.showTimerId);
      this.showTimerId = null;
    }

    children.props.onMouseLeave && children.props.onMouseLeave(e);
    return !this.hideTimerId && this.state.isOpen && this.delayCheckHover(e);
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

    if (!this.showTimerId) {
      return !isOpen ? this.delayedShow(e) : doesAnchorToggle && this.handleBlur(e);
    }
  };

  handleFocus = e => {
    const { children } = this.props;
    const { isOpen } = this.state;

    this.hasFocus = true;

    children.props.onFocus && children.props.onFocus(e);

    if (!this.showTimerId) {
      return !isOpen ? this.delayedShow(e) : this.handleBlur(e);
    }
  };

  // Handle keydown for the trigger element
  handleKeyDownTrigger = e => {
    switch (e.which) {
      case 13: // ENTER
        e.preventDefault();
        e.stopPropagation();
        e.persist();
        
        // Open Popover
        this.setState(
          { isHovering: true },
          () => this.delayedShow(e)
        );
        break;
      case 27: // ESC
        e.persist();
        e.stopPropagation();

        // Close Popover
        this.handleHide(e);

        // Focus on trigger
        if (e.target) {
          e.target.focus();
        }
        break;
    }
  }

  handleKeyDownEventOverlay = e => {
    if (this.state.isOpen && this.overlay && this.anchorRef) {
      const eventOverlay = ReactDOM.findDOMNode(this.overlay);
      const trigger = ReactDOM.findDOMNode(this.anchorRef);
      const tabbableElements = eventOverlay.querySelectorAll('[tabindex="0"]');

      switch (e.which) {
        case 9:
          if (tabbableElements.length) {
            if (this.props.closeOnFocusLeavesContent) { // if closeOnFocusLeavesContent = true
              if (e.shiftKey) { // SHIFT + TAB
                // If first interactable element in EventOverlay, hide the popover
                if (document.activeElement === tabbableElements[0]) {
                  this.handleHide(e);
                }
              } else { // TAB
                // If last interactable element in EventOverlay, hide the popover
                if (document.activeElement === tabbableElements[tabbableElements.length - 1]) {
                  e.preventDefault();
                  e.stopPropagation();
                  this.handleHide(e);
                  trigger.focus();
                }
              }
            } else {  // if closeOnFocusLeavesContent = false
              // Intent is for TAB and SHIFT+TAB to trap the user inside the dialog (AKA popover)
              if (e.shiftKey) { // SHIFT + TAB
                // If first interactable element in EventOverlay, go to the last interatable element
                if (document.activeElement === tabbableElements[0]) {
                  e.preventDefault();
                  e.stopPropagation();
                  tabbableElements[tabbableElements.length - 1].focus();
                }
              } else { // TAB
                // If last interactable element in EventOverlay, go to the first interatable element
                if (document.activeElement === tabbableElements[tabbableElements.length - 1]) {
                  e.preventDefault();
                  e.stopPropagation();
                  tabbableElements[0].focus();
                }
              }
            }
          }
          break;
        case 27: // ESC
          e.stopPropagation();
          this.handleHide(e);
          trigger.focus();
          break;
      }
    }
  }

  render() {
    const { isOpen } = this.state;
    const {
      children,
      className,
      content,
      includeFocusOnHover,
      overflowType,
      popoverTrigger,
      showArrow,
      ...props
    } = this.props;

    const otherProps = omit({ ...props }, [
      'autoFocusOnFirstElt',
      'closeOnFocusLeavesContent',
      'delay',
      'doesAnchorToggle',
      'hideDelay',
      'hoverDelay',
      'onClose',
      'showDelay',
      'startOpen',
    ]);

    const getTriggers = () => {
      const triggerProps = {};
      triggerProps.ref = ele => (this.anchorRef = ele);
      triggerProps.key = 'child-1';

      switch (popoverTrigger) {
        case 'MouseEnter':
          triggerProps.onMouseEnter = this.handleMouseEnter;
          triggerProps.onMouseLeave = this.handleMouseLeave;

          triggerProps.onFocus = includeFocusOnHover ? this.handleFocus : undefined;
          triggerProps.onBlur = includeFocusOnHover ? this.handleBlur : undefined;
          triggerProps.onKeyDown = includeFocusOnHover ? undefined : this.handleKeyDownTrigger;
          break;

        case 'Click':
          triggerProps.onClick = this.handleClick;

          triggerProps.onBlur = null;
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

        case 'None':
          triggerProps.onClick = null;
          triggerProps.onFocus = null;
          triggerProps.onBlur = null;
          triggerProps.onMouseEnter = null;
          triggerProps.onMouseLeave = null;

          break;
      }

      return triggerProps;
    };

    const anchorWithTriggers = () => children && React.cloneElement(children, getTriggers());


    return (
      <React.Fragment>
        {anchorWithTriggers()}
        {isOpen && (
          <EventOverlay
            anchorNode={this.anchorRef}
            className={className}
            close={this.handleClose}
            isOpen={isOpen}
            ref={ref => (this.overlay = ref)}
            showArrow={showArrow}
            style={{ overflow: overflowType }}
            {...(popoverTrigger === 'MouseEnter' && {
              onMouseEnter: () => {
                this.setState({ isHovering: true, isOpen: true });
              },
              onMouseLeave: e => {
                e.persist();
                this.handleHide(e);
              },
              onKeyDown: !includeFocusOnHover ? this.handleKeyDownEventOverlay : undefined})}
            {...(popoverTrigger === 'Focus' && { allowClickAway: false })}
            {...otherProps}
          >
            {content}
          </EventOverlay>
        )}
      </React.Fragment>
    );
  }
}

Popover.propTypes = {
  /** @prop Focus on the first interactable (tabindex="0") element in the popover | false */
  autoFocusOnFirstElt: PropTypes.bool,
  /** @prop Children node that should be the popover trigger(this should be a stateful component) */
  children: PropTypes.element.isRequired,
  /** @prop Optional CSS class names which goes over popover container | '' */
  className: PropTypes.string,
  /** @prop  Applies to TAB and SHIFT+TAB, when either makes the focus leave the EventOverlay | false */
  closeOnFocusLeavesContent: PropTypes.bool,
  /** @prop The content that goes into the popover */
  content: PropTypes.oneOfType([PropTypes.element, PropTypes.node]).isRequired,
  /** @prop The delay for popover on hover, click, focus (hide/show) | 0 */
  delay: PropTypes.number,
  /** @prop Boolean for whether the Anchor Toggles the Popover | true */
  doesAnchorToggle: PropTypes.bool,
  /** @prop The hide delay for popover on hover, click, focus | 0 */
  hideDelay: PropTypes.number,
  /** @prop The hover delay for checking whether we are still hovering before closing | 500 */
  hoverDelay: PropTypes.number,
  /** @prop Optional prop that determines whether Focus triggers apply to MouseEnter | true */
  includeFocusOnHover: PropTypes.bool,
  /** @prop Callback function that will execute on close | null */
  onClose: PropTypes.func,
  /** @prop Optional prop that controls overflow css style of EventOverlay | 'auto' */
  overflowType: PropTypes.string,
  /** @prop Event that will trigger popover appearance | 'MouseEnter' */
  popoverTrigger: PropTypes.oneOf(['MouseEnter', 'Click', 'Focus', 'None']),
  /** @prop Boolean for whether the Arrow should show | true */
  showArrow: PropTypes.bool,
  /** @prop The show delay for popover on hover, click, focus | 0 */
  showDelay: PropTypes.number,
  /** @prop Should Popover start open | false */
  startOpen: PropTypes.bool,
};

Popover.defaultProps = {
  autoFocusOnFirstElt: false,
  className: '',
  closeOnFocusLeavesContent: false,
  delay: 0,
  doesAnchorToggle: true,
  hideDelay: 0,
  hoverDelay: 500,
  includeFocusOnHover: true,
  onClose: null,
  overflowType: 'auto',
  popoverTrigger: 'MouseEnter',
  showArrow: true,
  showDelay: 0,
  startOpen: false,
};

Popover.displayName = 'Popover';

export default Popover;
