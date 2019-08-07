import React from 'react';
import { Input } from '@momentum-ui/react';

export default function InputDisabled() {
  return (
    <Input
      name='inputDisabled'
      label='Disabled Input'
      htmlId='inputDisabled'
      inputSize='medium-6'
      value='Disabled Text'
      disabled
    />
  );
}
