import React from 'react';
import {
  SpaceListItemDefault,
  SpaceListItemSpaceListMeeting,
} from './index';

export default class SpaceListItemKitchenSink extends React.Component {
  render() {
    return (
      <React.Fragment>
        <SpaceListItemDefault />
        <SpaceListItemSpaceListMeeting />
      </React.Fragment>
    );
  }
}
