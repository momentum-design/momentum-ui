import React from 'react';
import { Radio } from '@momentum-ui/react';
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
