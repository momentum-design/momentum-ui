import React from 'react';
import { Button } from '@momentum-ui/react';
export default function ButtonSize() {
  return(
    <div className="example-spacing">
      <div>
        <Button
          ariaLabel='For the Win'
          size='none'
        >
          no size
        </Button>
      </div>
      <br />
      <div>
        <Button
          ariaLabel='For the Win'
          size={28}
        >
          size 28
        </Button>
      </div>
      <br />
      <div>
        <Button
          ariaLabel='For the Win'
        >
          size 36
        </Button>
      </div>
      <br />
      <div>
        <Button
          ariaLabel='For the Win'
          size={40}
        >
          size 40
        </Button>
      </div>
      <br />
      <div>
        <Button
          ariaLabel='For the Win'
          size={52}
        >
          size 52
        </Button>
      </div>
      <br />
    </div>
  );
}
