import React from 'react';
import {
  AlertBannerDefault,
  AlertBannerError,
  AlertBannerWarning,
} from './index';

export default class AlertBannerKitchenSink extends React.Component {
  render() {
    return (
      <React.Fragment>
        <AlertBannerDefault />
        <AlertBannerError />
        <AlertBannerWarning />
      </React.Fragment>
    );
  }
}
