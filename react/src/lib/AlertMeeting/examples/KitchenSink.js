import React from 'react';
import {
  AlertMeeting,
  AlertContainer
} from '@momentum-ui/react';

export default class AlertMeetingKitchenSink extends React.Component {
  render() {
    const types = ['single', 'multiple'];
    return (
      <React.Fragment>
        <AlertContainer>
          {
            types.map(type => (
              <AlertMeeting
                key={type}
                title='Important Meeting'
                status='In 5 mins.'
                message='This is important'
                onHide={this.handleOnHide}
                onSnooze={this.handleOnSnooze}
                attendees={[
                  {title: 'J $'},
                  ...type === 'multiple' && {title: 'Jefe Guadelupe'} || []
                ]}
                show
              />
            ))
          }
        </AlertContainer>
      </React.Fragment>
    );
  }
}
