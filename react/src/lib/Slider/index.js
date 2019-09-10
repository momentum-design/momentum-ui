/** @component slider */

import React from 'react';
import PropTypes from 'prop-types';
import SliderPointer from '@momentum-ui/react/Slider/SliderPointer';

class Slider extends React.Component {

  state = {
    sliderLow: this.props.value.low || this.props.min,
    sliderHigh: this.props.value.high || this.props.value,
    scale: [this.props.min, this.props.max],
    selectionWidth: null,
  }

  componentWillMount() {
    const { min, max, tick } = this.props;

    tick && this.getScale(min, max, tick);
    this.getSelectionWidth();
  }

  componentDidMount() {
    const { min, max } = this.props;
    const { scale } = this.state;
    this.setScalePos(scale, min, max);
  }

  setScalePos = (scale, min, max) => {
    this.ticksContainer && this.ticksContainer.childNodes.forEach((child, idx) => {
      const leftValue = `${(scale[idx] - min) / max * 100}%`;
      child.style.left = `calc(${leftValue} - ${(child.offsetWidth/2)}px)`;
    });
  };

  getScale = (low = 0, high, tick) => {
    let value = high;
    let ticksArray = [high];

    while (value > 0 && (value - tick) >= low) {
      value -= tick;

      ticksArray.unshift(Math.abs(Math.round(value / tick) * tick));
    }

    this.setState({ scale: ticksArray });
  };

  getSliderWidth = () => {
    return this.sliderBar.getBoundingClientRect().width;
  };

  getStepWidth = () => {
    const maxValue = this.props.max - this.props.min;
    const maxWidth = this.getSliderWidth();

    return (this.props.step / maxValue) * maxWidth;
  };

  getSteps = (position) => {
    if (position.isKeyBoard) return 1;
    const diff = position.direction === 1 ? position.to - position.from : position.from - position.to;
    if (diff < 0) return 0;
    const steps = diff / this.getStepWidth();
    return steps - Math.floor(steps) >= 0.5 ? Math.ceil(steps) : Math.floor(steps);
  };


  getLimit = (pointerKey, direction) => {
    if (pointerKey === 'sliderLow') {
      return this.props.canCross
      ? direction === 1 ? this.props.max : this.props.min
      : direction === 1 ? this.state.sliderHigh : this.props.min;
    } else if (pointerKey === 'sliderHigh') {
      return this.props.canCross
      ? direction === 1 ? this.props.max : this.props.min
      : direction === 1 ? this.props.max : this.state.sliderLow;
    }
  };

  returnCurrentValues = () => {
    this.getSelectionWidth();

    if (this.props.onChange) {
      return this.props.onChange(
        typeof this.props.value === 'object'
        ?
        {
          low: Math.min(this.state.sliderHigh, this.state.sliderLow),
          high: Math.max(this.state.sliderHigh, this.state.sliderLow)
        }
        : this.state.sliderHigh
      );
    }
  };

  moveForward = (key, pixelMove, limit) => {
    const newPosition = this.state[key] + pixelMove <= limit
      ? this.state[key] + pixelMove
      : limit;

    this.setState({
      [key]: newPosition
    }, () => this.returnCurrentValues());
  };

  moveBack = (key, pixelMove, limit) => {
    const newPosition = this.state[key] - pixelMove >= limit
      ? this.state[key] - pixelMove
      : limit;

    this.setState({
      [key]: newPosition
    }, () => this.returnCurrentValues());
  };


  onSliderMove = (key, position) => {
    if (this.props.disabled) return;
    const limit = this.getLimit(key, position.direction);
    const pixelMove = this.getSteps(position) * this.props.step;

    position.direction === 1 ? this.moveForward(key, pixelMove, limit) : this.moveBack(key, pixelMove, limit);
  };

  getSelectionWidth = () => {
    const baseValue = Number.isInteger(this.state.sliderLow) ? this.state.sliderLow : this.props.min;

    this.setState({
      selectionWidth: {
        width: `${(Math.abs(this.state.sliderHigh - baseValue) / this.props.max) * 100}%`,
        left: `${((Math.min(baseValue, this.state.sliderHigh) - this.props.min) / this.props.max) * 100}%`
      }
    });
  };

  render() {
    const { value, disabled, className, max, min, translateFn } = this.props;
    const { sliderHigh, sliderLow, scale, selectionWidth } = this.state;

    const renderTicks = () => {
      const ticks = scale.map((tickValue, idx) => {
        const tickLabel = translateFn ? translateFn(tickValue) : tickValue;
        return (
            <span key={`tick-${idx}`} className='md-slider__hashlabel'>
              {tickLabel}
            </span>
        );
      });
      return (
        <div ref={ref => this.ticksContainer = ref}>
          {ticks}
        </div>
      );
    };

    return (
      <div 
        className={
          `md-slider ${className}` +
          `${(disabled && ` md-slider--disabled`) || ''}` +
          `${(className && ` ${className}`) || ''}`
        }
        role='slider'
        aria-valuemin={min}
        aria-valuemax={max}
        aria-valuenow={
          typeof this.props.value !== 'object' 
          ? 
          sliderHigh : undefined
        }
        aria-valuetext={
          typeof this.props.value === 'object' 
          ? 
          `Low is ${Math.min(sliderLow, sliderHigh)}, high is ${Math.max(sliderLow, sliderHigh)}` : undefined
        }
      >
        <span className='md-slider__bar' ref={ref => this.sliderBar = ref} />
        <span className='md-slider__selection' style={selectionWidth} />
        {
          Number.isInteger(value.low)
          &&
          <SliderPointer
            position={((sliderLow - min) / (max - min)) * 100}
            onMove={(b) => this.onSliderMove('sliderLow', b)}
            ref={ref => this.sliderLow = ref}
          />
        }
        <SliderPointer
          position={((sliderHigh - min) / (max - min)) * 100}
          onMove={(b) => this.onSliderMove('sliderHigh', b)}
          ref={ref => this.sliderHigh = ref}
        />
        {renderTicks()}
      </div>
    );
  }
}

Slider.propTypes = {
  /** @prop Determines if minimum pointer can cross over maximum pointer | false */
  canCross: PropTypes.bool,
  /** @prop Optional CSS class string | '' */
  className: PropTypes.string,
  /** @prop Set the attribute disabled to Slider | false */
  disabled: PropTypes.bool,
  /** @prop Set the initial maximum value */
  max: PropTypes.number.isRequired,
  /** @prop Set the initial minimum value | 0 */
  min: PropTypes.number,
  /** @prop Callback function invoked by user when change a pointer position | null */
  onChange: PropTypes.func,
  /** @prop Set visual step measurement | 1 */
  step: PropTypes.number,
  /** @prop Set increment of x-axis labels | 0 */
  tick: PropTypes.number,
  /** @prop Function to compute layout of Slider | null */
  translateFn: PropTypes.func,
  /** @prop Set either maximum pointer value or a combination of high and low pointer values | 0 */
  value: PropTypes.oneOfType([
    PropTypes.shape({
      high: PropTypes.number.isRequired,
      low: PropTypes.number.isRequired,
    }),
    PropTypes.number
  ])
};

Slider.defaultProps = {
  canCross: false,
  className: '',
  disabled: false,
  min: 0,
  onChange: null,
  step: 1,
  tick: 0,
  translateFn: null,
  value: 0
};

Slider.displayName = 'Slider';

export default Slider;
