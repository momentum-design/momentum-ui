import React from 'react';
import { Button } from '@collab-ui/react';
export default function ButtonDefault() {
  return(
    <div className='row' style={{marginBottom: '1rem'}}>
      <div className='columns small-3'>
        <div>color=(blue)</div>
        <div>
          <Button
            ariaLabel='For the Win'
            color='blue'
          >
            Test Me
          </Button>
        </div>
        <br />
        <div>color=(none)</div>
        <div>
          <Button
            ariaLabel='For the Win'
            color='none'
          >
            Test Me
          </Button>
        </div>
        <br />
      </div>
    </div>
  );
}