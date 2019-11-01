import React from 'react';
import { Button } from '@momentum-ui/react';
export default function ButtonTags() {
  return(
    <Button
      children='Link'
      onClick={() => { }}
      ariaLabel='Link'
      tag='a'
    />
  );
}
