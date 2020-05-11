import React from 'react';
import {
  MenuCustomMenuItems,
  MenuDefault,
  MenuSubMenu,
} from './index';

export default class MenuKitchenSink extends React.Component {
  render() {
    return (
      <React.Fragment>
        <MenuCustomMenuItems />
        <MenuDefault />
        <MenuSubMenu />
      </React.Fragment>
    );
  }
}
