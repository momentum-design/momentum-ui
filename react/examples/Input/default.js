import React from 'react';
import { Input } from '@collab-ui/react';
export default class Default extends React.PureComponent {
  render() {
    return (
      <div className='row'>
      <Input
        name='defaultInput'
        label='Default Input'
        htmlId='defaultInput'
        inputSize='small-5'
        placeholder='Placeholder Text'
      />
    </div>
    );
  }
}