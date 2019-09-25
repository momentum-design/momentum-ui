import React from 'react';
import {
  TooltipContent,
  TooltipDefault,
  TooltipDelay,
  TooltipDirection,
} from './index';

export default class TooltipKitchenSink extends React.Component {
  render() {
    return (
      <React.Fragment>
        <TooltipContent />
        <TooltipDefault />
        <TooltipDelay />
        <TooltipDirection />
      </React.Fragment>
    );
  }
}
