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
            <p><code className="small">direction=(top-center)</code></p>
          </h3>
          <Tooltip
            tooltip='Hey There good buddy'
            direction='top-center'
          >
            <Button
              children='Hover Top'
              ariaLabel='Hover Top'
            />
          </Tooltip>
        </div>
     </div>
   );
 }