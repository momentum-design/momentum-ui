import React from 'react';
import { Input } from '@momentum-ui/react';

export default function InputClear() {
  return (
    <Input
      name='clearInput'
      label='Input with clear'
      htmlId='clearInput'
      containerSize='medium-6'
      placeholder='Placeholder Text'
      value='Press or click the clear icon to clear this input'
      clear
    />
  );
}
