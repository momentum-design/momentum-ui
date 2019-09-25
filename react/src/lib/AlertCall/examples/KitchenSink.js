import React from 'react';
import {
  AlertCallDefault,
  AlertCallDevice,
  AlertCallDeviceList,
  AlertCallNumber,
} from './index';

export default class AlertCallKitchenSink extends React.Component {
  render() {
    return (
      <React.Fragment>
        <AlertCallDefault />
        <AlertCallDevice />
        <AlertCallDeviceList />
        <AlertCallNumber />
      </React.Fragment>
    );
  }
}
