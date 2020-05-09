import React from 'react';
import {
  SidebarDark,
  SidebarDefault,
  SidebarPageLevel,
  SidebarWithIcons,
} from './index';

export default class SidebarKitchenSink extends React.Component {
  render() {
    return (
      <React.Fragment>
        <SidebarDark />
        <SidebarDefault />
        <SidebarPageLevel />
        <SidebarWithIcons />
      </React.Fragment>
    );
  }
}
