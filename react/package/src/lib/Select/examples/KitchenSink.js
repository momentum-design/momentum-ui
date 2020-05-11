import React from 'react';
import {
  SelectDefault,
  SelectMultiSelect,
} from './index';

export default class SelectKitchenSink extends React.Component {
  render() {
    return (
      <React.Fragment>
        <SelectDefault />
        <SelectMultiSelect />
      </React.Fragment>
    );
  }
}
