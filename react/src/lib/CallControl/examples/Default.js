import React from 'react';
import { CallControl } from '@momentum-ui/react';
export default function CallControlDefault() {
  return(
      <div className='row'>
        <div className="docs-example docs-example--spacing">
          <CallControl
            type='microphone-muted'
            ariaLabel='For the Win'
            size={20}
            iconSize={10}
          />
        </div>
        <div className="docs-example docs-example--spacing">
          <CallControl
            type='microphone-muted'
            ariaLabel='For the Win'
            size={40}
            iconSize={16}
          />
        </div>
        <div className="docs-example docs-example--spacing">
          <CallControl
            type='microphone-muted'
            ariaLabel='For the Win'
          />
        </div>
      </div>
  );
}
