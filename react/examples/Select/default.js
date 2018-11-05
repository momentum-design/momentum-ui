import React from 'react';
import { Select, SelectOption } from '@collab-ui/react';
export default class DefaultSelect extends React.PureComponent {
  render() {
    return (
      <div className="medium-6 columns">
        <Select defaultValue='Select Item Here' >
          <SelectOption value='test1' label='test1' />
          <SelectOption value='test2' label='test2' />
          <SelectOption value='test3' label='test3' />
          <SelectOption value='test4' label='test4' />
        </Select>
      </div>
    );
  }
}