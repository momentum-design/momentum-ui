import React from 'react';
import {
  ModalDefault,
  ModalFull,
  ModalLarge,
  ModalSmall,
} from './index';

export default class ModalKitchenSink extends React.Component {
  render() {
    return (
      <React.Fragment>
        <ModalDefault />
        <ModalFull />
        <ModalLarge />
        <ModalSmall />
      </React.Fragment>
    );
  }
}
