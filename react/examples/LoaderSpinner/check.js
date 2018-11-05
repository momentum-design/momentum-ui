import React from 'react';
import { Spinner } from '@collab-ui/react';
export default function Default() {
  return (
    <div className='row'>
      <div className="docs-example docs-example--spacing">
        <h3>
          <p><code className="small">size=(16)</code></p>
        </h3>
        <Spinner
          size={16}
          percentage={100}
          showCheck
        />
      </div>
      <div className="docs-example docs-example--spacing">
        <h3>
          <p><code className="small">size=(20)</code></p>
        </h3>
          <Spinner
            size={20}
            percentage={100}
            showCheck
          />
      </div>
      <div className="docs-example docs-example--spacing">
        <h3>
          <p><code className="small">size=(28)</code></p>
        </h3>
          <Spinner
            size={28}
            percentage={100}
            showCheck
          />
      </div>
      <div>
        <h3>
          <p><code className="small">size=(36)</code></p>
        </h3>
          <Spinner
            size={36}
            percentage={100}
            showCheck
          />
      </div>
    </div>
  );
}