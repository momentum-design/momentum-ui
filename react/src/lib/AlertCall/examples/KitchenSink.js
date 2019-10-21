import React from 'react';
import {
  AlertCall,
  AlertCallContainer
} from '@momentum-ui/react';

export default class AlertCallKitchenSink extends React.Component {
  state = {
    devices: [
      {name: 'SJC21-Babelfish', value: '1010101', type: 'device'},
      {name: 'Use my computer', value: '2020202'}
    ]
  }
  render() {
    const types = ['call', 'device', 'devices', 'number'];
    return (
      <React.Fragment>
        <AlertCallContainer>
          {
            types.map(type => (
              <AlertCall
                key={type}
                title="Incoming Call"
                caller={{
                  title: 'Jefe Guadelupe',
                  alt: '+ 1 972-555-1212',
                  ...type === 'device' && { type },
                  ...type === 'number' && { type }
                }}
                onReject={() => {}}
                onAnswerVoice={() => {}}
                onAnswerVideo={() => {}}
                onDeviceSelect={() => {}}
                show
                {...type === 'devices' && { devices: this.state.devices}}
              />
            ))
          }
        </AlertCallContainer>
      </React.Fragment>
    );
  }
}
