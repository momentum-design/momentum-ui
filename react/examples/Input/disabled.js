import React from 'react';
import { Input } from '@collab-ui/react';
export default function InputDisabled() {
  return (
    <div className='row'>
      <Input
        name='inputDisabled'
        label='Disabled Input'
        htmlId='inputDisabled'
        inputSize='small-5'
        value='Disabled Text'
        disabled
      />
    </div>
  );
}