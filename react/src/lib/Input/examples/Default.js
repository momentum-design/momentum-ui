import React from 'react';
import { Input } from '@momentum-ui/react';

export default function InputDefault() {
  return (
    <React.Fragment>
      <div className='row'>
        <Input
          name='defaultInput'
          label='Default Input'
          htmlId='defaultInput'
          inputSize='medium-6'
          placeholder='Placeholder Text'
        />
      </div>
      <div className='row'>
        <Input
          name='filledInput'
          label='Filled Input'
          htmlId='filledInput'
          inputSize='medium-6'
          placeholder='Placeholder Text'
          isFilled
        />
      </div>
    </React.Fragment>
  );
}
