import React from 'react';
import {
  TabsDefault,
  TabsJustified,
} from './index';

export default class TabsKitchenSink extends React.Component {
  render() {
    return (
      <React.Fragment>
        <TabsDefault />
        <TabsJustified />
      </React.Fragment>
    );
  }
}
