import React from 'react';
import { ListSeparator } from '@momentum-ui/react';

export default class ListItemSeparator extends React.PureComponent {

  render() {
    return(
      <ListSeparator
        text='Text Color'
        textColor='orange'
        lineColor='red'
      />
    );
  }
}
