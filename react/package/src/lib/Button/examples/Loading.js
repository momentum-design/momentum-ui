import React from 'react';
import { Button } from '@momentum-ui/react';
export default function ButtonLoading() {
  return(
    <Button
      children='Test Me'
      onClick={() => {}}
      ariaLabel='Test'
      loading
    />
  );
}
