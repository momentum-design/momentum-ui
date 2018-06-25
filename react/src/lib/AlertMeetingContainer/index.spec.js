import React from 'react';
import { shallow, mount } from 'enzyme';
import { uniqueId } from 'lodash';
import { AlertMeeting, AlertMeetingContainer } from '@collab-ui/react';

describe('tests for <AlertMeetingContainer />', () => {
  const alertTitle = 'Important Meeting';
  const alertStatus = 'In 5 mins.';
  const alertMessage = 'This is important';

  function renderAlertMeeting() {
    const key = uniqueId('meeting_alert_');
    return (
      <AlertMeeting
        key={key}
        title={alertTitle}
        status={alertStatus}
        message={alertMessage}
        onHide={() => {}}
        onSnooze={() => {}}
        attendees={[{title: 'J $'}]}
        show
      />
    );
  }

  it('should match SnapShot', () => {
    const container = shallow(<AlertMeetingContainer/>);

    expect(container).toMatchSnapshot();
  });

  it('should render a div', () => {
    const container = shallow(<AlertMeetingContainer/>);

    expect(container.find('.cui-alert__container--bottom-right').length).toEqual(1);
  });

  it('should not render any AlertMeeting components when alertList is empty', () => {
    const container = mount(<AlertMeetingContainer/>);
    expect(container.find(AlertMeeting).length).toEqual(0);
  });

  it('number of MeetingsAlerts should equal size of alertCount property', () => {
    const alertList = [];
    const alertCount = 5;

    for (let index = 0; index < alertCount; index++) {
      alertList.push(renderAlertMeeting());
    }

    const container = mount(<AlertMeetingContainer alertList={alertList}/>);

    expect(container.find(AlertMeeting).length).toEqual(alertCount);
  });
});
