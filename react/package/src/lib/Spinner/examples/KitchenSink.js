import React from 'react';
import {
  SpinnerCheck,
  SpinnerDefault,
  SpinnerDeterminate,
  SpinnerPercentage,
} from './index';

export default class SpinnerKitchenSink extends React.Component {
  render() {
    return (
      <React.Fragment>
        <SpinnerCheck />
        <SpinnerDefault />
        <SpinnerDeterminate />
        <SpinnerPercentage />
      </React.Fragment>
    );
  }
}
