import React from 'react';
 import {
  Button,
  Popover
} from '@collab-ui/react';
 export default function PopOverFocus() {
  const contentLeft = (
    <span key="1" style={{ padding: '10px'}}>Popover Left</span>
  );
  const contentRight = (
    <span key="1" style={{ padding: '10px'}}>Popover Right</span>
  );
  return (
    <div className='row'>
      <div className="docs-example docs-example--spacing">
        <h3>
          Props
          <p><code className="small">direction=(right-center)</code></p>
          <p><code className="small">popoverTrigger=(Focus)</code></p>
        </h3>
        <Popover
          content={contentRight}
          direction={'right-center'}
          popoverTrigger={'Focus'}
        >
          <Button
            children='Focus Right'
            ariaLabel='Focus Right'
          />
        </Popover>
      </div>
      <div className="docs-example docs-example--spacing">
        <h3>
          Props
          <p><code className="small">direction=(left-center)</code></p>
          <p><code className="small">popoverTrigger=(Focus)</code></p>
        </h3>
        <Popover
          content={contentLeft}
          direction={'left-center'}
          popoverTrigger={'Focus'}
        >
          <Button
            children='Focus Left'
            ariaLabel='Focus Left'
          />
        </Popover>
      </div>
    </div>
  );
}