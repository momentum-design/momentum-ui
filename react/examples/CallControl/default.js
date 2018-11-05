import React from 'react';
import { CallControl } from '@collab-ui/react';
export default function CallControlDefault() {
  return(
    <div className='row'>
      <div className="docs-example docs-example--spacing">
        <h3>
          <p><code className="small">type=(microphone-muted)</code></p>
          <p><code className="small">size=(20)</code></p>
          <p><code className="small">iconSize=(10)</code></p>
        </h3>
        <CallControl
          type='microphone-muted'
          ariaLabel='For the Win'
          size={20}
          iconSize={10}
        />
      </div>
      <div className="docs-example docs-example--spacing">
        <h3>
          <p><code className="small">type=(microphone-muted)</code></p>
          <p><code className="small">size=(40)</code></p>
          <p><code className="small">iconSize=(16)</code></p>
        </h3>
        <CallControl
          type='microphone-muted'
          ariaLabel='For the Win'
          size={40}
          iconSize={16}
        />
      </div>
      <div className="docs-example docs-example--spacing">
        <h3>
          <p><code className="small">type=(microphone-muted)</code></p>
        </h3>
        <CallControl
          type='microphone-muted'
          ariaLabel='For the Win'
        />
      </div>
    </div>
  );
}