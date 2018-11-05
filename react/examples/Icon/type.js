import React from 'react';
import { Icon } from '@collab-ui/react';
export default class Default extends React.PureComponent {
  render() {
    return(
      <div>
        <div className='row'>
          <div>Default</div>
          <div style={{padding: '5px'}}>
            <Icon name='clear-active_24' ariaLabel='Clear' onClick={() => console.log('Icon 20 - clicked')} />
          </div>
        </div>
        <div className='row'>
          <div>Type(white)</div>
          <div style={{ backgroundColor: 'black', padding: '5px', width: 'fit-content'}}>
            <Icon name='clear-active_24' ariaLabel='Clear' type='white' onClick={() => console.log('Icon 36 - clicked')} />
          </div>
        </div>
      </div>
    );
  }
}