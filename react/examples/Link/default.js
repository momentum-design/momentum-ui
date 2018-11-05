import React from 'react';
import { Link } from '@collab-ui/react';
export default function LinkDefault() {
  return(
    <div className='row' style={{marginBottom: '1rem'}}>
      <div className='columns small-3'>
          <Link>Default</Link>
          <Link tag='div'>Tag Prop(div)</Link>
          <Link tag='span'>Tag Prop(span)</Link>
      </div>
    </div>
  );
}