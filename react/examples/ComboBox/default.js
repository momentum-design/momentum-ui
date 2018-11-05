import React from 'react';
import { ComboBox } from '@collab-ui/react';
 export default class DefaultComboBox extends React.PureComponent {
  render() {
    return (
      <ComboBox options={['a', 'ab', 'abc']} />
    );
  }
}