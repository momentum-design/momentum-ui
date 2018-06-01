import React from 'react';
import { shallow, mount } from 'enzyme';
import { AlertMeeting } from '@collab-ui/react';
import AlertMeetingContainer from '../AlertMeetingContainer';

describe('tests for <AlertMeetingContainer />', () => {
  const alertTitle = 'Important Meeting';
  const alertStatus = 'In 5 mins.';
  const alertMessage = 'This is important';

  it('should match SnapShot', () => {
    const container = shallow(<AlertMeetingContainer/>);

    expect(container).toMatchSnapshot();
  });

  it('should render a div', () => {
    const container = shallow(<AlertMeetingContainer/>);

    expect(container.find('.cui-alert__container--bottom-right').length).toEqual(1);
  });

  it('should render an AlertMeeting when meetingAlert() is called', () => {
    const container = mount(<AlertMeetingContainer/>);
    container.instance().meetingAlert(
      alertTitle,
      alertStatus,
      alertMessage,
      () => {},
      () => {},
      [{title: 'J $'}]
    );
    container.update();
    expect(container.find(AlertMeeting).length).toEqual(1);
  });

  it('number of MeetingsAlerts should equal number of times meetingAlert() is called', () => {
    const container = mount(<AlertMeetingContainer/>);
    const alertCount = 5;

    for (let index = 0; index < alertCount; index++) {
      container.instance().meetingAlert(
        alertTitle,
        alertStatus,
        alertMessage,
        () => {},
        () => {},
        [{title: 'J $'}]
      );
    }
    container.update();
    expect(container.find(AlertMeeting).length).toEqual(alertCount);
  });
});
