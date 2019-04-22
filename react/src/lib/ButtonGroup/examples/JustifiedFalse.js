import React from 'react';
 import { Button, ButtonGroup } from '@momentum-ui/react';
 export default class ButtonGroupJustifiedFalse extends React.PureComponent {
  render() {
    return(
      <ButtonGroup justified={false}>
        <Button ariaLabel='1'>one</Button>
        <Button ariaLabel='2' disabled>two</Button>
        <Button ariaLabel='3'>three</Button>
      </ButtonGroup>
    );
  }
}
