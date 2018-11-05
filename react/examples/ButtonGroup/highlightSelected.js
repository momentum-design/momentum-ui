import React from 'react';
 import { Button, ButtonGroup, Icon } from '@collab-ui/react';
 export default class CalendarButtonGroup extends React.PureComponent {
  render() {
    return(
    <div className='columns small-3'>
      <ButtonGroup justified={false} highlightSelected={false}>
        <Button ariaLabel='Left'><Icon name='icon-arrow-left_12' /></Button>
        <Button ariaLabel='Today'>Today</Button>
        <Button ariaLabel='Right'><Icon name='icon-arrow-right_12' /></Button>
      </ButtonGroup>
    </div>
    );
  }
}