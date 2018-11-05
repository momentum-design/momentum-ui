import React from 'react';
import {
  Button,
  AlertMeeting,
  AlertMeetingContainer
} from '@collab-ui/react';
import {
  uniqueId,
  reject
} from 'lodash';
export default class Default extends React.PureComponent {
  state = {
    alertList: []
  }
  handleOnHide = key => {
    console.log(`onHide ${key}`);
    this.setState(state => {
      return { alertList: reject(state.alertList, {key}) };
    });
  }
  handleOnSnooze = key => {
    console.log(`onSnooze ${key}`);
    this.setState(state => {
      return { alertList: reject(state.alertList, {key}) };
    });
  }
  renderSingleAttendeeMeeting = () => {
    const key = uniqueId('meeting_alert_');
    return (
      <AlertMeeting
        key={key}
        title='Important Meeting'
        status='In 5 mins.'
        message='This is important'
        onHide={() => this.handleOnHide(key)}
        onSnooze={() => this.handleOnSnooze(key)}
        attendees={[{title: 'J $'}]}
        show
      />
    );
  }
  renderMultipleAttendeeMeeting = () => {
    const key = uniqueId('meeting_alert_');
    return (
      <AlertMeeting
        key={key}
        title='Important Meeting'
        status='In 5 mins.'
        message='This is important'
        onHide={() => this.handleOnHide(key)}
        onSnooze={() => this.handleOnSnooze(key)}
        attendees={[{title: 'J $'}, {title: 'Jefe Guadelupe'}]}
        show
      />
    );
  }
  render() {
    return (
      <section>
        <div>
          <div className='row'>
            <Button
              ariaLabel='Click to Open'
              onClick={() => {
                this.setState(state => ({
                  alertList: [...state.alertList, this.renderSingleAttendeeMeeting()]
                }));
              }}
              children='Single Attendee'
              color='primary'
            />
          </div>
          <div className='row'>
            <br />
            <Button
              ariaLabel='Click to Open'
              onClick={() => {
                this.setState(state => ({
                  alertList: [...state.alertList, this.renderMultipleAttendeeMeeting()]
                }));
              }}
              children='Multiple Attendees'
              color='primary'
            />
          </div>
          <br />
          <AlertMeetingContainer
            alertList={this.state.alertList}
          />
        </div>
      </section>
    );
  }
}