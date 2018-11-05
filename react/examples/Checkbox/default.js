import React from 'react';
import { Checkbox, CheckboxGroup, InputHelper } from '@collab-ui/react';
export default function DefaultCheckboxGroup() {
  return (
    <CheckboxGroup name='CheckboxGroup1'>
      <Checkbox
        value='me'
        label='me'
        htmlId='testCheckbox1'
        onChange={()=>{}}
      />
      <Checkbox
        value='you'
        label='you'
        htmlId='testCheckbox2'
        onChange={()=>{}}
      />
      <Checkbox
        value='us'
        label='us'
        htmlId='testCheckbox3'
        onChange={()=>{}}
      >
        <InputHelper message={'I\'m here to help'} className='cui-checkbox-help' />
      </Checkbox>
    </CheckboxGroup>
  );
}