import React from 'react';
import { Button } from '@collab-ui/react';
export default function ButtonTags() {
  return(
    <div className='row' style={{marginBottom: '1rem'}}>
      <div>Tag Attribute (a)</div>
      <div className='columns small-3'>
        <Button
          children='Link'
          onClick={() => {}}
          ariaLabel='For the Win'
          tag='a'
        />
      </div>
    </div>
  );
}