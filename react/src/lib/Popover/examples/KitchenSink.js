import React from 'react';
import {
  PopoverArrow,
  PopoverContained,
  PopoverDefault,
  PopoverDirection,
  PopoverOffset,
  PopoverOverflow,
  PopOverHoverAccessible,
} from './index';

export default class PopoverKitchenSink extends React.Component {
  render() {
    return (
      <React.Fragment>
        <PopOverHoverAccessible />
        <PopoverArrow />
        <PopoverContained />
        <PopoverDefault />
        <PopoverDirection />
        <PopoverOffset />
        <PopoverOverflow />
      </React.Fragment>
    );
  }
}
