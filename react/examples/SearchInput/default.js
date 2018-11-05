import React from 'react';
import { SearchInput } from '@collab-ui/react';
export default class DefaultSearchInput extends React.PureComponent {
  render() {
    return (
      <div className='row'>
        <SearchInput
          name='defaultSearchInput'
          htmlId='defaultSearchInput'
          inputSize='small-5'
        />
      </div>
    );
  }
}