import React from 'react';
import { SearchInput } from '@collab-ui/react';
export default class PillSearchInput extends React.PureComponent {
  render() {
    return (
      <div className='row'>
        <SearchInput
          name='pillSearchInput'
          htmlId='pillSearchInput'
          type='pill'
          inputSize='small-5'
        />
      </div>
    );
  }
}