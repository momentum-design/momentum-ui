import React from 'react';
import { InputSearch } from '@momentum-ui/react';

export default function DefaultInputSearch() {
  return (
    <InputSearch
      clear
      label='Default Search Input'
      name='defaultSearchInput'
      htmlId='defaultSearchInput'
      containerSize='medium-6'
    />
  );
}
