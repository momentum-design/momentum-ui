import React from 'react';
import { Button } from '@momentum-ui/react';
export default function ButtonSize() {
  return(
    <div className="example-spacing">
      <div>
        <Button
          ariaLabel='no size'
          size='none'
        >
          no size
        </Button>
      </div>
      <br />
      <div>
        <Button
          ariaLabel='size 28'
          size={28}
        >
          size 28
        </Button>
      </div>
      <br />
      <div>
        <Button
          ariaLabel='size 36'
        >
          size 36
        </Button>
      </div>
      <br />
      <div>
        <Button
          ariaLabel='size 40'
          size={40}
        >
          size 40
        </Button>
      </div>
      <br />
      <div>
        <Button
          ariaLabel='size 52'
          size={52}
        >
          size 52
        </Button>
      </div>
      <br />
    </div>
  );
}
