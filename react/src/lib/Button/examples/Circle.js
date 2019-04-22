import React from 'react';
import { Button, Icon } from '@momentum-ui/react';

export default function ButtonCircle() {
  return(
    <Button
      children={<Icon name='icon-search_12' />}
      onClick={() => { }}
      ariaLabel='For the Win'
      circle
    />
  );
}
