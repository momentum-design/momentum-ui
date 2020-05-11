import React from 'react';
import { Input } from '@momentum-ui/react';

export default function InputSecondary() {
  return (
    <Input
      name='inputSecondaryLabel'
      label='Input with Secondary Label'
      htmlId='inputSecondaryLabel'
      containerSize='medium-6'
      secondaryLabel='Secondary Label'
    />
  );
}
