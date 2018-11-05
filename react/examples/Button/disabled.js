import React from 'react';
import { Button } from '@collab-ui/react';
export default function ButtonDisabled() {
  return(
    <div className='row' style={{marginBottom: '1rem'}}>
    <div className='columns small-3'>
      <Button
        children='Test Me'
        onClick={() => {}}
        ariaLabel='For the Win'
        disabled
      />
    </div>
    </div>
  );
}