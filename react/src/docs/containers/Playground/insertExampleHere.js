import React from 'react';
import ErrorBoundary from '@collab-ui/react/ErrorBoundary';
import ErrorContainer from '../ErrorContainer';

// Import Method Show Below
import { Input } from '@collab-ui/react';

export default class PlaygroundComponent extends React.Component {
  state = {
    value: ''
  };

  handleChange = (event) => {
    this.setState({value: event.target.value});
  }

  render() {
    return (
      <div>
        <Input
          type="text"
          htmlId="clearTest"
          name="clearTest"
          label="This is an input with clear Button"
          inputSize="small-6"
          value={this.state.value}
          onChange={this.handleChange}
          clear
        />
        <h1>Input value is: {this.state.value}</h1>
      </div>
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
