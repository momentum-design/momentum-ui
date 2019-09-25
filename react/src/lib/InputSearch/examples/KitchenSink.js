import React from 'react';
import {
  InputSearchDefault,
  InputSearchLoading,
  InputSearchPill,
} from './index';

export default class InputSearchKitchenSink extends React.Component {
  render() {
    return (
      <React.Fragment>
        <InputSearchDefault />
        <InputSearchLoading />
        <InputSearchPill />
      </React.Fragment>
    );
  }
}
