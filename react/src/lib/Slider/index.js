/**
 * @category controls
 * @component slider
 * @variations collab-ui-react
 */

import React from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';
import SliderPointer from '@collab-ui/react/Slider/SliderPointer';

export default class Slider extends React.Component {
  static displayName = 'Slider';

  state = {
    sliderLow: this.props.value.low || this.props.min,
    sliderHigh: this.props.value.high || this.props.value,
    scale: [this.props.min, this.props.max],
    selectionWidth: null
  }

  componentWillMount() {
    const { min, max, tick } = this.props;

    tick && this.getScale(min, max, tick);
    this.getSelectionWidth();
  }

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
    return ReactDOM.findDOMNode(this.sliderBar).getBoundingClientRect().width;
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
      return scale.map((tickValue, idx) => {
        const leftValue = `${(tickValue - min) / max * 100}%`;
        const tickLabel = translateFn ? translateFn(tickValue) : tickValue;

        return (
          <span style={{ left: leftValue }} key={`tick-${idx}`}>
            <span className='cui-slider__hashlabel'>
              {tickLabel}
            </span>
          </span>
        );
      });
    };

    return (
      <div className={
        `cui-slider ${className}` +
        `${(disabled && ` cui-slider--disabled`) || ''}` +
        `${(className && ` ${className}`) || ''}`
      }>
        <span className='cui-slider__bar' ref={ref => this.sliderBar = ref} />
        <span className='cui-slider__selection' style={selectionWidth} />
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
  className: PropTypes.string,
  canCross: PropTypes.bool,
  disabled: PropTypes.bool,
  max: PropTypes.number.isRequired,
  min: PropTypes.number,
  onChange: PropTypes.func,
  step: PropTypes.number,
  tick: PropTypes.number,
  translateFn: PropTypes.func,
  value: PropTypes.oneOfType([
    PropTypes.shape({
      low: PropTypes.number.isRequired,
      high: PropTypes.number.isRequired
    }),
    PropTypes.number
  ])
};

Slider.defaultProps = {
  className: '',
  canCross: false,
  disabled: false,
  min: 0,
  onChange: null,
  step: 1,
  tick: 0,
  translateFn: null,
  value: 0
};

/**
* @name Default Slider
* @description Sliders with range mentioned.
*
* @category controls
* @component slider
* @section default
*
* @js

export default class DefaultSlider extends React.Component {
  state = {
    slider1: {low: 100, high: 200},
    slider2: {low: 100, high: 200}
  }
  render() {
    return (
      <span>
        <div className="row" key='child-0'>
          <div>Low: {this.state.slider1.low} High: {this.state.slider1.high}</div>
          <Slider
            min={0}
            max={500}
            tick={100}
            value={this.state.slider1}
            step={1}
            onChange={value => this.setState({ slider1: value })}
          />
        </div>
        <br key='child-1'/>
        <div className="row" key='child-2'>
          <div>Low: {this.state.slider2.low} High: {this.state.slider2.high} (canCross prop = true)</div>
          <Slider
            min={0}
            max={500}
            tick={100}
            value={this.state.slider2}
            step={1}
            canCross
            onChange={value => this.setState({slider2: value})}
          />
        </div>
      </span>
    );
  }
}
**/

/**
* @name Slider with one pointer
* @description Sliders with one pointer.
*
* @category controls
* @component slider
* @section single-pointer
*
* @js

export default class SliderOnePointer extends React.Component {
  render() {
    return (
      <Slider
        min={0}
        max={500}
        tick={100}
        value={200}
        step={1}
      />
    );
  }
}
**/
