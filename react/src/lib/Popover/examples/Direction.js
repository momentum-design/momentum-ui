import React from 'react';
 import {
  Button,
  Popover
} from '@momentum-ui/react';
 export default function PopOverDirection() {
    const content = (
    <span key="1" style={{ padding: '10px'}}>right-center</span>
  );
  return (
    <div className="docs-example docs-example--spacing">
      <Popover
        content={content}
        direction={'right-center'}
      >
        <Button id='direction' children='Direction' ariaLabel='Direction' />
      </Popover>
    </div>
  );
}
