import React from 'react';
import { Input } from '@collab-ui/react';
export default function InputSecondary() {
  return (
    <div className='row'>
      <Input
        name='inputSecondaryLabel'
        label='Input with Secondary Label'
        htmlId='inputSecondaryLabel'
        inputSize='small-5'
        secondaryLabel='Secondary Label'
      />
    </div>
  );
}