import React from 'react';
import { CallControl } from '@collab-ui/react';
export default function CallControlDisabled() {
  return(
     <div className='row'>
      <div className="docs-example docs-example--spacing">
        <h3>
          <p><code className="small">disabled=(true)</code></p>
        </h3>
        <CallControl
          type='microphone-muted'
          disabled
          onClick={() => {}}
          ariaLabel='For the Win'
        />
      </div>
      <div className="docs-example docs-example--spacing cui--contrast">
        (With Contrast)
        <h3>
          <p><code className="small">disabled=(true)</code></p>
        </h3>
        <CallControl
          type='microphone-muted'
          disabled
          onClick={() => {}}
          ariaLabel='For the Win'
        />
      </div>
    </div>
  );
}