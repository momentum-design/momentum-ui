import React from 'react';
import { Input } from '@momentum-ui/react';

export default function InputReadonly() {
  return (
    <Input
      name='inputReadonly'
      label='Read Only Input'
      htmlId='inputReadonly'
      inputSize='medium-6'
      value='Read Only Text'
      readOnly
    />
  );
}
