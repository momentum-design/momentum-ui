import React from 'react';
 import {
  Button,
  Popover
} from '@momentum-ui/react';
 export default function PopoverOverflow() {
  const tall = (
    <span key="1" style={{ height: '3000px' }}>Popover(height: 3000px)</span>
  );
  return (
    <div
      className="docs-example docs-example--spacing"
      style={{
        border: '2px solid #666666',
        width: '100%',
        height: '500px',
        overflow: 'scroll',
        padding: '125px'
      }}
    >
      <Popover
        isContained={true}
        checkOverflow
        content={tall}
        direction={'bottom-center'}
        popoverTrigger={'Click'}
      >
        <Button id='overflow' children='Tall' ariaLabel='Tall' />
      </Popover>
    </div>
  );
}
