import React from 'react';
import {
  CoachmarkContent,
  CoachmarkDefault,
} from './index';

export default class CoachmarkKitchenSink extends React.Component {
  render() {
    return (
      <React.Fragment>
        <div style={{ height: '20vh' }}>
          <CoachmarkContent />
        </div>
        <div style={{ height: '20vh' }}>
          <CoachmarkDefault />
        </div>
      </React.Fragment>
    );
  }
}
