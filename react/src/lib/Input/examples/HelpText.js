import React from 'react';
import { Input } from '@momentum-ui/react';

export default function InputHelpText() {
  return (
    <Input
      name='inputHelpText'
      label='Help Text Input'
      htmlId='inputHelpText'
      inputSize='medium-6'
      inputHelpText='This is help text for the input.'
      placeholder='With Placeholder'
    />
  );
}
