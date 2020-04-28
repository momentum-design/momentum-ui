import React from 'react';
import {
  AccordionDefault,
  AccordionMultiOpen,
  AccordionPreSelectedOpen,
} from './index';

export default class AccordionKitchenSink extends React.Component {
  render() {
    return (
      <React.Fragment>
        <AccordionDefault />
        <AccordionMultiOpen />
        <AccordionPreSelectedOpen />
      </React.Fragment>
    );
  }
}
