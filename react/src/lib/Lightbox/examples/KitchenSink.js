import React from 'react';
import {
  LightboxDefault,
  LightboxMultiple,
} from './index';

export default class LightboxKitchenSink extends React.Component {
  render() {
    return (
      <React.Fragment>
        <LightboxDefault />
        <LightboxMultiple />
      </React.Fragment>
    );
  }
}
