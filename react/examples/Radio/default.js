import React from 'react';
import {
  InputHelper,
  Radio,
  RadioGroup,
} from '@collab-ui/react';
export default class DefaultRadio extends React.Component {
  render() {
    return (
      <div className='row'>
        <h3>Radio Button Group</h3>
        <br />
        <RadioGroup>
          <Radio
            value='me'
            label='me'
            htmlId='testCheckbox1'
            onChange={()=>{}}
            inputRef={ref=>this.input=ref}
          />
          <Radio
            value='you'
            label='you'
            htmlId='testCheckbox2'
            onChange={()=>{}}
          />
          <Radio
            value='us'
            label='us'
            htmlId='testCheckbox3'
            onChange={()=>{}}
          >
            <InputHelper message={'I\'m here to help'} />
          </Radio>
        </RadioGroup>
      </div>
    )
  }
}