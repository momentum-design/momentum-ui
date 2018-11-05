import React from 'react';
import { ComboBox } from '@collab-ui/react';
export default class DarkComboBox extends React.PureComponent {
  render() {
    return (
      <div className="row large" style={{ paddingTop: '1rem', backgroundColor: 'black' }}>
        <ComboBox theme="dark" options={['a', 'ab', 'abc']} />
      </div>
    );
  }
}