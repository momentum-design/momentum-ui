import React from 'react';
import { Input } from '@collab-ui/react';
export default function InputReadonly() {
  return (
    <div className='row'>
      <Input
        name='inputReadonly'
        label='Read Only Input'
        htmlId='inputReadonly'
        inputSize='small-5'
        value='Read Only Text'
        readOnly
      />
    </div>
  );
}