import React from 'react';
import {
  ButtonGroupDefault,
  ButtonGroupHighlightFalse,
  ButtonGroupJustifiedFalse,
  ButtonGroupPill,
} from './index';

export default class ButtonGroupKitchenSink extends React.Component {
  render() {
    return (
      <React.Fragment>
        <ButtonGroupDefault />
        <ButtonGroupHighlightFalse />
        <ButtonGroupJustifiedFalse />
        <ButtonGroupPill />
      </React.Fragment>
    );
  }
}
