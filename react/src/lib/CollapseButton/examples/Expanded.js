import React from 'react';
import { CollapseButton } from '@collab-ui/react';
 export default class CollapseButtonExpanded extends React.PureComponent {
  render() {
    return (
      <CollapseButton collapse={false} />
    );
  }
}