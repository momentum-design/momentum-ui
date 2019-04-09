import React from 'react';
import { Button, Tooltip } from '@collab-ui/react';

export default function TooltipContent() {
  const content = (
    <span style={{ color: 'white', padding: '16px' }}> content! </span>
  );

  return (
    <div className="docs-example docs-example--spacing">
      <Tooltip
        tooltip="Hello!"
        tooltipTrigger="Click"
        popoverProps={{
          direction: 'right-center',
          content,
        }}
      >
        <Button children="Content" ariaLabel="Content" />
      </Tooltip>
    </div>
  );
}
