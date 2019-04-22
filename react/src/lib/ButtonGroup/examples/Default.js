import React from 'react';
 import { Button, ButtonGroup } from '@momentum-ui/react';
 export default class ButtonGroupDefault extends React.PureComponent {
  render() {
    return(
      <ButtonGroup>
        <Button ariaLabel='1'>one</Button>
        <Button ariaLabel='2' disabled>two</Button>
        <Button ariaLabel='3'>three</Button>
      </ButtonGroup>
    );
  }
}
