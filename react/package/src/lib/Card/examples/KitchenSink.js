import React from 'react';
import {
  CardClickable,
  CardContent,
  CardContent2,
  CardDefault
} from './index';

export default class CardKitchenSink extends React.Component {
  render() {
    return (
      <React.Fragment>
        <CardDefault />
        <CardContent />
        <CardContent2 />
        <CardClickable />
      </React.Fragment>
    );
  }
}