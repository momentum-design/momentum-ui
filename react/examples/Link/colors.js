import React from 'react';
import { Link } from '@collab-ui/react';
export default function LinkDefault() {
  return(
    <div className='row' style={{marginBottom: '1rem'}}>
      <div className='columns small-3'>
        <Link tag='div' color='red'>Color Prop(red)</Link>
      </div>
    </div>
  );
}