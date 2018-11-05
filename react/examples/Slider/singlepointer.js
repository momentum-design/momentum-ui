import React from 'react';
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