import React from 'react';
import {
  CoachmarkContent,
  CoachmarkDefault,
} from './index';

export default class CoachmarkKitchenSink extends React.Component {
  render() {
    return (
      <React.Fragment>
        <CoachmarkContent />
        <CoachmarkDefault />
      </React.Fragment>
    );
  }
}
