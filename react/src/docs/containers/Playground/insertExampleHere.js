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

        <div className="medium-6 columns">
            <Select defaultValue='Select Item Here' >
                <SelectOption value='ben' label='test1' />
                <SelectOption value='dunit' label='test2' />
                <SelectOption value='paul' label='test3' />
            </Select>
        </div>
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
