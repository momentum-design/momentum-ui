import React from 'react';
import { Button, Tooltip } from '@momentum-ui/react';

export default function TooltipDirection() {
  return (
    <div>
      <div className="docs-example docs-example--spacing">
        <Tooltip
          tooltip="Hello!"
          tooltipTrigger="Click"
          popoverProps={{ direction: 'right-center' }}
        >
          <Button id='direction' children="Direction right" ariaLabel="Direction" />
        </Tooltip>
      </div>
      <div className="docs-example docs-example--spacing">
        <Tooltip
          tooltip="Hello!"
          tooltipTrigger="Click"
          popoverProps={{ direction: 'right-center', isContained: true }}
        >
          <Button id='direction' children="Direction right - contained" ariaLabel="Direction" />
        </Tooltip>
      </div>
      <div className="docs-example docs-example--spacing">
        <Tooltip
          tooltip="Hello!"
          tooltipTrigger="Click"
          popoverProps={{ direction: 'left-center', isContained: true }}
        >
          <Button id='direction' children="Direction left" ariaLabel="Direction" />
        </Tooltip>
      </div>
      <div className="docs-example docs-example--spacing">
        <Tooltip
          tooltip="Hello!"
          tooltipTrigger="Click"
          popoverProps={{ direction: 'left-center', isContained: true }}
        >
          <Button id='direction' children="Direction left - contained" ariaLabel="Direction" />
        </Tooltip>
      </div>
      <div className="docs-example docs-example--spacing">
        <Tooltip
          tooltip="Hello!"
          tooltipTrigger="Click"
          popoverProps={{ direction: 'top-center'}}
        >
          <Button id='direction' children="Direction top" ariaLabel="Direction" />
        </Tooltip>
      </div>
      <div className="docs-example docs-example--spacing">
        <Tooltip
          tooltip="Hello!"
          tooltipTrigger="Click"
          popoverProps={{ direction: 'top-center', isContained: true }}
        >
          <Button id='direction' children="Direction top - contained" ariaLabel="Direction" />
        </Tooltip>
      </div>
      <div className="docs-example docs-example--spacing">
        <Tooltip
          tooltip="Hello!"
          tooltipTrigger="Click"
          popoverProps={{ direction: 'bottom-center'}}
        >
          <Button id='direction' children="Direction bottom" ariaLabel="Direction" />
        </Tooltip>
      </div>
      <div className="docs-example docs-example--spacing">
        <Tooltip
          tooltip="Hello!"
          tooltipTrigger="Click"
          popoverProps={{ direction: 'bottom-center', isContained: true }}
        >
          <Button id='direction' children="Direction bottom - contained" ariaLabel="Direction" />
        </Tooltip>
      </div>
      <div className="docs-example docs-example--spacing" style={{position: 'fixed', right: 0, padding: '0 !important'}}>
        <Tooltip
          tooltip="Hello!"
          tooltipTrigger="Click"
          popoverProps={{ direction: 'bottom-center', isContained: true }}
        >
          <div style={{width: "1rem"}}>X</div>
        </Tooltip>
      </div>
      <div className="docs-example docs-example--spacing" style={{position: 'fixed', left: 0, padding: '0 !important'}}>
        <Tooltip
          tooltip="Hello!"
          tooltipTrigger="Click"
          popoverProps={{ direction: 'bottom-center', isContained: true }}
        >
          <div style={{width: "1rem"}}>X</div>
        </Tooltip>
      </div>
    </div>
  );
}
