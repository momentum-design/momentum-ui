import React from 'react';
import { Icon } from '@collab-ui/react';
export default class Default extends React.PureComponent {
  render() {
    return(
      <div>
        <Icon name='accessories_16' color='blue' />
        <Icon name='accessories_20' color='blue' />
        <Icon name='accessories_36' color='blue' />
        <Icon name='accessories_56' color='blue' />
      </div>
    );
  }
}