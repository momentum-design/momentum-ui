import React from 'react';
import { Button } from '@collab-ui/react';
export default function ButtonDefault() {
  return(
    <div className='row' style={{marginBottom: '1rem'}}>
      <div className="example-spacing">
        <div>size=(none)</div>
        <div>
          <Button
            ariaLabel='For the Win'
            size='none'
          >
            Test Me
          </Button>
        </div>
        <br />
        <div>size=(28)</div>
        <div>
          <Button
            ariaLabel='For the Win'
            size={28}
          >
            Test Me
          </Button>
        </div>
        <br />
        <div>Default size=(36)</div>
        <div>
          <Button
            ariaLabel='For the Win'
          >
            Test Me
          </Button>
        </div>
        <br />
        <div>size=(40)</div>
        <div>
          <Button
            ariaLabel='For the Win'
            size={40}
          >
            Test Me
          </Button>
        </div>
        <br />
        <div>size=(52)</div>
        <div>
          <Button
            ariaLabel='For the Win'
            size={52}
          >
            Test Me
          </Button>
        </div>
        <br />
      </div>
    </div>
  );
}