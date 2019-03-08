import React from 'react';
import { Button } from '@collab-ui/react';
export default function ButtonColor() {
  return(
    <Button
      children='Test Me'
      onClick={() => { }}
      ariaLabel='For the Win'
      color='blue'
    />
  );
}