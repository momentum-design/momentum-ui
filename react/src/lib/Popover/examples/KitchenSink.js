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
        <PopoverDirection direction={'right-center'} />
        <PopoverDirection direction={'left-center'} />
        <PopoverDirection direction={'top-center'} />
        <PopoverDirection direction={'bottom-center'} />
        <PopoverDirection direction={'right-center'} isContained={true} />
        <PopoverDirection direction={'left-center'} isContained={true}/>
        <PopoverDirection direction={'top-center'} isContained={true} />
        <PopoverDirection direction={'bottom-center'} isContained={true} />
        <PopoverOffset />
        <PopoverOverflow />
      </React.Fragment>
    );
  }
}
