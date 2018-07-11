import React from 'react';
import { shallow, mount } from 'enzyme';
import AlertMeeting from '../AlertMeeting';
import { Avatar, CompositeAvatar } from '@collab-ui/react';

describe('tests for <AlertMeeting />', () => {
  const attendeeOne = {title: 'J $'};
  const attendeeTwo = {title: 'Hee Haw'};
  const attendeeThree = {title: 'Hollywood Squarepants'};

  const attendeeListOne = [attendeeOne];
  const attendeeListTwo = [attendeeOne, attendeeTwo];
  const attendeeListThree = [attendeeOne, attendeeTwo, attendeeThree];

  it('should match SnapShot', () => {
    const container = shallow(<AlertMeeting show attendees={attendeeListOne} onSnooze={() => {}} />);

    expect(container).toMatchSnapshot();
  });

  it('should render one AlertMeeting', () => {
    const container = mount(<AlertMeeting show attendees={attendeeListOne} />);

    expect(container.find('.cui-alert.cui-alert--meeting').length).toEqual(1);
  });

  it('should render meeting title', () => {
    const container = shallow(<AlertMeeting show attendees={attendeeListOne} title="Super Important Meeting" />);

    expect(container.find('.cui-alert__title').text()).toEqual('Super Important Meeting');
  });

  it('should render meeting status', () => {
    const container = shallow(<AlertMeeting show attendees={attendeeListOne} status="Now" />);

    expect(container.find('.cui-alert__status').text()).toEqual('Now');
  });

  it('should render meeting message', () => {
    const container = shallow(<AlertMeeting show attendees={attendeeListOne} message="Attendance Required" />);

    expect(container.find('.cui-alert__message').text()).toEqual('Attendance Required');
  });

  it('should render an avatar', () => {
    const container = mount(<AlertMeeting show attendees={attendeeListOne} />);

    expect(container.find(Avatar).length).toEqual(1);
  });

  it('should only render a close button when onSnooze is not passed in', () => {
    const container = mount(<AlertMeeting show attendees={attendeeListOne} />);

    expect(container.find('.cui-button').length).toEqual(1);
  });

  it('should render snooze button when onSnooze is passed in', () => {
    const container = mount(<AlertMeeting show attendees={attendeeListOne} onSnooze={() => {}} />);

    expect(container.find('.cui-button').length).toEqual(2);
  });

  it('should handle snooze aria-label when remindAriaLabel is passed in', () => {
    const container = mount(<AlertMeeting show attendees={attendeeListOne} onSnooze={() => {}} remindAriaLabel='testSnooze'/>);

    expect(container.find('button').first().props()['aria-label']).toEqual('testSnooze');
  });

  it('should handle snooze aria-label when closeAriaLabel is passed in', () => {
    const container = mount(<AlertMeeting show attendees={attendeeListOne} closeAriaLabel='testClose' />);

    expect(container.find('button').last().props()['aria-label']).toEqual('testClose');
  });

  it('should use cui-alert__content class when onSnooze is passed in', () => {
    const container = mount(<AlertMeeting show attendees={attendeeListOne} onSnooze={() => {}} />);

    expect(container.find('.cui-alert__content').length).toEqual(1);
    expect(container.find('.cui-alert__content--wide').length).toEqual(0);
  });

  it('should use cui-alert__content--wide class when onSnooze is not passed in', () => {
    const container = mount(<AlertMeeting show attendees={attendeeListOne} />);

    expect(container.find('.cui-alert__content').length).toEqual(1);
    expect(container.find('.cui-alert__content--wide').length).toEqual(1);
  });

  it('should render a composite avatar when attendee list is greater than 1', () => {
    const container = mount(<AlertMeeting show attendees={attendeeListTwo} />);

    expect(container.find(CompositeAvatar).length).toEqual(1);
    expect(container.find(Avatar).length).toEqual(2);
  });

  it('should render a composite avatar with only 2 avatars when attendee list is greater than 2', () => {
    const container = mount(<AlertMeeting show attendees={attendeeListThree} />);

    expect(container.find(CompositeAvatar).length).toEqual(1);
    expect(container.find(Avatar).length).toEqual(2);
  });

  it('should handle onClick event', () => {
    let count = 0;
    const countUp = () => count++;
    const container = mount(<AlertMeeting show attendees={attendeeListOne} onClick={countUp} />);

    container.find('.cui-alert').first().simulate('click');
    expect(count).toEqual(1);
  });

  it('should handle keyDown event', () => {
    let count = 0;
    const countUp = () => count++;
    const container = mount(<AlertMeeting show attendees={attendeeListOne} onClick={countUp} />);

    container.find('.cui-alert').first().simulate('keyDown', { which: 13, charCode: 13, key: 'Space' });
    expect(count).toEqual(1);
  });

  it('should handle onSnooze event', () => {
    let count = 0;
    const countUp = () => count++;
    const container = mount(<AlertMeeting show attendees={attendeeListOne} onSnooze={countUp} />);

    container.find('.cui-button').first().simulate('click');
    expect(count).toEqual(1);
  });

  it('should handle onHide event', () => {
    let count = 0;
    const countUp = () => count++;
    const container = mount(<AlertMeeting show attendees={attendeeListOne} onHide={countUp} />);

    container.find('.cui-button').last().simulate('click');
    expect(count).toEqual(1);
  });
});
