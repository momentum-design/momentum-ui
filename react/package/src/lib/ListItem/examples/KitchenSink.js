import React from 'react';
import {
  ListItemDefault,
  ListItemListItemSections,
  ListItemListItemSeparator,
  TabbableChildren,
} from './index';

export default class ListItemKitchenSink extends React.Component {
  render() {
    return (
      <React.Fragment>
        <ListItemDefault />
        <ListItemListItemSections />
        <ListItemListItemSeparator />
        <TabbableChildren />
      </React.Fragment>
    );
  }
}
