import React from 'react';
import PropTypes from 'prop-types';

/** Child component to display the slider pointer */
class SliderPointer extends React.PureComponent {
  state = {
    previousPosition: null
  }

  getDirections = currentPos => {
    const { previousPosition } = this.state;
    if (currentPos > previousPosition) {
      return 1;
    }
    return -1;
  };

  getPosition = (event, isTouch) => {
    return isTouch ? event.touches[0].clientX : event.clientX;
  }

  onMouseDown = (event, isTouch = false) => {
    if (!isTouch) {
      document.addEventListener('mousemove', this.onMouseMove);
      document.addEventListener('mouseup', this.onMouseUp);
    }

    this.setState({
      previousPosition: this.getPosition(event, isTouch)
    });
  };

  onMouseUp = () => {
    document.removeEventListener('mousemove', this.onMouseMove);
    document.removeEventListener('mouseup', this.onMouseUp);
  };

  onMouseMove = (event, isTouch = false) => {
    const xPos = this.getPosition(event, isTouch);
    const direction = this.getDirections(xPos);

    this.props.onMove({
      from: this.sliderRef.getBoundingClientRect().x,
      to: xPos,
      direction,
      isKeyBoard: false
    });
  };

  onKeyDown = event => {
    const KEYS = {
      LEFT: 37,
      UP: 38,
      RIGHT: 39,
      DOWN: 40
    };
    
    switch (event.keyCode) {
      case KEYS.UP:
      case KEYS.RIGHT:
        this.props.onMove({
          isKeyBoard: true,
          direction: 1
        });
        event.preventDefault();
        break;

      case KEYS.DOWN:
      case KEYS.LEFT:
        this.props.onMove({
          isKeyBoard: true,
          direction: -1
        });
        event.preventDefault();
        break;
    }
  };

  
  render() {
    const { position } = this.props;

    const pointerStyle = {left: `calc(${position}%`};

    return (
      <div
        className='cui-slider__pointer'
        onMouseDown={e => this.onMouseDown(e)}
        onTouchStart={e => this.onMouseDown(e, true)}
        onTouchMove={e => this.onMouseMove(e, true)}
        onKeyDown={e => this.onKeyDown(e)}
        role='button'
        tabIndex={0}
        style={pointerStyle}
        ref={ref => this.sliderRef = ref}
      />
    );
  }
}

SliderPointer.propTypes = {
  /** @prop Set Slider Pointer's position | 0 */
  position: PropTypes.number,
  /** @prop Callback function invoked when user moves the Slider Pointer | null */
  onMove: PropTypes.func,
};

SliderPointer.defaultProps = {
  position: 0,
  onMove: null,
};

SliderPointer.displayName = 'SliderPointer';

export default SliderPointer;