import React from 'react';
import { Input } from '@momentum-ui/react';

export default function InputTextArea() {
  return (
    <Input
      name='inputTextArea'
      label='Multiline'
      htmlId='inputTextArea'
      inputSize='medium-6'
      multiline
    />
  );
}