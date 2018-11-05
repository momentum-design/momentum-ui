import React from 'react';
 import {
   Button,
   Tooltip,
 } from '@collab-ui/react';
 export default function TooltipDefault() {
   return (
     <div className='row'>
        <div className="docs-example docs-example--spacing">
          <h3>
            Props
            <p><code className="small">width=(500)</code></p>
            <p><code className="small">tooltipTrigger=(Click)</code></p>
          </h3>
          <Tooltip
            tooltip='Hey There good buddy'
            tooltipTrigger='Click'
            width={500}
          >
            <Button
              children='Click to Trigger'
              ariaLabel='Click to Trigger'
            />
          </Tooltip>
        </div>
     </div>
   );
 }