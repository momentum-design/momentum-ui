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
          containerSize='medium-6'
          placeholder='Placeholder Text'
        />
      </div>
      <div className='row'>
        <Input
          name='filledInput'
          label='Filled Input'
          htmlId='filledInput'
          containerSize='medium-6'
          placeholder='Placeholder Text'
          isFilled
        />
      </div>
    </React.Fragment>
  );
}
