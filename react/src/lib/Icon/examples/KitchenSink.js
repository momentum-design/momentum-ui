import React from 'react';
import {
  ButtonIcon,
  IconColor,
  IconDefault,
  IconWhite,
} from './index';

export default class IconKitchenSink extends React.Component {
  render() {
    return (
      <React.Fragment>
        <IconColor />
        <IconDefault />
        <IconWhite />
        <ButtonIcon />
      </React.Fragment>
    );
  }
}
