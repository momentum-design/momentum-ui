import React from 'react';
// Import Method Show Below
import { ActivityButton, Icon } from '@momentum-ui/react';

// Sample Class Method Show Below
export default class PlaygroundComponent extends React.Component {
  render() {
    return (
      <>
        <ActivityButton
          type={{
            color: 'blue',
            icon: (<Icon name="assign-privilege_20" />) }
          }
          ariaLabel="Assign Privilege"
          label="Assign Privilege"
          onClick={() => {}}
        />
      </>
    );
  }
}
