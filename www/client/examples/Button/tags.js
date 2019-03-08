import React from 'react';
import { Button } from '@collab-ui/react';
export default function ButtonTags() {
  return(
    <Button
      children='Link'
      onClick={() => { }}
      ariaLabel='For the Win'
      tag='a'
    />
  );
}