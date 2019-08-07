import React from 'react';
import { Input } from '@momentum-ui/react';

export default function InputDark() {
  return (
    <div className='md--dark' style={{ background: 'black' }}>
      <Input
        name='darkInput'
        label='Dark Input'
        htmlId='darkInput'
        inputSize='medium-6'
        placeholder='Placeholder Text'
      />
    </div>
  );
}
