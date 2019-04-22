import React from 'react';
import { Button } from '@momentum-ui/react';
export default function ButtonDisabled() {
  return(
    <Button
      children='Test Me'
      onClick={() => { }}
      ariaLabel='For the Win'
      disabled
    />
  );
}
