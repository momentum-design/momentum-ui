import React from 'react';
import { Loading } from '@collab-ui/react';
export default function Default() {
  return (
    <div className="row">
      <div className="docs-example docs-example--spacing" style={{fontSize: '1rem', display: 'flex'}}>
        <Loading />
      </div>
      <div className="docs-example docs-example--spacing" style={{fontSize: '2rem', display: 'flex'}}>
        <Loading />
      </div>
      <div className="docs-example docs-example--spacing" style={{fontSize: '3rem', display: 'flex'}}>
        <Loading />
      </div>
    </div>
  );
}