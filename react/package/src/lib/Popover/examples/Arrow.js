import React from 'react';
 import {
  Button,
  Popover
} from '@momentum-ui/react';
 export default function PopoverArrow() {
  const contentArrow = (
    <span key="1" style={{ padding: '10px'}}>Arrow</span>
  );
  return (
    <div className="docs-example docs-example--spacing">
      <Popover
        content={contentArrow}
        direction={'right-center'}
        showArrow={true}
      >
        <Button id='arrow' children='showArrow' ariaLabel='showArrow' />
      </Popover>
    </div>
  );
}
