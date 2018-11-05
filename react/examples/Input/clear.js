import React from 'react';
import { Input } from '@collab-ui/react';
export default class Clear extends React.PureComponent {
  state = {
    value: 'Press or click the clear icon to clear this input'
  };
  handleChange = (event) => {
    this.setState({value: event.target.value});
  }
  render() {
    return (
      <div className='row'>
      <Input
        name='clearInput'
        label='Input with clear'
        htmlId='clearInput'
        inputSize='small-5'
        placeholder='Placeholder Text'
        value={this.state.value}
        onChange={this.handleChange}
        clear
      />
    </div>
    );
  }
}