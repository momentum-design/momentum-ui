import React from 'react';
 import { Button, ButtonGroup, Icon } from '@collab-ui/react';
 export default class IconButtonGroup extends React.PureComponent {
  render() {
    return(
    <div>
      <div className='columns small-4'>
        <ButtonGroup>
          <Button ariaLabel='left'><Icon name='icon-arrow-left_12' /></Button>
          <Button ariaLabel='right'><Icon name='icon-arrow-right_12' /></Button>
        </ButtonGroup>
      </div>
      <div className='columns small-4'>
        <ButtonGroup type='pill'>
          <Button ariaLabel='left'><Icon name='icon-flag_16' /></Button>
          <Button ariaLabel='right'><Icon name='icon-cancel_16' /></Button>
        </ButtonGroup>
      </div>
      <div className='columns small-4'>
        <ButtonGroup type='pill' pillWidth='60px'>
          <Button ariaLabel='left'><Icon name='icon-flag_16' /></Button>
        </ButtonGroup>
      </div>
    </div>
    );
  }
}