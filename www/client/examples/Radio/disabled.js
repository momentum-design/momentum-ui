import React from 'react';
import { Radio } from '@collab-ui/react';
export default function DisabledRadio() {
  return (
    <Radio
      value='disabledRadio'
      label='Disabled Radio'
      htmlId='disabledRadio'
      disabled
      onChange={()=>{}}
    />
  );
}