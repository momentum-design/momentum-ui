import React from 'react';
import { ToggleSwitch } from '@collab-ui/react';
export default class Checkbox extends React.PureComponent {
  render() {
    return (
      <ToggleSwitch
        checked={false}
        label='Toggle Switch'
        htmlId='testToggleSwitch1'
      />
    );
  }
}