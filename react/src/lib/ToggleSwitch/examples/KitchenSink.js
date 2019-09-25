import React from 'react';
import {
  ToggleSwitchDefault,
  ToggleSwitchFilled,
} from './index';

export default class ToggleSwitchKitchenSink extends React.Component {
  render() {
    return (
      <React.Fragment>
        <ToggleSwitchDefault />
        <ToggleSwitchFilled />
      </React.Fragment>
    );
  }
}
