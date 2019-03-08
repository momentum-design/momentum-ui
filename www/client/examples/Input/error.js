import React from 'react';
import { Input } from '@collab-ui/react';
export default function InputError() {
  return (
    <Input
      name='inputError'
      label='Error (Error) Input'
      htmlId='inputError'
      inputSize='small-5'
      errorArr={ [{error: 'This is where the error message would be.', type: 'error'}] }
    />
  );
}