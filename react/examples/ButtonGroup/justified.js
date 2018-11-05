import React from 'react';
 import { Button, ButtonGroup } from '@collab-ui/react';
 export default class NonJustifiedButtonGroup extends React.PureComponent {
  render() {
    return(
    <div className='columns large'>
      <ButtonGroup justified={false}>
        <Button ariaLabel='1'>one</Button>
        <Button ariaLabel='2' disabled>two</Button>
        <Button ariaLabel='3'>three</Button>
      </ButtonGroup>
    </div>
    );
  }
}