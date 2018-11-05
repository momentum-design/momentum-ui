import React from 'react';
import { Radio } from '@collab-ui/react';
export default function CheckedRadio() {
  return (
    <Radio
      value='checkedRadio'
      label='Checked Radio'
      htmlId='checkedRadio'
      checked
      onChange={()=>{}}
    />
  );
}