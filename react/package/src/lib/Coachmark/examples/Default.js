import React from 'react';
import {
  Button,
  Coachmark,
} from '@momentum-ui/react';

 export default class CoachmarkDefault extends React.Component {
  state = {
    isOpen: true
  }

  render() {
    const { isOpen } = this.state;

    return (
        <Coachmark
          isOpen={isOpen}
          maxWidth={272}
          buttonProps={{children: 'Default'}}
          header={`Header prop(node)`}
          subheader={`Subheader prop(node)`}
          direction='bottom-center'
          ariaLabel='Open Coachmark'
        >
          <Button ariaLabel='test' onClick={() => this.setState({ isOpen: !isOpen })}>Coachmark Anchor</Button>
        </Coachmark>
    );
  }
}