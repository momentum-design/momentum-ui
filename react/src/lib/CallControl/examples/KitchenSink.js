import React from 'react';
import {
  CallControlActive,
  CallControlCancel,
  CallControlDefault,
  CallControlDisable,
} from './index';

export default class CallControlKitchenSink extends React.Component {
  render() {
    return (
      <React.Fragment>
        <CallControlActive />
        <CallControlCancel />
        <CallControlDefault />
        <CallControlDisable />
      </React.Fragment>
    );
  }
}
