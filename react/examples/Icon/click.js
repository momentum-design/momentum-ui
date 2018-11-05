import React from 'react';
import { Icon } from '@collab-ui/react';
export default class Default extends React.PureComponent {
  render() {
    return(
      <div>
        <Icon name='accessories_16' color='blue' ariaLabel='Accessories' onClick={() => console.log('Icon 16 - clicked')} />
        <Icon name='accessories_20' color='blue' ariaLabel='Accessories' onClick={() => console.log('Icon 20 - clicked')} />
        <Icon name='accessories_36' color='blue' ariaLabel='Accessories' onClick={() => console.log('Icon 36 - clicked')} />
        <Icon name='accessories_56' color='blue' ariaLabel='Accessories' onClick={() => console.log('Icon 56 - clicked')} />
      </div>
    );
  }
}