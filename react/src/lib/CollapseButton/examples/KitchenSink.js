import React from 'react';
import {
  CollapseButtonCollapsed,
  CollapseButtonExpanded,
} from './index';

export default class CollapseButtonKitchenSink extends React.Component {
  render() {
    return (
      <React.Fragment>
        <CollapseButtonCollapsed />
        <CollapseButtonExpanded />
      </React.Fragment>
    );
  }
}
