import React from 'react';
import { Input } from '@momentum-ui/react';

export default function InputSuccess() {
  return (
    <Input
      name='inputSuccess'
      label='Success Input'
      htmlId='inputSuccess'
      inputSize='medium-6'
      messageArr={[
        {
          message: 'This is where the success message would be.',
          type: 'success',
        },
      ]}
      value='Success Text'
    />
  );
}
