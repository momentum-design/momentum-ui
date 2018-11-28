import React from 'react';
import PropTypes from 'prop-types';
import { EventOverlay } from '@collab-ui/react';
import { omit } from 'lodash';

/**
 * @category communication
 * @component popover
 * @variations collab-ui-react
 */

class Popover extends React.Component {

  state = {
    isOpen: false,
    isHovering: false
  };

  componentDidMount() {
    this.props.startOpen &&
    this.delayedShow();
  }

  componentWillUnmount() {
    this.hideTimerId && clearTimeout(this.hideTimerId);
    this.showTimerId && clearTimeout(this.showTimerId);
  }

  delayedHide = e => {
    const { delay, hideDelay, onClose } = this.props;
    const { isHovering } = this.state;
    if ( isHovering ) return;

    if (this.showTimerId) {
      clearTimeout(this.showTimerId);
      this.showTimerId = null;
    }

    const popoverHideTime = hideDelay
      ? hideDelay
      : delay;

    this.hideTimerId = setTimeout(() => {
      this.hideTimerId = null;
      this.setState(
        { isOpen: false, isHovering: false },
        onClose && onClose(e)
      );
    }, popoverHideTime);

    e && e.stopPropagation();
  };

  delayedShow = e => {
    const { delay, showDelay } = this.props;

    if (this.hideTimerId) {
      clearTimeout(this.hideTimerId);
      this.hideTimerId = null;
    }

    const popoverShowTime = showDelay
      ? showDelay
      : delay;

    this.showTimerId = setTimeout(() => {
      this.showTimerId = null;
      this.setState(
        { isOpen: true, isHovering: true }
      );
    }, popoverShowTime);

    e && e.stopPropagation();
  };

  handleClose = e => {
    const { onClose } = this.props;

    this.setState(
      { isOpen: false },
      onClose && onClose(e)
    );
  };

  handleMouseEnter = e => {
    const { children } = this.props;

    children.props.onMouseEnter && children.props.onMouseEnter(e);
    return !this.showTimerId && !this.state.isOpen && this.delayedShow(e);
  };

  delayCheckHover = e => {
    const { hoverDelay } = this.props;

    e.persist();

    this.setState(
      { isHovering: false },
      () => setTimeout(() => this.delayedHide(e), hoverDelay)
    );
  }

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
      className,
      content,
      overflowType,
      popoverTrigger,
      showArrow,
      ...props
    } = this.props;

    const otherProps = omit({...props}, [
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

          triggerProps.onFocus = this.handleFocus;
          triggerProps.onBlur = this.handleBlur;
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

    const anchorWithTriggers =
      children && React.cloneElement(children, getTriggers());

    return (
      <span>
        {anchorWithTriggers}
        <EventOverlay
          anchorNode={this.anchorRef}
          className={className}
          close={this.handleClose}
          isOpen={isOpen}
          ref={ref => this.overlay = ref}
          showArrow={showArrow}
          style={
            { overflow: overflowType }
          }
          {...popoverTrigger === 'MouseEnter' && {
            onMouseEnter: () => {
              this.setState({isHovering: true, isOpen: true});
            },
            onMouseLeave: e => {
              e.persist();
              this.setState(
                {isHovering: false}
                , () => this.delayedHide(e)
              );
            }}
          }
          {...otherProps}
        >
          {content}
        </EventOverlay>
      </span>
    );
  }
}

Popover.propTypes = {
  /** @prop Children node that should be the popover trigger(this should be a stateful component) */
  children: PropTypes.element.isRequired,
  /** @prop Optional CSS class names which goes over popover container | '' */
  className: PropTypes.string,
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
  className: '',
  delay: 0,
  doesAnchorToggle: true,
  hideDelay: 0,
  hoverDelay: 500,
  onClose: null,
  overflowType: 'auto',
  popoverTrigger: 'MouseEnter',
  showArrow: true,
  showDelay: 0,
  startOpen: false,
};

Popover.displayName = 'Popover';

export default Popover;

