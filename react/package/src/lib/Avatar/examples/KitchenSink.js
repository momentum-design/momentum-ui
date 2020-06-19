import React from 'react';
import {
  AvatarActive,
  AvatarBot,
  AvatarComposite,
  AvatarDefault,
  AvatarFailure,
  AvatarGroup,
  AvatarInactive,
  AvatarNotification,
  AvatarSelf,
  AvatarStatus,
  AvatarTyping,
} from './index';

export default class AvatarKitchenSink extends React.Component {
  render() {
    return (
      <React.Fragment>
        <AvatarActive />
        <AvatarBot />
        <AvatarComposite />
        <AvatarDefault />
        <AvatarFailure />
        <AvatarGroup />
        <AvatarInactive />
        <AvatarNotification />
        <AvatarSelf />
        <AvatarStatus />
        <AvatarTyping />
      </React.Fragment>
    );
  }
}
