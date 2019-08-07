import React from 'react';
import { SearchInput } from '@momentum-ui/react';
export default class PillSearchInput extends React.PureComponent {
  render() {
    return (
      <SearchInput
        name='pillSearchInput'
        htmlId='pillSearchInput'
        shape='pill'
        inputSize='small-5'
      />
    );
  }
}
