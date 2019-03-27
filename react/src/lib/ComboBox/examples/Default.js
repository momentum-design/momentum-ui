import React from 'react';
import { ComboBox } from '@collab-ui/react';
 export default class ComboBoxDefault extends React.PureComponent {
  render() {
    return (
      <ComboBox options={['a', 'ab', 'abc']} />
    );
  }
}