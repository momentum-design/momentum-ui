import React from 'react';
import {
  Alert,
  AlertContainer
} from '@momentum-ui/react';

export default class AlertKitchenSink extends React.Component {
  render() {
    const types = ['success', 'warning', 'error', 'info'];

    return (
      <React.Fragment>
        <AlertContainer>
        {
          types.map(type => (
            <Alert
              closable
              title='Alert'
              message={'Who\'s awesome?  You are!'}
              show
              key={type}
              type={type}
            />
          ))
        }
        </AlertContainer>
      </React.Fragment>
    );
  }
}
