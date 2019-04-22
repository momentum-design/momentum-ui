import React from 'react';
import { Button, Tooltip } from '@momentum-ui/react';

export default function TooltipDefault() {
  return (
    <div className="row">
      <div className="docs-example docs-example--spacing">
        <Tooltip tooltip="Hello!" tooltipTrigger="Click">
          <Button children="Click" ariaLabel="Click" />
        </Tooltip>
      </div>

      <div className="docs-example docs-example--spacing">
        <Tooltip tooltip="Hello!" tooltipTrigger="MouseEnter">
          <Button children="MouseEnter" ariaLabel="MouseEnter" />
        </Tooltip>
      </div>

      <div className="docs-example docs-example--spacing">
        <Tooltip tooltip="Hello!" tooltipTrigger="Focus">
          <Button children="Focus" ariaLabel="Focus" />
        </Tooltip>
      </div>
    </div>
  );
}
