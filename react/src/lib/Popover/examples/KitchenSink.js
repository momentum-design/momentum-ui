import React from 'react';
import {
  PopoverArrow,
  PopoverContained,
  PopoverDefault,
  PopoverDelay,
  PopoverDirection,
  PopoverOffset,
  PopoverOverflow,
} from './index';

export default class PopoverKitchenSink extends React.Component {
  render() {
    return (
      <React.Fragment>
        <PopoverArrow />
        <PopoverContained />
        <PopoverDefault />
        <PopoverDelay />
        <PopoverDirection />
        <PopoverOffset />
        <PopoverOverflow />
      </React.Fragment>
    );
  }
}
