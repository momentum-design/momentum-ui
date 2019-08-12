import React from 'react';
import { InputSearch } from '@momentum-ui/react';

export default function LoadingInputSearch() {
  return (
    <InputSearch
      clear
      htmlId='loadingSearchInput'
      containerSize='medium-6'
      isLoading
      label='Loading Search Input'
      name='loadingSearchInput'
    />
  );
}
