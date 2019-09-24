/* eslint-disable jsx-a11y/anchor-is-valid */
import React from 'react';
import {
  TopbarBlue,
  TopbarDark,
  TopbarLight,
  TopbarNoMiddle
} from './index';

export default class TopbarKitchenSink extends React.Component {
  render() {
    return (
      <React.Fragment>
        <TopbarBlue />
        <TopbarDark />
        <TopbarLight />
        <TopbarNoMiddle />
      </React.Fragment>
    );
  }
}
/* eslint-enable jsx-a11y/anchor-is-valid */