/**
* @component popover
* @section default
* @react
import {
  Button,
  Icon,
  List,
  ListItem,
  ListItemSection,
  Popover,
} from '@collab-ui/react';

 export default function ContentDefault() {

    const content = (
      <List>
        <ListItem>
          <ListItemSection position="left">
            <Icon name="edit_20" />
          </ListItemSection>
          <ListItemSection position="center">
            Edit space settings
          </ListItemSection>
        </ListItem>
        <ListItem>
          <ListItemSection position="left">
            <Icon name="favorite_20" />
          </ListItemSection>
          <ListItemSection position="center">Add to favorites</ListItemSection>
        </ListItem>
        <ListItem>
          <ListItemSection position="left">
            <Icon name="alert_20" />
          </ListItemSection>
          <ListItemSection position="center">Notifications</ListItemSection>
        </ListItem>
        <ListItem>
          <ListItemSection position="left">
            <Icon name="accessories_20" />
          </ListItemSection>
          <ListItemSection position="center">
            Add Integrations & Bots
          </ListItemSection>
        </ListItem>
        <ListItem>
          <ListItemSection position="left">
            <Icon name="stored-info_20" />
          </ListItemSection>
          <ListItemSection position="center">View space policy</ListItemSection>
        </ListItem>
        <ListItem>
          <ListItemSection position="left">
            <Icon name="archive_20" />
          </ListItemSection>
          <ListItemSection position="center">Archive space</ListItemSection>
        </ListItem>
        <ListItem>
          <ListItemSection position="left">
            <Icon name="cancel_20" />
          </ListItemSection>
          <ListItemSection position="center">
            Remove space from team
          </ListItemSection>
        </ListItem>
        <ListItem>
          <ListItemSection position="left">
            <Icon name="exit-room_20" />
          </ListItemSection>
          <ListItemSection position="center">Leave space</ListItemSection>
        </ListItem>
      </List>
    );

    const contentFocus = (
      <span key="1" style={{ padding: '10px'}}>Focus</span>
    );

  return (
    <div className="row">
      <div className="docs-example docs-example--spacing">
        <Popover
          content={content}
          popoverTrigger={'Click'}
        >
          <Button children="Click" ariaLabel="Click" />
        </Popover>
      </div>

      <div className="docs-example docs-example--spacing">
        <Popover
          content={content}
          popoverTrigger={'MouseEnter'}
        >
          <Button children="MouseEnter" ariaLabel="MouseEnter" />
        </Popover>
      </div>

      <div className="docs-example docs-example--spacing">
        <Popover
          content={contentFocus}
          popoverTrigger={'Focus'}
        >
          <Button children="Focus" ariaLabel="Focus" />
        </Popover>
      </div>
    </div>
  );
}
**/

/**
* @component popover
* @section delay
* @react

 import {
  Button,
  Popover,
} from '@collab-ui/react';

 export default function PopOverDelay() {

    const contentDelay = (
      <span key="1" style={{ padding: '10px'}}>Delayed</span>
    );

    return (
      <div className="docs-example docs-example--spacing">
        <Popover
          content={contentDelay}
          delay={500}
        >
          <Button children='Hover with Delay' ariaLabel='Hover with Delay' />
        </Popover>
      </div>
    );
}
**/

/**
* @component popover
* @section direction
* @react

 import {
  Button,
  Popover
} from '@collab-ui/react';

 export default function PopOverDirection() {

    const content = (
    <span key="1" style={{ padding: '10px'}}>right-center</span>
  );

  return (
    <div className="docs-example docs-example--spacing">
      <Popover
        content={content}
        direction={'right-center'}
      >
        <Button children='Direction' ariaLabel='Direction' />
      </Popover>
    </div>
  );
}
**/

/**
* @component popover
* @section arrow
* @react

 import {
  Button,
  Popover
} from '@collab-ui/react';

 export default function PopoverArrow() {

  const contentArrow = (
    <span key="1" style={{ padding: '10px'}}>Arrow</span>
  );

  return (
    <div className="docs-example docs-example--spacing">
      <Popover
        content={contentArrow}
        direction={'right-center'}
        showArrow={true}
      >
        <Button children='showArrow' ariaLabel='showArrow' />
      </Popover>
    </div>
  );
}
**/


/**
* @component popover
* @section offset
* @react

 import {
  Button,
  Popover
} from '@collab-ui/react';

 export default function PopoverOffset() {

  const contentOffset = (
    <span key="1" style={{ padding: '10px'}}>Offset</span>
  );

  return (
    <div className="docs-example docs-example--spacing">
      <Popover
        content={contentOffset}
        direction={'top-center'}
        targetOffset={{ vertical: 20 }}
      >
        <Button children='offset' ariaLabel='offset' />
      </Popover>
    </div>
  );
}
**/


/**
* @component popover
* @section contained
* @react

 import {
  Button,
  Popover
} from '@collab-ui/react';

 export default function PopoverContained() {

  const tall = (
    <span key="1" style={{ height: '3000px' }}>Popover(height: 3000px)</span>
  );

  return (
    <Popover
      isContained
      content={tall}
      direction={'bottom-center'}
      popoverTrigger={'Click'}
    >
      <Button children='Tall' ariaLabel='Tall' />
    </Popover>
  );
}
**/


/**
* @component popover
* @section overflow
* @react

 import {
  Button,
  Popover
} from '@collab-ui/react';

 export default function PopoverOverflow() {

  const tall = (
    <span key="1" style={{ height: '3000px' }}>Popover(height: 3000px)</span>
  );

  return (
    <div
      className="docs-example docs-example--spacing"
      style={{
        border: '2px solid #666666',
        width: '100%',
        height: '500px',
        overflow: 'scroll',
        padding: '125px'
      }}
    >
      <Popover
        isContained={true}
        checkOverflow
        content={tall}
        direction={'bottom-center'}
        popoverTrigger={'Click'}
      >
        <Button children='Tall' ariaLabel='Tall' />
      </Popover>
    </div>
  );
}
**/
