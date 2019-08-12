import React from 'react';
import { InputSearch } from '@momentum-ui/react';

export default function PillInputSearch() {
  return (
    <InputSearch
      clear
      htmlId='pillSearchInput'
      containerSize='medium-6'
      name='pillSearchInput'
      shape='pill'
    />
  );
}
