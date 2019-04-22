import React from 'react';
import { Button } from '@momentum-ui/react';
export default function ButtonExpand() {
  return(
    <Button
      children='Test Me'
      onClick={() => { }}
      ariaLabel='For the Win'
      expand
    />
  );
}
