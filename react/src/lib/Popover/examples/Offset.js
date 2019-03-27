import React from 'react';
 import {
  Button,
  Popover
} from '@collab-ui/react';
 export default function PopoverOffset() {
  const contentOffset = (
    <span key="1" style={{ padding: '10px'}}>Offset</span>
  );
  return (
    <div className="docs-example docs-example--spacing">
      <Popover
        content={contentOffset}
        direction={'top-center'}
        targetOffset={{ vertical: 20 }}
      >
        <Button children='offset' ariaLabel='offset' />
      </Popover>
    </div>
  );
}