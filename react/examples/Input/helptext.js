import React from 'react';
import { Input } from '@collab-ui/react';
export default function InputHelp() {
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