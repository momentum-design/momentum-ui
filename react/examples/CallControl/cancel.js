import React from 'react';
import { CallControl } from '@collab-ui/react';
export default function CallControlCancel() {
  return(
      <div className='row'>
      <div className="docs-example docs-example--spacing">
        <h3>
          <p><code className="small">type=(cancel)</code></p>
        </h3>
        <CallControl
          type='cancel'
          active
          onClick={() => {}}
          ariaLabel='For the Win'
        />
      </div>
      (With Contrast)
      <div className="docs-example docs-example--spacing cui--contrast">
        <h3>
          <p><code className="small">type=(cancel)</code></p>
        </h3>
        <CallControl
          type='cancel'
          active
          onClick={() => {}}
          ariaLabel='For the Win'
        />
      </div>
    </div>
  );
}