import React from 'react';
import { Button } from '@collab-ui/react';
export default function ButtonLoading() {
  return(
    <div className='row' style={{marginBottom: '1rem'}}>
      <div className='columns small-3'>
        <Button
          children='Test Me'
          onClick={() => {}}
          ariaLabel='For the Win'
          loading
        />
      </div>
    </div>
  );
}