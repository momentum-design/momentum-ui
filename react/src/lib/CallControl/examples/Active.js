import React from 'react';
import { CallControl } from '@momentum-ui/react';
export default function CallControlActive() {
  return(
    <CallControl
      type='microphone-muted'
      active
      onClick={() => { }}
      ariaLabel='For the Win'
    />
  );
}
