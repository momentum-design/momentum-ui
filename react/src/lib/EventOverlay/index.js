import React from 'react';
import PropTypes from 'prop-types';
import ReactDOM from 'react-dom';

export default class EventOverlay extends React.Component {
  static displayName = 'EventOverlay';

  componentDidMount = () => {
    this.addHandlers();
  };

  componentDidUpdate = (prevProps) => {
    if (prevProps.isOpen !== this.props.isOpen || prevProps.direction !== this.props.direction) {
      return this.forceUpdate(() => this.setPlacement());
    }
  };

  componentWillUnmount = () => {
    this.removeHandlers();
  };

  addHandlers = () => {
    const { allowClickAway } = this.props;
    this.handleResize = this.setPlacement;
    this.handleScroll = this.setPlacement;

    allowClickAway && window.addEventListener('click', this.handleClick, true);
    window.addEventListener('resize', this.handleResize, true);
    window.addEventListener('scroll', this.handleScroll, true);
    window.addEventListener('keyup', this.handleKeyUp, true);

    this.setPlacement();
  };

  removeHandlers = () => {
    window.removeEventListener('click', this.handleClick, true);
    window.removeEventListener('resize', this.handleResize, true);
    window.removeEventListener('scroll', this.handleScroll, true);
    window.removeEventListener('keyup', this.handleKeyUp, true);
  };

  handleKeyUp = e => {
    if(!this.props.isOpen) return;
    if (e.keyCode === 27) return this.handleClickAway(e);
    const anchorNode = ReactDOM.findDOMNode(this.props.anchorNode);

    return this.container
      && !anchorNode.contains(document.activeElement)
      && !ReactDOM.findDOMNode(this.container).contains(document.activeElement)
      && this.handleClickAway(e);
  };

  handleClick = e => {
    if(!this.props.isOpen) return;
    const anchorNode = ReactDOM.findDOMNode(this.props.anchorNode);

    return this.container
      && !ReactDOM.findDOMNode(anchorNode).contains(e.target)
      && (this.props.closeOnClick || !ReactDOM.findDOMNode(this.container).contains(e.target))
      && this.handleClickAway(e);
  };

  getAnchorPosition = node => {
    const rect = node.getBoundingClientRect();

    const anchorPosition = {
      top: rect.top,
      left: rect.left,
      width: node.offsetWidth,
      height: node.offsetHeight
    };

    anchorPosition.right =
      rect.right || anchorPosition.left + anchorPosition.width;
    anchorPosition.bottom =
      rect.bottom || anchorPosition.top + anchorPosition.height;
    anchorPosition.middle =
      anchorPosition.left + (anchorPosition.right - anchorPosition.left) / 2;
    anchorPosition.center =
      anchorPosition.top + (anchorPosition.bottom - anchorPosition.top) / 2;

    return anchorPosition;
  };

  getTargetPosition = targetNode => {
    return {
      top: 0,
      center: targetNode.offsetHeight / 2,
      bottom: targetNode.offsetHeight,
      left: 0,
      middle: targetNode.offsetWidth / 2,
      right: targetNode.offsetWidth
    };
  };

  getOrigin = () => {
    const side = this.props.direction.split('-')[0];
    const alignment = this.props.direction.split('-')[1];
    const origin = {
      anchor: {}, target: {}
    };

    if(side === 'top' || side === 'bottom') {
      origin.anchor.vertical = side;
      origin.anchor.horizontal = alignment === 'center' ? 'middle' : alignment;

      origin.target.vertical = side === 'top' ? 'bottom' : 'top';
      origin.target.horizontal = alignment === 'center' ? 'middle' : alignment;
    }

    if(side === 'left' || side === 'right') {
      origin.anchor.vertical = alignment;
      origin.anchor.horizontal = side;

      origin.target.vertical = alignment;
      origin.target.horizontal = side === 'left' ? 'right' : 'left';
    }

    return origin;
  };

  setArrowPlacement = anchor => {
    const arrow = this.arrow;
    const side = this.props.direction.split('-')[0];

    switch (side) {
      case 'top':
        arrow.style.left = anchor.middle + "px";
        arrow.style.top = anchor.top + "px";
        break;
      case 'bottom':
        arrow.style.left = anchor.middle + "px";
        arrow.style.top = anchor.bottom + "px";
        break;

      case 'left':
        arrow.style.left = anchor.left + "px";
        arrow.style.top = anchor.center + "px";
        break;

      case 'right':
        arrow.style.left = anchor.right + "px";
        arrow.style.top = anchor.center + "px";
        break;
    }
  };

  setPlacement = () => {
    if (!this.props.isOpen) return;

    const anchorNode = ReactDOM.findDOMNode(this.props.anchorNode);
    const targetNode = this.container;

    if (!targetNode || !anchorNode) return;

    const anchorPosition = this.getAnchorPosition(anchorNode);
    const targetPosition = this.getTargetPosition(targetNode);

    const origin = this.getOrigin();

    const anchorOrigin = origin.anchor;
    const targetOrigin = origin.target;

    const targetNodePosition = {
      top:
        anchorPosition[anchorOrigin.vertical] -
        targetPosition[targetOrigin.vertical] +
        this.props.targetOffset.vertical,
      left:
        anchorPosition[anchorOrigin.horizontal] -
        targetPosition[targetOrigin.horizontal] +
        this.props.targetOffset.horizontal
    };

    targetNode.style.top = targetNodePosition.top + 'px';
    targetNode.style.left = targetNodePosition.left + 'px';
    targetNode.style.maxHeight = window.innerHeight + 'px';

    this.props.showArrow && this.setArrowPlacement(anchorPosition);
  };

  handleClickAway = e => {
    this.props.close && this.props.close(e);
  };

  render() {
    const { className, isOpen, children, showArrow } = this.props;
    const side = this.props.direction.split('-')[0];
    const contentNodes = (
      <div className={'cui-event-overlay' +
        `${(showArrow && ` cui-event-overlay--arrow`) || ''}` +
        `${(side && ` cui-event-overlay--${side}`) || ''}` +
        `${(className && ` ${className}`) || ''}`
        }
      >
        {showArrow && <div ref={ref => this.arrow = ref} className='cui-event-overlay__arrow'/>}
        <div
          className='cui-event-overlay__children'
          ref={ref => this.container = ref}
        >
          {children}
        </div>
      </div>
    );

    return isOpen && contentNodes;
  }
}

EventOverlay.defaultProps = {
  allowClickAway: true,
  anchorNode: null,
  children: null,
  className: '',
  close: null,
  isOpen: false,
  direction: 'bottom-left',
  targetOffset: {
    horizontal: 0,
    vertical: 0
  },
  showArrow: false
};

EventOverlay.propTypes = {
  allowClickAway: PropTypes.bool,
  anchorNode: PropTypes.object,
  children: PropTypes.node,
  className: PropTypes.string,
  close: PropTypes.func,
  isOpen: PropTypes.bool,
  targetOffset: PropTypes.object,
  direction: PropTypes.oneOf(['top-center', 'left-center', 'right-center', 'bottom-center',
    'top-left', 'top-right', 'bottom-left', 'bottom-right',
    'left-top', 'left-bottom', 'right-top', 'right-bottom']),
  showArrow: PropTypes.bool,
  closeOnClick: PropTypes.bool
};
