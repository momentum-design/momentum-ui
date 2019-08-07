import React from 'react';
import { Input } from '@momentum-ui/react';
export default function InputSuccess() {
  return (
    <Input
      name="inputSuccess"
      label="Error (Success) Input"
      htmlId="inputSuccess"
      inputSize="small-5"
      messageArr={[
        {
          message: 'This is where the success message would be.',
          type: 'success',
        },
      ]}
    />
  );
}
