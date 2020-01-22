/* eslint-disable jsx-a11y/anchor-is-valid */
import React from 'react';
import {
  TopbarBlue,
  TopbarDark,
  TopbarLight,
  TopbarNavFlexRight,
  TopbarNoMiddle
} from './index';

export default class TopbarKitchenSink extends React.Component {
  render() {
    return (
      <React.Fragment>
        <TopbarBlue />
        <TopbarDark />
        <TopbarLight />
        <TopbarNavFlexRight />
        <TopbarNoMiddle />
      </React.Fragment>
    );
  }
}
/* eslint-enable jsx-a11y/anchor-is-valid */
