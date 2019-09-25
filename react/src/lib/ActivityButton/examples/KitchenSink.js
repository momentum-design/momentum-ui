import React from 'react';
import {
  ActivityButtonDefault,
  ActivityButtonLarge,
  ActivityButtonSize56,
} from './index';

export default class ActivityButtonKitchenSink extends React.Component {
  render() {
    return (
      <React.Fragment>
        <ActivityButtonDefault />
        <ActivityButtonLarge />
        <ActivityButtonSize56 />
      </React.Fragment>
    );
  }
}
