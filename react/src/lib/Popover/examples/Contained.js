import React from 'react';
 import {
  Button,
  Popover
} from '@momentum-ui/react';
 export default function PopoverContained() {
  const tall = (
    <span key="1" style={{ height: '3000px' }}>Popover(height: 3000px)</span>
  );
  return (
    <Popover
      isContained
      content={tall}
      direction={'bottom-center'}
      popoverTrigger={'Click'}
    >
      <Button children='Tall' ariaLabel='Tall' />
    </Popover>
  );
}
