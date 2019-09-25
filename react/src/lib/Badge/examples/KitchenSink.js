import React from 'react';
import {
  BadgeDefault,
  BadgeRound,
} from './index';

export default class BadgeKitchenSink extends React.Component {
  render() {
    return (
      <React.Fragment>
        <BadgeDefault />
        <BadgeRound />
      </React.Fragment>
    );
  }
}
