import React from 'react';
import { Slider } from '@momentum-ui/react';
export default class DefaultSlider extends React.Component {
  state = {
    value: 200
  }

  handleChange = value => this.setState({ value })

  render() {
    return (
      <div>
        <h5>Value: {this.state.value}</h5>
        <Slider
          min={0}
          max={500}
          tick={100}
          value={200}
          step={1}
          onChange={this.handleChange}
        />
      </div>
    );
  }
}
