import React from 'react';
import { CallControl } from '@momentum-ui/react';
export default function CallControlCancel() {
  return(
    <CallControl
      type='cancel'
      active
      onClick={() => {}}
      ariaLabel='Cancel'
    />
  );
}
