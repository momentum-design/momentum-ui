import React from 'react';
import { Input } from '@momentum-ui/react';

export default function InputNested() {
  return (
    <Input
      name='inputNested'
      label='Nested 1'
      htmlId='inputNested'
      containerSize='medium-6'
      nestedLevel={1}
    />
  );
}