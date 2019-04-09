import React from 'react';
import { Button, Tooltip } from '@collab-ui/react';

export default function TooltipDelay() {
  return (
    <div className="row">
      <div className="docs-example docs-example--spacing">
        <Tooltip
          tooltip="Delayed!"
          tooltipTrigger="Click"
          popoverProps={{ delay: 500 }}
        >
          <Button children="Delay" ariaLabel="Delay" />
        </Tooltip>
      </div>
    </div>
  );
}
