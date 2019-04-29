import React from 'react';
import {
  Button,
  Coachmark,
} from '@collab-ui/react';

 export default class CoachmarkContent extends React.Component {
  state = {
    isOpen: true
  }

  render() {
    const { isOpen } = this.state;

    return (
      <Coachmark 
        isOpen={isOpen}
        contentNode={<div>contentNode prop(node)</div>}
        direction='bottom-center'
        ariaLabel='Open Coachmark'
      >
        <Button ariaLabel='test' onClick={() => this.setState({ isOpen: !isOpen })}>Coachmark Anchor</Button>
      </Coachmark>
    );
  }
}