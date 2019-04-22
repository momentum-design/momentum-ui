import React from 'react';
import { Input } from '@momentum-ui/react';
export default function InputHelpText() {
  return (
    <div className='row'>
      <Input
        name='inputHelpText'
        label='Help Text Input'
        htmlId='inputHelpText'
        inputSize='small-5'
        inputHelpText='Help Text'
      />
    </div>
  );
}
