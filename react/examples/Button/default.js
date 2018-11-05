import React from 'react';
import { Button } from '@collab-ui/react';
export default function ButtonDefault() {
  return(
    <div className='row' style={{marginBottom: '1rem'}}>
      <div className='columns small-3'>
        <Button
          children='Test Me'
          ariaLabel='For the Win'
        />
      </div>
    </div>
  );
}