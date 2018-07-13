import React from 'react';
import PropTypes from 'prop-types';
import { omit } from 'lodash';
import { EventOverlay, Button } from '@collab-ui/react';

/**
 * @category communication
 * @component coachmark
 * @variations collab-ui-react
 */

class Coachmark extends React.Component {
  static displayName = 'Coachmark';

  state = {
    isOpen: this.props.isOpen
  };

  componentDidMount() {
    this.props.isOpen &&
    this.delayedShow();
  }

  componentDidUpdate(prevProps) {
    if (prevProps.isOpen !== this.props.isOpen) {
      return this.props.isOpen
      ? this.delayedShow()
      : this.delayedHide();  
    }
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
        onClick && onClick(e);
        return { isOpen: false };
      });
    }, delay);

  };

  delayedShow = () => {
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
      allowClickAway,
      buttonChildren,
      className,
      children,
      closeOnClick,
      contentNode,
      direction,
      header,
      maxWidth,
      onClick,
      subheader,
      ...props
    } = this.props;

    const otherProps = omit({...props}, ['delay', 'hideDelay', 'isOpen', 'showDelay']);

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
                onClick && <Button onClick={this.delayedHide} {...otherProps} key='content-2'>{buttonChildren}</Button>
              ]
            }
      </div>
    );

    return (
      <div className='cui-coachmark'>
        {anchorWithRef}
        <EventOverlay
          ref={ref => this.overlay = ref}
          allowClickAway={allowClickAway}
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
  allowClickAway: false,
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
  allowClickAway: PropTypes.bool,
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
* @name Coachmark Default
*
* @category communication
* @component coachmark
* @section default
*
* @js

import { Button, SpaceListItem, Avatar } from '@collab-ui/react';

 export default class Default extends React.Component {

  state = {
    openFirst: true,
    openNext: false,
    openLast: false
  }

  render() {
    const {openFirst, openNext, openLast} = this.state;

    return (
      <div style={{display: 'flex', flexFlow: 'row nowrap', justifyContent: 'space-between'}}>
        <Coachmark 
          isOpen={openFirst}
          maxWidth={272}
          onClick={() => this.setState({openFirst: false, openNext: true})}
          buttonChildren={'Got It'}
          header={`Header prop(node)`}
          subheader={`Subheader prop(node)`}
          direction='bottom-center'
          ariaLabel='Open Coachmark 1'
        >
          <Button ariaLabel='test' onClick={() => this.setState({openFirst: true, openNext: false, openLast: false})}>Coachmark Anchor</Button>
        </Coachmark>
        <Coachmark
          isOpen={openNext}
          onClick={() => this.setState({openLast: true, openNext: false})}
          buttonChildren={'Click for next Coachmark'}
          header={`Header prop(node)`}
          direction='top-center'
          ariaLabel='Open Coachmark 2'
        >
          <Button ariaLabel='test' onClick={() => this.setState({openFirst: false, openNext: true, openLast: false})}>2nd Coachmark Anchor</Button>
        </Coachmark>
        <Coachmark isOpen={openLast}
          contentNode={<div>contentNode prop(node)</div>}
          direction='bottom-center'
          ariaLabel='Open Coachmark 3'
        >
          <Button ariaLabel='test' onClick={() => this.setState({openFirst: false, openNext: false, openLast: true})}>3rd Coachmark Anchor</Button>
        </Coachmark>
      </div>
    );
  }
}
**/
