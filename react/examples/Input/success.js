import React from 'react';
import { Input } from '@collab-ui/react';
export default function InputError() {
  return (
    <div className='row'>
      <Input
        name='inputSuccess'
        label='Error (Success) Input'
        htmlId='inputSuccess'
        inputSize='small-5'
        errorArr={ [{error: 'This is where the success message would be.', type: 'success'}] }
      />
    </div>
  );
}