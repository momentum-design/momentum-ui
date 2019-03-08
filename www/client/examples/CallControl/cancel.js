import React from 'react';
import { CallControl } from '@collab-ui/react';
export default function CallControlCancel() {
  return(
    <CallControl
      type='cancel'
      active
      onClick={() => {}}
      ariaLabel='For the Win'
    />
  );
}