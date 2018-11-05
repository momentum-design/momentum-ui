import React from 'react';
import { Spinner } from '@collab-ui/react';
export default function Default() {
  return (
    <div className="row">
      <div className="docs-example docs-example--spacing">
        <h3>
          <p><code className="small">size=(16)</code></p>
        </h3>
        <Spinner size={16}/>
      </div>
      <div className="docs-example docs-example--spacing">
        <h3>
          <p><code className="small">size=(20)</code></p>
        </h3>
        <Spinner size={20}/>
      </div>
      <div className="docs-example docs-example--spacing">
        <h3>
          <p><code className="small">size=(28)</code></p>
        </h3>
        <Spinner size={28}/>
      </div>
      <div className="docs-example docs-example--spacing">
        <h3>
          <p><code className="small">Default size=(36)</code></p>
        </h3>
        <Spinner />
      </div>
      <div className="docs-example docs-example--spacing">
        <h3>
          <p><code className="small">color=(blue)</code></p>
        </h3>
        <Spinner color='blue'/>
      </div>
      <div className="docs-example docs-example--spacing cui--dark docs-example--dark">
        <h3>Dark Spinner</h3>
        <Spinner />
      </div>
      <div className="docs-example docs-example--spacing">
          <h3>
            <p><code className="small">percentage=(65)</code></p>
          </h3>
          <Spinner percentage={65}/>
      </div>
    </div>
  );
}