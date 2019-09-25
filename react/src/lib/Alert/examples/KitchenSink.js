import React from 'react';
import {
  AlertDefault,
  AlertError,
  AlertSuccess,
  AlertWarning,
} from './index';

export default class AlertKitchenSink extends React.Component {
  render() {
    return (
      <React.Fragment>
        <AlertDefault />
        <AlertError />
        <AlertSuccess />
        <AlertWarning />
      </React.Fragment>
    );
  }
}
