import React from 'react';
import { Slider } from '@collab-ui/react';
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