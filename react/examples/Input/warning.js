import React from 'react';
import { Input } from '@collab-ui/react';
export default function InputError() {
  return (
    <div className='row'>
      <Input
        name='inputWarning'
        label='Error (Warning) Input'
        htmlId='inputWarning'
        inputSize='small-5'
        errorArr={ [{error: 'This is where the warning message would be.', type: 'warning'}] }
      />
    </div>
  );
}