/**
 * @category controls
 * @component slider
 * @variations collab-ui-react
 */

import React from 'react';
import PropTypes from 'prop-types';
import SliderPointer from '@collab-ui/react/Slider/SliderPointer';

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
            <span key={`tick-${idx}`} className='cui-slider__hashlabel'>
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
      <div className={
        `cui-slider ${className}` +
        `${(disabled && ` cui-slider--disabled`) || ''}` +
        `${(className && ` ${className}`) || ''}`
        }
      >
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

/**
* @component slider
* @section default
* @react
import { Slider } from '@collab-ui/react';

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


/**
* @component slider
* @section two-handles
* @react
import { Slider } from '@collab-ui/react';

export default class DefaultSlider extends React.Component {
  state = {
    slider1: {low: 100, high: 200},
  }
  render() {
    return (
      <div className="row" key="child-0">
        <div>
          Low: {this.state.slider1.low} High: {this.state.slider1.high}
        </div>
        <Slider
          min={0}
          max={500}
          tick={100}
          value={this.state.slider1}
          step={1}
          onChange={value => this.setState({ slider1: value })}
        />
      </div>
    );
  }
}
**/


/**
* @component slider
* @section cross
* @react
import { Slider } from '@collab-ui/react';

export default class DefaultSlider extends React.Component {
  state = {
    slider1: {low: 100, high: 200},
  }
  render() {
    return (
      <div className="row" key="child-2">
        <div>
          Low: {this.state.slider1.low} High: {this.state.slider1.high}
        </div>
        <Slider
          min={0}
          max={500}
          tick={100}
          value={this.state.slider1}
          step={1}
          canCross
          onChange={value => this.setState({ slider1: value })}
        />
      </div>
    );
  }
}
**/


/**
* @component slider
* @section step
* @react
import { Slider } from '@collab-ui/react';

export default class DefaultSlider extends React.Component {
  state = {
    slider1: { low: 100, high: 200 },
    slider2: { low: 100, high: 200 },
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
            step={20}
            canCross
            onChange={value => this.setState({ slider1: value })}
          />
        </div>
        <br key='child-1' />
        <div className="row" key='child-2'>
          <div>Low: {this.state.slider2.low} High: {this.state.slider2.high}</div>
          <Slider
            min={0}
            max={500}
            tick={100}
            value={this.state.slider2}
            step={50}
            canCross
            onChange={value => this.setState({ slider2: value })}
          />
        </div>
      </span>
    );
  }
}
**/
