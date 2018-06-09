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
      buttonChildren,
      className,
      children,
      closeOnClick,
      contentNode,
      delay,
      direction,
      header,
      hideDelay,
      isOpen,
      maxWidth,
      onClick,
      showDelay,
      subheader,
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
                onClick && <Button onClick={this.delayedHide} {...props} key='content-2'>{buttonChildren}</Button>
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
          showArrow
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
  buttonChildren: null,
  children: null,
  className: '',
  closeOnClick: false,
  contentNode: null,
  delay: 0,
  direction: 'top-center',
  header: '',
  hideDelay: 0,
  isOpen: false,
  maxWidth: null,
  onClick: null,
  showDelay: 0,
  subheader: '',
};

Coachmark.propTypes = {
  buttonChildren: PropTypes.node,
  className: PropTypes.string,
  children: PropTypes.node.isRequired,
  closeOnClick: PropTypes.bool,
  contentNode: PropTypes.node,
  delay: PropTypes.number,
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
  header: PropTypes.node,
  hideDelay: PropTypes.number,
  isOpen: PropTypes.bool,
  maxWidth: PropTypes.number,
  onClick: PropTypes.func,
  showDelay: PropTypes.number,
  subheader: PropTypes.node,
};

export default Coachmark;

/**
* @name Coachmark Default with Delay
*
* @category communication
* @component coachmark
* @section default
*
* @js

import { Button, SpaceListItem, Avatar } from '@collab-ui/react';

 export default function Default() {

  state = {
    openFirst: false,
    openNext: false,
    openLast: false
  }

  render() {
    const {openFirst, openNext, openLast} = this.state;

    return (
      <div style={{display: 'flex', flexFlow: 'row nowrap', justifyContent: 'space-between'}}>
        <Coachmark isOpen={openFirst} maxWidth={272} onClick={() => this.setState({openFirst: false, openNext: true})} buttonChildren={'Got It'} header={`Someone's @mentioned you`} subheader={`See who's trying to get your attention in your @mentions filter`} direction='bottom-center'>
          <Button ariaLabel='test' onClick={() => this.setState({openFirst: true})}>Test</Button>
        </Coachmark>
        <Coachmark isOpen={openNext} onClick={() => this.setState({openLast: true, openNext: false})} buttonChildren={'Got It'} header={`Someone's @mentioned you`} subheader={`See who's trying to get your attention in your @mentions filter`} direction='bottom-center'>
          <Button ariaLabel='test'>Test</Button>
          </Coachmark>
          <Coachmark isOpen={openLast} contentNode={<div>Test</div>} direction='bottom-center'>
          <Button ariaLabel='test'>Test</Button>
        </Coachmark>
      </div>
    );
  }
}
**/
