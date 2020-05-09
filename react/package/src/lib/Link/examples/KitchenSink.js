import React from 'react';
import {
  LinkColored,
  LinkDefault,
} from './index';

export default class LinkKitchenSink extends React.Component {
  render() {
    return (
      <React.Fragment>
        <LinkColored />
        <LinkDefault />
      </React.Fragment>
    );
  }
}
