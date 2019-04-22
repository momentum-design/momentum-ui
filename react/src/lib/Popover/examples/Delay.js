import React from 'react';
 import {
  Button,
  Popover,
} from '@momentum-ui/react';
 export default function PopOverDelay() {
    const contentDelay = (
      <span key="1" style={{ padding: '10px'}}>Delayed</span>
    );
    return (
      <div className="docs-example docs-example--spacing">
        <Popover
          content={contentDelay}
          delay={500}
        >
          <Button children='Hover with Delay' ariaLabel='Hover with Delay' />
        </Popover>
      </div>
    );
}
