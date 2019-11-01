import React from 'react';
import { CallControl } from '@momentum-ui/react';
export default function CallControlDisabled() {
  return(
    <CallControl
      type='microphone-muted'
      disabled
      onClick={() => { }}
      ariaLabel='Mute microphone'
    />
  );
}
