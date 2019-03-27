import React from 'react';
import { Checkbox, CheckboxGroup } from '@collab-ui/react';
export default function CheckboxDefault() {
  return (
    <CheckboxGroup name='CheckboxGroup1'>
      <Checkbox
        value='me'
        label='me'
        htmlId='testCheckbox1'
        onChange={() => { }}
      />
    </CheckboxGroup>
  );
}
