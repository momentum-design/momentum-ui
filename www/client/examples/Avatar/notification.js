import React from 'react';
import { Avatar } from '@collab-ui/react';
 export default class AvatarNotification extends React.PureComponent {
  render() {
    return (
      <Avatar title="Tom Smith" hasNotification />
    );
  }
}