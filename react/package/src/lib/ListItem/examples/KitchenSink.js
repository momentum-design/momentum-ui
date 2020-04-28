import React from 'react';
import {
  ListItemDefault,
  ListItemListItemSections,
  ListItemListItemSeparator,
} from './index';

export default class ListItemKitchenSink extends React.Component {
  render() {
    return (
      <React.Fragment>
        <ListItemDefault />
        <ListItemListItemSections />
        <ListItemListItemSeparator />
      </React.Fragment>
    );
  }
}
