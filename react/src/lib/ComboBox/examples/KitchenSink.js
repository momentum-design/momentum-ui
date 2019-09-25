import React from 'react';
import {
  ComboBoxClear,
  ComboBoxDefault,
} from './index';

export default class ComboBoxKitchenSink extends React.Component {
  render() {
    return (
      <React.Fragment>
        <ComboBoxClear />
        <ComboBoxDefault />
      </React.Fragment>
    );
  }
}
