import React from 'react';
import { Checkbox } from '@collab-ui/react';
export default function CheckboxChecked() {
  return (
    <Checkbox
      value='checked'
      label='Checked Checkbox'
      htmlId='checkedCheckbox'
      checked
      onChange={()=>{}}
    />
  );
}