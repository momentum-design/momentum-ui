import React from 'react';
import { Avatar } from '@collab-ui/react';
 export default class AvatarComposite extends React.PureComponent {
  render() {
    return (
      <CompositeAvatar size={40}>
        <Avatar title="Tom Smith"/>
        <Avatar title="John William"/>
      </CompositeAvatar>
    );
  }
}