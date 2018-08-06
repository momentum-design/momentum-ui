import React from 'react';
import ErrorBoundary from '@collab-ui/react/ErrorBoundary';
import ErrorContainer from '../ErrorContainer';
import { Select, SelectOption } from '@collab-ui/react';

// Import Method Show Below
// import { Button } from '@collab-ui/react';

export default class PlaygroundComponent extends React.Component {
  render() {
    return (
      <ErrorBoundary fallbackComponent={<ErrorContainer />}>
        <div />
      </ErrorBoundary>
    );
  }
}

// Sample Class Method Show Below
// export default class PlaygroundComponent extends React.Component {
//   render() {
//     return (
//       <Button label="Playground Button"/>
//     );
//   }
// }
