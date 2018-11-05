import React from 'react';
 import { Button, ButtonGroup } from '@collab-ui/react';
 export default class SpaceListButtonGroup extends React.PureComponent {
  render() {
    return(
    <div className='columns large' style={{background: 'black', padding: '20px'}}>
      <ButtonGroup theme="dark">
        <Button ariaLabel='Spaces'>Spaces</Button>
        <Button ariaLabel='Messages'>Messages</Button>
      </ButtonGroup>
    </div>
    );
  }
}