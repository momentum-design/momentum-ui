import React from 'react';
import { Checkbox } from '@collab-ui/react';
export default function CheckboxIndeterminate() {
  return (
    <Checkbox
      value='indeterminate'
      label='Indeterminate Checkbox'
      htmlId='indeterminateCheckbox'
      onChange={()=>{}}
      indeterminate
    />
  );
}