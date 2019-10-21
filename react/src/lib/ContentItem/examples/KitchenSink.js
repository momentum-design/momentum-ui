import React from 'react';
import {
  ContentItemAspect,
  ContentItemDefault,
  ContentItemFailed,
  ContentItemFile,
  ContentItemIcon,
  ContentItemSize,
  ContentItemSpinner,
} from './index';

export default class ContentItemKitchenSink extends React.Component {
  // GIF example not included due to snapshot
  render() {
    return (
      <React.Fragment>
        <ContentItemAspect />
        <ContentItemDefault />
        <ContentItemFailed />
        <ContentItemFile />
        <ContentItemIcon />
        <ContentItemSize />
        <ContentItemSpinner />
      </React.Fragment>
    );
  }
}
