import React from 'react';
import { Icon } from '@collab-ui/react';
export default class Default extends React.PureComponent {
  render() {
    return(
      <div style={{ backgroundColor: 'black', padding: '5px', width: 'fit-content' }}>
        <Icon
          name='clear-active_24'
          ariaLabel='Clear'
          type='white'
          onClick={() => console.log('Icon 36 - clicked')}
        />
      </div>
    );
  }
}