import React from 'react';
import { Button, Tooltip } from '@momentum-ui/react';

export default function TooltipDirection() {
  return (
    <div className="docs-example docs-example--spacing">
      <Tooltip
        tooltip="Hello!"
        tooltipTrigger="Click"
        popoverProps={{ direction: 'right-center' }}
      >
        <Button id='direction' children="Direction" ariaLabel="Direction" />
      </Tooltip>
    </div>
  );
}
