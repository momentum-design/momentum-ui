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
            <p><code className="small">direction=(bottom-center)</code></p>
            <p><code className="small">tooltipTrigger=(Focus)</code></p>
          </h3>
          <Tooltip
            tooltip='Hey There good buddy'
            direction='bottom-center'
            tooltipTrigger='Focus'
          >
            <Button
              children='Focus Bottom'
              ariaLabel='Focus Bottom'
            />
          </Tooltip>
        </div>
     </div>
   );
 }