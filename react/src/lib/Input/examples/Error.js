import React from 'react';
import { Input } from '@momentum-ui/react';
export default function InputError() {
  return (
    <Input
      name="inputError"
      label="Error (Error) Input"
      htmlId="inputError"
      inputSize="small-5"
      messageArr={[
        { message: 'This is where the error message would be.', type: 'error' },
      ]}
    />
  );
}
