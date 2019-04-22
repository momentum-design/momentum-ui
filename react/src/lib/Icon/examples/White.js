import React from 'react';
import { Icon } from '@momentum-ui/react';
export default class Default extends React.PureComponent {
  render() {
    return(
      <div style={{ backgroundColor: '#000', padding: '5px', width: 'fit-content' }}>
        <Icon
          name='clear-active_24'
          ariaLabel='Clear'
          type='white'
          onClick={() => alert('Icon 36 - clicked')}
        />
      </div>
    );
  }
}
