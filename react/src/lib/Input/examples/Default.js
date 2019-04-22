import React from 'react';
import { Input } from '@momentum-ui/react';
export default class InputDefault extends React.PureComponent {
  render() {
    return (
      <Input
        name='defaultInput'
        label='Default Input'
        htmlId='defaultInput'
        inputSize='small-5'
        placeholder='Placeholder Text'
      />
    );
  }
}
