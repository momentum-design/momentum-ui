import React from 'react';
import { Slider } from '@momentum-ui/react';
export default class SliderCross extends React.Component {
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
