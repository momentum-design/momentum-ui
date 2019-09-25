import React from 'react';
import {
  ListDefault,
  ListListItemHeader,
  ListListItemSeparator,
} from './index';

export default class ListKitchenSink extends React.Component {
  render() {
    return (
      <React.Fragment>
        <ListDefault />
        <ListListItemHeader />
        <ListListItemSeparator />
      </React.Fragment>
    );
  }
}
