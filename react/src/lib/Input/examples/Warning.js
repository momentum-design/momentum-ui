import React from 'react';
import { Input } from '@momentum-ui/react';

export default function InputWarning() {
  return (
    <Input
      name='inputWarning'
      label='Warning Input'
      htmlId='inputWarning'
      inputSize='small-12 medium-6'
      messageArr={[
        {
          message: 'This is where the warning message would be.',
          type: 'warning',
        },
      ]}
      value='Warning Text'
    />
  );
}
