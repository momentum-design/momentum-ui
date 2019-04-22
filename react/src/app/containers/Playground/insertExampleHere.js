import React from 'react';

// Import Method Show Below
import { CollapseButton } from '@momentum-ui/react';

// Sample Class Method Show Below
export default class PlaygroundComponent extends React.Component {
  render() {
    return (
      <React.Fragment>
        <CollapseButton />
        <CollapseButton collapse={false} />
      </React.Fragment>
    );
  }
}
