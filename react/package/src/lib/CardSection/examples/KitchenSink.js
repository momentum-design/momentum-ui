import React from 'react';
import {
  CardSectionDefault,
  CardSectionFull,
  CardSectionStyled,
} from './index';

export default class CardKitchenSink extends React.Component {
  render() {
    return (
      <React.Fragment>
        <CardSectionDefault />
        <CardSectionFull />
        <CardSectionStyled />
      </React.Fragment>
    );
  }
}
