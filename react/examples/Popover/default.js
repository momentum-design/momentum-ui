import React from 'react';
import {
  Button,
  Popover,
} from '@collab-ui/react';
 export default function Default() {
  const content = (
    <span key="1" style={{ padding: '10px' }}>Popover Top</span>
  );
  return (
    <div className='row'>
      <div className="docs-example docs-example--spacing">
        <h3>
          Props
          <p><code className="small">direction=(top-center)</code></p>
          <p><code className="small">{'targetOffset=({vertical: 10})'}</code></p>
        </h3>
        <Popover content={content} direction={'top-center'} targetOffset={{vertical: 10}}>
          <Button children='Hover' ariaLabel='Hover' />
        </Popover>
      </div>
      <div className="docs-example docs-example--spacing">
        <h3>
          Props
          <p><code className="small">delay=(500)</code></p>
          <p><code className="small">direction=(top-center)</code></p>
        </h3>
        <Popover content={content} delay={500} direction={'top-center'}>
          <Button children='Hover with Delay' ariaLabel='Hover with Delay' />
        </Popover>
      </div>
    </div>
  );
}